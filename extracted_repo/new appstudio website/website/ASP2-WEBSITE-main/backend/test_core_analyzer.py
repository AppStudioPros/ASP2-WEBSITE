#!/usr/bin/env python3
"""
AI Website Analyzer - Core POC Test
Tests: Web scraping, Claude analysis, OpenAI image generation
"""

import asyncio
import os
import sys
import base64
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import requests
import json

load_dotenv()

# Test results tracking
test_results = {
    "passed": [],
    "failed": []
}

def print_test_header(test_name):
    """Print test header"""
    print(f"\n{'='*60}")
    print(f"TEST: {test_name}")
    print(f"{'='*60}")

def record_result(test_name, passed, error=None):
    """Record test result"""
    if passed:
        test_results["passed"].append(test_name)
        print(f"✅ PASS: {test_name}")
    else:
        test_results["failed"].append(test_name)
        print(f"❌ FAIL: {test_name}")
        if error:
            print(f"   Error: {error}")

def scrape_website(url):
    """Scrape website and extract key information"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract key elements
        data = {
            'url': url,
            'title': soup.title.string if soup.title else 'No title',
            'meta_description': '',
            'h1_tags': [],
            'h2_tags': [],
            'has_viewport': False,
            'has_canonical': False,
            'og_image': '',
            'color_scheme': [],
            'link_count': 0,
            'image_count': 0,
            'has_nav': False,
            'has_footer': False
        }
        
        # Meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            data['meta_description'] = meta_desc.get('content', '')
        
        # Headings
        data['h1_tags'] = [h1.get_text(strip=True) for h1 in soup.find_all('h1')[:3]]
        data['h2_tags'] = [h2.get_text(strip=True) for h2 in soup.find_all('h2')[:5]]
        
        # Viewport
        viewport = soup.find('meta', attrs={'name': 'viewport'})
        data['has_viewport'] = viewport is not None
        
        # Canonical
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        data['has_canonical'] = canonical is not None
        
        # OG Image
        og_img = soup.find('meta', attrs={'property': 'og:image'})
        if og_img:
            data['og_image'] = og_img.get('content', '')
        
        # Links and images count
        data['link_count'] = len(soup.find_all('a'))
        data['image_count'] = len(soup.find_all('img'))
        
        # Structure elements
        data['has_nav'] = soup.find('nav') is not None
        data['has_footer'] = soup.find('footer') is not None
        
        return data
        
    except Exception as e:
        raise Exception(f"Scraping failed: {str(e)}")

async def test_web_scraper():
    """Test 1: Web scraping functionality"""
    print_test_header("Web Scraping Test")
    
    try:
        test_url = "https://example.com"
        print(f"✓ Testing URL: {test_url}")
        
        data = scrape_website(test_url)
        
        print(f"✓ Title: {data['title']}")
        print(f"✓ H1 tags: {len(data['h1_tags'])}")
        print(f"✓ Links: {data['link_count']}")
        print(f"✓ Images: {data['image_count']}")
        print(f"✓ Has viewport: {data['has_viewport']}")
        print(f"✓ Has nav: {data['has_nav']}")
        
        # Validate
        assert data['title'], "No title found"
        assert data['link_count'] > 0, "No links found"
        
        record_result("test_web_scraper", True)
        return data
        
    except Exception as e:
        record_result("test_web_scraper", False, str(e))
        import traceback
        traceback.print_exc()
        return None

async def test_claude_analysis(scraped_data):
    """Test 2: Claude AI analysis for business type and recommendations"""
    print_test_header("Claude AI Analysis Test")
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        api_key = os.getenv("EMERGENT_LLM_KEY")
        if not api_key:
            raise ValueError("EMERGENT_LLM_KEY not found")
        
        print(f"✓ API Key loaded: {api_key[:20]}...")
        
        # Create analysis prompt
        prompt = f"""Analyze this website data and provide a JSON response with the following structure:
{{
  "business_type": "one of: ecommerce, saas, local_business, professional_services, content, nonprofit, other",
  "visual_score": 0-100,
  "ux_score": 0-100,
  "seo_score": 0-100,
  "exposure_score": 0-100,
  "ai_assistants": ["list of 2-3 AI assistant suggestions"],
  "funnel_recommendations": ["list of 2-3 funnel optimization ideas"],
  "design_improvements": ["list of 2-3 visual/UX improvements"]
}}

Website Data:
- Title: {scraped_data.get('title', 'N/A')}
- Meta Description: {scraped_data.get('meta_description', 'N/A')}
- H1 Tags: {', '.join(scraped_data.get('h1_tags', []))}
- Has Navigation: {scraped_data.get('has_nav', False)}
- Has Footer: {scraped_data.get('has_footer', False)}
- Link Count: {scraped_data.get('link_count', 0)}
- Has Viewport: {scraped_data.get('has_viewport', False)}

Provide ONLY the JSON response, no additional text."""

        # Initialize Claude
        chat = LlmChat(
            api_key=api_key,
            session_id="analyzer-test",
            system_message="You are a website analysis expert. Respond only with valid JSON."
        ).with_model("anthropic", "claude-4-sonnet-20250514")
        
        print("✓ Claude chat initialized")
        
        # Get analysis
        response = await chat.send_message(UserMessage(text=prompt))
        print(f"✓ Response received ({len(response)} chars)")
        
        # Parse JSON
        # Extract JSON from response (might have markdown code blocks)
        if "```json" in response:
            json_str = response.split("```json")[1].split("```")[0].strip()
        elif "```" in response:
            json_str = response.split("```")[1].split("```")[0].strip()
        else:
            json_str = response.strip()
        
        analysis = json.loads(json_str)
        
        print(f"✓ Business Type: {analysis.get('business_type')}")
        print(f"✓ Visual Score: {analysis.get('visual_score')}")
        print(f"✓ UX Score: {analysis.get('ux_score')}")
        print(f"✓ SEO Score: {analysis.get('seo_score')}")
        print(f"✓ AI Assistants: {len(analysis.get('ai_assistants', []))}")
        
        # Validate
        assert 'business_type' in analysis, "Missing business_type"
        assert 'visual_score' in analysis, "Missing visual_score"
        assert isinstance(analysis['visual_score'], (int, float)), "Invalid visual_score type"
        
        record_result("test_claude_analysis", True)
        return analysis
        
    except Exception as e:
        record_result("test_claude_analysis", False, str(e))
        import traceback
        traceback.print_exc()
        return None

async def test_image_generation(analysis):
    """Test 3: OpenAI image generation for website mockup"""
    print_test_header("OpenAI Image Generation Test")
    
    try:
        from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
        
        api_key = os.getenv("EMERGENT_LLM_KEY")
        if not api_key:
            raise ValueError("EMERGENT_LLM_KEY not found")
        
        print(f"✓ API Key loaded: {api_key[:20]}...")
        
        # Create image generation prompt
        prompt = f"""Professional modern website homepage design with:
- Clean corporate style with purple/blue gradient (#667eea to #764ba2)
- Modern navigation bar at top
- Hero section with headline and call-to-action button
- Three feature cards in a grid
- Professional footer
- Minimalist, spacious layout
- High-quality, business-focused design
- Desktop view, 1920x1080 resolution
Style: Corporate, professional, modern, clean"""
        
        print(f"✓ Prompt created ({len(prompt)} chars)")
        
        # Initialize image generator
        image_gen = OpenAIImageGeneration(api_key=api_key)
        print("✓ Image generator initialized")
        
        # Generate image (this can take 30-60 seconds)
        print("⏳ Generating image (this may take 30-60 seconds)...")
        images = await image_gen.generate_images(
            prompt=prompt,
            model="gpt-image-1",
            number_of_images=1
        )
        
        print(f"✓ Image generated: {len(images)} image(s)")
        
        # Validate
        assert images and len(images) > 0, "No images generated"
        assert len(images[0]) > 1000, "Image data too small"
        
        # Convert to base64
        image_base64 = base64.b64encode(images[0]).decode('utf-8')
        print(f"✓ Image size: {len(images[0])} bytes")
        print(f"✓ Base64 length: {len(image_base64)} chars")
        
        record_result("test_image_generation", True)
        return image_base64
        
    except Exception as e:
        record_result("test_image_generation", False, str(e))
        import traceback
        traceback.print_exc()
        return None

async def test_scoring_algorithm(scraped_data, analysis):
    """Test 4: Scoring algorithm calculation"""
    print_test_header("Scoring Algorithm Test")
    
    try:
        # Calculate overall score from components
        visual = analysis.get('visual_score', 50)
        ux = analysis.get('ux_score', 50)
        seo = analysis.get('seo_score', 50)
        exposure = analysis.get('exposure_score', 50)
        
        # Weighted average
        overall = (visual * 0.25) + (ux * 0.25) + (seo * 0.30) + (exposure * 0.20)
        
        print(f"✓ Visual Score: {visual}/100 (25% weight)")
        print(f"✓ UX Score: {ux}/100 (25% weight)")
        print(f"✓ SEO Score: {seo}/100 (30% weight)")
        print(f"✓ Exposure Score: {exposure}/100 (20% weight)")
        print(f"✓ Overall Score: {overall:.1f}/100")
        
        # Validate
        assert 0 <= overall <= 100, "Overall score out of range"
        
        record_result("test_scoring_algorithm", True)
        return overall
        
    except Exception as e:
        record_result("test_scoring_algorithm", False, str(e))
        import traceback
        traceback.print_exc()
        return None

async def main():
    """Run all POC tests"""
    print("\n" + "="*60)
    print("AI WEBSITE ANALYZER - CORE POC TESTS")
    print("="*60)
    
    # Test 1: Web Scraping
    scraped_data = await test_web_scraper()
    if not scraped_data:
        print("\n❌ Web scraper failed - cannot continue")
        sys.exit(1)
    
    # Test 2: Claude Analysis
    analysis = await test_claude_analysis(scraped_data)
    if not analysis:
        print("\n❌ Claude analysis failed - cannot continue")
        sys.exit(1)
    
    # Test 3: Image Generation
    image = await test_image_generation(analysis)
    if not image:
        print("\n⚠️  Image generation failed - non-critical, continuing")
    
    # Test 4: Scoring Algorithm
    overall_score = await test_scoring_algorithm(scraped_data, analysis)
    
    # Print summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    total = len(test_results['passed']) + len(test_results['failed'])
    print(f"✅ PASSED: {len(test_results['passed'])}/{total}")
    for test in test_results['passed']:
        print(f"   ✓ {test}")
    
    if test_results['failed']:
        print(f"\n❌ FAILED: {len(test_results['failed'])}/{total}")
        for test in test_results['failed']:
            print(f"   ✗ {test}")
        print("\n⚠️  FIX FAILURES BEFORE PROCEEDING TO APP DEVELOPMENT!")
        sys.exit(1)
    else:
        print("\n🎉 ALL CORE TESTS PASSED!")
        print("✓ Web scraping works")
        print("✓ Claude analysis works")
        print("✓ Image generation works")
        print("✓ Scoring algorithm works")
        print("\n➡️  READY FOR PHASE 2: FULL APP DEVELOPMENT")
        sys.exit(0)

if __name__ == "__main__":
    asyncio.run(main())
