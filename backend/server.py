from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import Optional, List, Dict
import asyncio
from datetime import datetime
from bson import ObjectId
import json
import base64
from bs4 import BeautifulSoup
import requests
from emergentintegrations.llm.chat import LlmChat, UserMessage
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

load_dotenv()

# Database
db_client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_client, db
    mongo_url = os.getenv("MONGO_URL")
    db_name = os.getenv("DB_NAME", "appstudiopro_analyzer")
    db_client = AsyncIOMotorClient(mongo_url)
    db = db_client[db_name]
    print(f"✓ Connected to MongoDB: {db_name}")
    yield
    if db_client:
        db_client.close()
        print("✓ MongoDB connection closed")

app = FastAPI(lifespan=lifespan)

cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def serialize_doc(doc):
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(d) for d in doc]
    if isinstance(doc, dict):
        result = {}
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                result[key] = str(value)
            elif isinstance(value, datetime):
                result[key] = value.isoformat()
            elif isinstance(value, dict):
                result[key] = serialize_doc(value)
            elif isinstance(value, list):
                result[key] = serialize_doc(value)
            else:
                result[key] = value
        return result
    return doc

class AnalyzeRequest(BaseModel):
    url: str

class ConsultationRequest(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    url: Optional[str] = None
    message: Optional[str] = ""

@app.get("/api")
async def root():
    return {
        "app": "AI Website Analyzer",
        "version": "1.0.0",
        "status": "ready"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy", "database": "connected" if db is not None else "disconnected"}

def scrape_website(url: str) -> Dict:
    """Scrape website and extract key information"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        data = {
            'url': url,
            'title': soup.title.string if soup.title else 'No title',
            'meta_description': '',
            'h1_tags': [],
            'h2_tags': [],
            'has_viewport': False,
            'has_canonical': False,
            'og_image': '',
            'link_count': 0,
            'image_count': 0,
            'has_nav': False,
            'has_footer': False,
            'has_form': False
        }
        
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            data['meta_description'] = meta_desc.get('content', '')
        
        data['h1_tags'] = [h1.get_text(strip=True) for h1 in soup.find_all('h1')[:3]]
        data['h2_tags'] = [h2.get_text(strip=True) for h2 in soup.find_all('h2')[:5]]
        
        viewport = soup.find('meta', attrs={'name': 'viewport'})
        data['has_viewport'] = viewport is not None
        
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        data['has_canonical'] = canonical is not None
        
        og_img = soup.find('meta', attrs={'property': 'og:image'})
        if og_img:
            data['og_image'] = og_img.get('content', '')
        
        data['link_count'] = len(soup.find_all('a'))
        data['image_count'] = len(soup.find_all('img'))
        data['has_nav'] = soup.find('nav') is not None
        data['has_footer'] = soup.find('footer') is not None
        data['has_form'] = soup.find('form') is not None
        
        return data
        
    except Exception as e:
        raise Exception(f"Scraping failed: {str(e)}")

async def analyze_with_claude(scraped_data: Dict) -> Dict:
    """Analyze website data with Claude AI"""
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise ValueError("EMERGENT_LLM_KEY not found")
    
    prompt = f"""Analyze this website data and provide a JSON response with this exact structure:
{{
  "business_type": "one of: ecommerce, saas, local_business, professional_services, content, nonprofit, portfolio, other",
  "business_category": "specific category like: restaurant, dentist, software, etc.",
  "visual_score": 0-100 (rate modern design, colors, typography),
  "ux_score": 0-100 (rate navigation, structure, usability),
  "seo_score": 0-100 (rate meta tags, viewport, structure),
  "exposure_score": 0-100 (estimate based on SEO quality and content),
  "ai_assistants": ["list 2-3 AI assistant types that would help this business"],
  "funnel_recommendations": ["list 2-3 conversion funnel improvements"],
  "design_improvements": ["list 3 specific visual/UX improvements"],
  "seo_improvements": ["list 2-3 SEO recommendations"],
  "redesign_description": "detailed 2-3 sentence description of recommended homepage redesign"
}}

Website Data:
- URL: {scraped_data.get('url')}
- Title: {scraped_data.get('title', 'N/A')}
- Meta Description: {scraped_data.get('meta_description', 'N/A')}
- H1 Tags: {', '.join(scraped_data.get('h1_tags', []))}
- H2 Tags: {', '.join(scraped_data.get('h2_tags', []))}
- Has Navigation: {scraped_data.get('has_nav', False)}
- Has Footer: {scraped_data.get('has_footer', False)}
- Has Forms: {scraped_data.get('has_form', False)}
- Link Count: {scraped_data.get('link_count', 0)}
- Image Count: {scraped_data.get('image_count', 0)}
- Has Viewport: {scraped_data.get('has_viewport', False)}
- Has Canonical: {scraped_data.get('has_canonical', False)}

Provide ONLY the JSON response."""

    chat = LlmChat(
        api_key=api_key,
        session_id="analyzer-" + str(datetime.now().timestamp()),
        system_message="You are a website analysis expert. Respond only with valid JSON."
    ).with_model("anthropic", "claude-4-sonnet-20250514")
    
    response = await chat.send_message(UserMessage(text=prompt))
    
    if "```json" in response:
        json_str = response.split("```json")[1].split("```")[0].strip()
    elif "```" in response:
        json_str = response.split("```")[1].split("```")[0].strip()
    else:
        json_str = response.strip()
    
    analysis = json.loads(json_str)
    return analysis

async def generate_mockup_image(redesign_description: str, business_type: str) -> str:
    """Generate redesigned website mockup using OpenAI"""
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise ValueError("EMERGENT_LLM_KEY not found")
    
    prompt = f"""Professional modern website homepage design:

Business Type: {business_type}
Design Requirements: {redesign_description}

Style Guidelines:
- Clean corporate aesthetic with purple/blue gradient (#667eea to #764ba2)
- Modern navigation bar at top
- Hero section with compelling headline and call-to-action button
- Feature cards or sections below hero
- Professional footer
- Spacious, minimal layout
- High-quality business-focused design
- Desktop view, 1920x1080 resolution

Overall style: Corporate, professional, trustworthy, modern, clean, data-driven"""
    
    image_gen = OpenAIImageGeneration(api_key=api_key)
    images = await image_gen.generate_images(
        prompt=prompt,
        model="gpt-image-1",
        number_of_images=1
    )
    
    if not images or len(images) == 0:
        raise Exception("No images generated")
    
    image_base64 = base64.b64encode(images[0]).decode('utf-8')
    return image_base64

@app.post("/api/analyze")
async def analyze_website(request: AnalyzeRequest):
    """Complete website analysis"""
    try:
        url = request.url
        if not url.startswith('http'):
            url = 'https://' + url
        
        scraped_data = scrape_website(url)
        analysis = await analyze_with_claude(scraped_data)
        
        overall_score = (
            analysis.get('visual_score', 50) * 0.25 +
            analysis.get('ux_score', 50) * 0.25 +
            analysis.get('seo_score', 50) * 0.30 +
            analysis.get('exposure_score', 50) * 0.20
        )
        
        mockup_image = await generate_mockup_image(
            analysis.get('redesign_description', ''),
            analysis.get('business_type', 'business')
        )
        
        result = {
            "url": url,
            "scraped_data": scraped_data,
            "analysis": analysis,
            "overall_score": round(overall_score, 1),
            "mockup_image": mockup_image,
            "analyzed_at": datetime.utcnow().isoformat()
        }
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/consultation")
async def request_consultation(request: ConsultationRequest):
    """Handle consultation requests (MOCKED)"""
    try:
        print(f"📧 MOCK EMAIL: New consultation request from {request.name} ({request.email})")
        print(f"   Company: {request.company}")
        print(f"   Phone: {request.phone}")
        
        return {
            "success": True,
            "message": "Consultation request received! Our team will contact you within 24 hours.",
            "mock": True
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
