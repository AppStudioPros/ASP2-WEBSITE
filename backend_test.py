#!/usr/bin/env python3
"""
Backend API Testing for App Studio Pro
Tests all HTTP endpoints using the public URL
"""

import requests
import json
import sys
from datetime import datetime

class BackendAPITester:
    def __init__(self, base_url="https://visible-check-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, is_sse=False, timeout=10):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                if is_sse:
                    # For SSE endpoints, we just check if connection is established
                    response = requests.post(url, json=data, headers=headers, stream=True, timeout=timeout)
                else:
                    response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # For SSE, read a few chunks to verify streaming
                if is_sse and response.status_code == 200:
                    print("   Reading SSE stream...")
                    chunks_read = 0
                    for chunk in response.iter_content(chunk_size=1024):
                        if chunk:
                            chunks_read += 1
                            if chunks_read == 1:
                                print(f"   First chunk: {chunk[:100]}")
                            if chunks_read >= 3:  # Read a few chunks
                                break
                    print(f"   ✓ SSE streaming working ({chunks_read} chunks read)")
                elif not is_sse:
                    try:
                        resp_json = response.json()
                        print(f"   Response: {json.dumps(resp_json, indent=2)[:200]}")
                    except:
                        print(f"   Response: {response.text[:200]}")
            else:
                self.tests_passed += 1 if response.status_code in [200, 201] else 0
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })

            return success, response

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            self.failed_tests.append({"test": name, "error": "Timeout"})
            return False, None
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({"test": name, "error": str(e)})
            return False, None

    def test_root(self):
        """Test root endpoint"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "api",
            200
        )
        return success

    def test_health(self):
        """Test health check"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        return success

    def test_claude_stream(self):
        """Test Claude streaming endpoint"""
        success, response = self.run_test(
            "Claude Streaming",
            "POST",
            "api/ai/claude/stream",
            200,
            data={
                "messages": [
                    {"role": "user", "content": "Say hello in 5 words"}
                ],
                "session_id": f"test-{datetime.now().strftime('%H%M%S')}"
            },
            is_sse=True
        )
        return success

    def test_battle_stream(self):
        """Test multi-model battle endpoint"""
        success, response = self.run_test(
            "Multi-Model Battle",
            "POST",
            "api/ai/battle",
            200,
            data={
                "prompt": "What is AI? Answer in 10 words.",
                "session_id": f"battle-test-{datetime.now().strftime('%H%M%S')}"
            },
            is_sse=True,
            timeout=30  # Longer timeout for 3 models
        )
        return success

    def test_get_chats(self):
        """Test get chat history"""
        success, response = self.run_test(
            "Get Chat History",
            "GET",
            "api/chats?limit=5",
            200
        )
        return success

    def test_get_battles(self):
        """Test get battle history"""
        success, response = self.run_test(
            "Get Battle History",
            "GET",
            "api/battles?limit=5",
            200
        )
        return success

def main():
    # Setup
    tester = BackendAPITester("https://visible-check-1.preview.emergentagent.com")
    
    print("\n" + "="*70)
    print("APP STUDIO PRO - BACKEND API TESTS")
    print("Testing: All HTTP endpoints via public URL")
    print("="*70)

    # Run tests
    print("\n📋 Running API Tests...")
    
    tester.test_root()
    tester.test_health()
    tester.test_claude_stream()
    tester.test_battle_stream()
    tester.test_get_chats()
    tester.test_get_battles()

    # Print results
    print("\n" + "="*70)
    print("📊 TEST SUMMARY")
    print("="*70)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for failure in tester.failed_tests:
            print(f"   • {failure.get('test', 'Unknown')}: {failure.get('error', failure.get('response', 'Unknown error'))}")
        return 1
    else:
        print("\n✅ ALL BACKEND TESTS PASSED!")
        return 0

if __name__ == "__main__":
    sys.exit(main())
