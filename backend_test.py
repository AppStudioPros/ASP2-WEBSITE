#!/usr/bin/env python3
"""
AI Website Analyzer - Backend API Tests
Tests both /api/analyze and /api/consultation endpoints
"""

import requests
import sys
import time
from datetime import datetime

# Use public endpoint
BASE_URL = "https://visible-check-1.preview.emergentagent.com"

class APITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=120):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n{'='*60}")
        print(f"TEST {self.tests_run}: {name}")
        print(f"{'='*60}")
        print(f"URL: {url}")
        print(f"Method: {method}")
        if data:
            print(f"Data: {data}")
        
        try:
            start_time = time.time()
            
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            
            elapsed = time.time() - start_time
            
            print(f"Status Code: {response.status_code}")
            print(f"Response Time: {elapsed:.2f}s")
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASS - Expected {expected_status}, got {response.status_code}")
                
                # Try to parse JSON response
                try:
                    json_response = response.json()
                    print(f"Response Keys: {list(json_response.keys())}")
                    
                    # Store result
                    self.test_results.append({
                        "test": name,
                        "status": "PASS",
                        "response_time": elapsed,
                        "response_keys": list(json_response.keys())
                    })
                    
                    return True, json_response
                except:
                    print("Response: (not JSON)")
                    self.test_results.append({
                        "test": name,
                        "status": "PASS",
                        "response_time": elapsed
                    })
                    return True, {}
            else:
                print(f"❌ FAIL - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"Error Detail: {error_detail}")
                except:
                    print(f"Response Text: {response.text[:200]}")
                
                self.test_results.append({
                    "test": name,
                    "status": "FAIL",
                    "expected": expected_status,
                    "actual": response.status_code,
                    "error": response.text[:200]
                })
                
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ FAIL - Request timed out after {timeout}s")
            self.test_results.append({
                "test": name,
                "status": "FAIL",
                "error": f"Timeout after {timeout}s"
            })
            return False, {}
        except Exception as e:
            print(f"❌ FAIL - Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "status": "FAIL",
                "error": str(e)
            })
            return False, {}

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*60}")
        print("TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        print(f"\n{'='*60}")
        print("DETAILED RESULTS")
        print(f"{'='*60}")
        for result in self.test_results:
            status_icon = "✅" if result["status"] == "PASS" else "❌"
            print(f"{status_icon} {result['test']}: {result['status']}")
            if "response_time" in result:
                print(f"   Response Time: {result['response_time']:.2f}s")
            if "error" in result:
                print(f"   Error: {result['error']}")

def main():
    print("\n" + "="*60)
    print("AI WEBSITE ANALYZER - BACKEND API TESTS")
    print("="*60)
    print(f"Base URL: {BASE_URL}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = APITester(BASE_URL)
    
    # Test 1: Root endpoint
    print("\n" + "="*60)
    print("BASIC CONNECTIVITY TESTS")
    print("="*60)
    
    success, response = tester.run_test(
        "Root Endpoint",
        "GET",
        "/api",
        200
    )
    
    if not success:
        print("\n❌ CRITICAL: Root endpoint failed - backend may not be running")
        print("Stopping tests...")
        tester.print_summary()
        return 1
    
    # Test 2: Health check
    success, response = tester.run_test(
        "Health Check",
        "GET",
        "/api/health",
        200
    )
    
    if success and response:
        db_status = response.get('database', 'unknown')
        print(f"Database Status: {db_status}")
        if db_status != 'connected':
            print("⚠️  WARNING: Database not connected")
    
    # Test 3: Website Analysis (main feature)
    print("\n" + "="*60)
    print("CORE FEATURE TESTS")
    print("="*60)
    
    print("\n⏳ Testing website analysis (this takes 30-60 seconds)...")
    print("   - Scraping website")
    print("   - Claude AI analysis")
    print("   - OpenAI image generation")
    
    success, response = tester.run_test(
        "Website Analysis",
        "POST",
        "/api/analyze",
        200,
        data={"url": "example.com"},
        timeout=120  # Allow 2 minutes for AI processing
    )
    
    if success and response:
        print("\n📊 Analysis Results:")
        print(f"   URL: {response.get('url', 'N/A')}")
        print(f"   Overall Score: {response.get('overall_score', 'N/A')}/100")
        
        analysis = response.get('analysis', {})
        if analysis:
            print(f"   Business Type: {analysis.get('business_type', 'N/A')}")
            print(f"   Visual Score: {analysis.get('visual_score', 'N/A')}/100")
            print(f"   UX Score: {analysis.get('ux_score', 'N/A')}/100")
            print(f"   SEO Score: {analysis.get('seo_score', 'N/A')}/100")
            print(f"   Exposure Score: {analysis.get('exposure_score', 'N/A')}/100")
            print(f"   AI Assistants: {len(analysis.get('ai_assistants', []))} recommendations")
            print(f"   Funnel Recommendations: {len(analysis.get('funnel_recommendations', []))} items")
            print(f"   Design Improvements: {len(analysis.get('design_improvements', []))} items")
            print(f"   SEO Improvements: {len(analysis.get('seo_improvements', []))} items")
        
        mockup = response.get('mockup_image', '')
        if mockup:
            print(f"   Mockup Image: Generated ({len(mockup)} chars base64)")
        else:
            print(f"   Mockup Image: ❌ NOT GENERATED")
    else:
        print("\n❌ CRITICAL: Website analysis failed - core feature not working")
    
    # Test 4: Consultation form submission
    print("\n" + "="*60)
    print("LEAD CAPTURE TESTS")
    print("="*60)
    
    success, response = tester.run_test(
        "Consultation Form Submission",
        "POST",
        "/api/consultation",
        200,
        data={
            "name": "Test User",
            "email": "test@example.com",
            "phone": "555-1234",
            "company": "Test Company",
            "url": "example.com",
            "message": "Test consultation request"
        }
    )
    
    if success and response:
        print(f"   Success: {response.get('success', False)}")
        print(f"   Message: {response.get('message', 'N/A')}")
        print(f"   Mocked: {response.get('mock', False)}")
    
    # Print final summary
    tester.print_summary()
    
    # Return exit code
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️  {tester.tests_run - tester.tests_passed} TEST(S) FAILED")
        return 1

if __name__ == "__main__":
    sys.exit(main())
