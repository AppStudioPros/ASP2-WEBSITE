from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import httpx
import os
import logging

router = APIRouter(prefix="/api/sanity", tags=["sanity"])
logger = logging.getLogger(__name__)

class SanityClient:
    def __init__(self):
        self.project_id = os.getenv("SANITY_PROJECT_ID")
        self.token = os.getenv("SANITY_API_TOKEN")
        self.dataset = os.getenv("SANITY_DATASET", "production")
        self.api_version = os.getenv("SANITY_API_VERSION", "v2025-02-19")
        
        if not self.project_id:
            logger.warning("SANITY_PROJECT_ID not configured")
        
        self.base_url = f"https://{self.project_id}.api.sanity.io/{self.api_version}" if self.project_id else None
        self.headers = {
            "Authorization": f"Bearer {self.token}" if self.token else "",
            "Content-Type": "application/json"
        }
    
    async def fetch(self, query: str):
        """Execute a GROQ query against Sanity"""
        if not self.base_url:
            raise HTTPException(
                status_code=503,
                detail="Sanity is not configured. Please add SANITY_PROJECT_ID to environment variables."
            )
        
        url = f"{self.base_url}/data/query/{self.dataset}"
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.get(
                    url,
                    params={"query": query},
                    headers=self.headers
                )
                response.raise_for_status()
                return response.json()["result"]
            except httpx.HTTPError as e:
                logger.error(f"Sanity query failed: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Failed to fetch from Sanity: {str(e)}")

@router.get("/blog-posts")
async def get_blog_posts(
    limit: int = Query(10, le=50),
    category: Optional[str] = None
):
    """Fetch blog posts from Sanity"""
    sanity = SanityClient()
    
    # Build GROQ query
    if category:
        query = f'''*[_type == "blogPost" && publishedAt <= now() && "{category}" in categories[]->slug.current] 
        | order(publishedAt desc)[0..{limit-1}] {{
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            author->,
            categories[]->,
            mainImage {{
                asset->
            }}
        }}'''
    else:
        query = f'''*[_type == "blogPost" && publishedAt <= now()] 
        | order(publishedAt desc)[0..{limit-1}] {{
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            author->,
            categories[]->,
            mainImage {{
                asset->
            }}
        }}'''
    
    try:
        posts = await sanity.fetch(query)
        return {"success": True, "data": posts, "count": len(posts)}
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Unexpected error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")

@router.get("/services")
async def get_services():
    """Fetch services from Sanity"""
    sanity = SanityClient()
    
    query = '''*[_type == "service"] | order(order asc) {
        _id,
        title,
        slug,
        description,
        icon {
            asset->
        },
        features[],
        price
    }'''
    
    try:
        services = await sanity.fetch(query)
        return {"success": True, "data": services, "count": len(services)}
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Unexpected error fetching services: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch services")

@router.get("/portfolio")
async def get_portfolio(featured: bool = Query(False)):
    """Fetch portfolio pieces from Sanity"""
    sanity = SanityClient()
    
    filter_condition = "&& featured == true" if featured else ""
    query = f'''*[_type == "portfolioPiece" {filter_condition}] 
    | order(_createdAt desc) {{
        _id,
        title,
        slug,
        description,
        image {{
            asset->
        }},
        technologies[],
        featured,
        projectUrl
    }}'''
    
    try:
        portfolio = await sanity.fetch(query)
        return {"success": True, "data": portfolio, "count": len(portfolio)}
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Unexpected error fetching portfolio: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch portfolio")
