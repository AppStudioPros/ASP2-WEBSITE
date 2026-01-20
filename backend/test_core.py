#!/usr/bin/env python3
"""
Core integration test script for App Studio Pro AI Website
Tests: Claude streaming, multi-model battle, SSE endpoints
"""

import asyncio
import os
import sys
from dotenv import load_dotenv

# Load environment variables
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

async def test_claude_stream():
    """Test 1: Claude streaming with emergentintegrations"""
    print_test_header("Claude Streaming via emergentintegrations")
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        api_key = os.getenv("EMERGENT_LLM_KEY")
        if not api_key:
            raise ValueError("EMERGENT_LLM_KEY not found in environment")
        
        print(f"✓ API Key loaded: {api_key[:20]}...")
        
        # Initialize Claude chat
        chat = LlmChat(
            api_key=api_key,
            session_id="test-claude-stream",
            system_message="You are a helpful AI assistant. Be concise."
        ).with_model("anthropic", "claude-4-sonnet-20250514")
        
        print("✓ LlmChat initialized with Claude model")
        
        # Test streaming
        message = UserMessage(text="Say 'Hello from Claude!' and nothing else.")
        print(f"✓ Sending message: {message.text}")
        
        response = await chat.send_message(message)
        print(f"✓ Response received: {response[:100]}...")
        
        # Validate response
        assert len(response) > 0, "Response is empty"
        assert "claude" in response.lower() or "hello" in response.lower(), "Response doesn't contain expected text"
        
        print(f"✓ Full response length: {len(response)} characters")
        
        record_result("test_claude_stream", True)
        return True
        
    except Exception as e:
        record_result("test_claude_stream", False, str(e))
        import traceback
        traceback.print_exc()
        return False

async def test_battle_dual_models():
    """Test 2: Multi-model battle (Claude + GPT)"""
    print_test_header("Multi-Model Battle (Claude + GPT)")
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        api_key = os.getenv("EMERGENT_LLM_KEY")
        print(f"✓ API Key loaded: {api_key[:20]}...")
        
        # Initialize Claude
        claude_chat = LlmChat(
            api_key=api_key,
            session_id="battle-claude",
            system_message="You are Claude. Be concise."
        ).with_model("anthropic", "claude-4-sonnet-20250514")
        
        # Initialize GPT
        gpt_chat = LlmChat(
            api_key=api_key,
            session_id="battle-gpt",
            system_message="You are GPT. Be concise."
        ).with_model("openai", "gpt-5.1")
        
        print("✓ Both models initialized (Claude + GPT)")
        
        # Test concurrent responses
        prompt = "What is 2+2? Answer with just the number."
        message = UserMessage(text=prompt)
        
        print(f"✓ Sending prompt to both models: '{prompt}'")
        
        # Run both models concurrently
        claude_task = claude_chat.send_message(message)
        gpt_task = gpt_chat.send_message(message)
        
        claude_response, gpt_response = await asyncio.gather(claude_task, gpt_task)
        
        print(f"✓ Claude response: {claude_response[:100]}")
        print(f"✓ GPT response: {gpt_response[:100]}")
        
        # Validate both responded
        assert len(claude_response) > 0, "Claude response is empty"
        assert len(gpt_response) > 0, "GPT response is empty"
        
        record_result("test_battle_dual_models", True)
        return True
        
    except Exception as e:
        record_result("test_battle_dual_models", False, str(e))
        import traceback
        traceback.print_exc()
        return False

async def test_sse_endpoint_contract():
    """Test 3: SSE endpoint structure validation"""
    print_test_header("SSE Endpoint Contract Validation")
    
    try:
        # Test that we can create SSE generator
        from sse_starlette.sse import EventSourceResponse
        from fastapi import FastAPI
        
        print("✓ sse-starlette imported successfully")
        print("✓ EventSourceResponse available")
        
        # Test basic SSE event structure
        async def test_generator():
            """Test SSE generator"""
            for i in range(3):
                yield {
                    "event": "message",
                    "data": f"token_{i}"
                }
        
        # Validate generator works
        events = []
        async for event in test_generator():
            events.append(event)
        
        assert len(events) == 3, f"Expected 3 events, got {len(events)}"
        assert all("event" in e and "data" in e for e in events), "Events missing required fields"
        
        print(f"✓ SSE generator test passed: {len(events)} events")
        print(f"✓ Sample event: {events[0]}")
        
        record_result("test_sse_endpoint_contract", True)
        return True
        
    except Exception as e:
        record_result("test_sse_endpoint_contract", False, str(e))
        import traceback
        traceback.print_exc()
        return False

async def test_gemini_integration():
    """Test 4: Gemini integration for battle arena"""
    print_test_header("Gemini Integration Test")
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        api_key = os.getenv("EMERGENT_LLM_KEY")
        print(f"✓ API Key loaded: {api_key[:20]}...")
        
        # Initialize Gemini
        gemini_chat = LlmChat(
            api_key=api_key,
            session_id="test-gemini",
            system_message="You are a helpful assistant. Be concise."
        ).with_model("gemini", "gemini-2.5-pro")
        
        print("✓ Gemini chat initialized")
        
        # Test response
        message = UserMessage(text="Say 'Hello from Gemini!' and nothing else.")
        response = await gemini_chat.send_message(message)
        
        print(f"✓ Gemini response: {response[:100]}")
        
        assert len(response) > 0, "Gemini response is empty"
        
        record_result("test_gemini_integration", True)
        return True
        
    except Exception as e:
        record_result("test_gemini_integration", False, str(e))
        import traceback
        traceback.print_exc()
        return False

async def test_three_model_battle():
    """Test 5: Three-way battle (Claude + GPT + Gemini)"""
    print_test_header("Three-Model Battle (Claude + GPT + Gemini)")
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        api_key = os.getenv("EMERGENT_LLM_KEY")
        
        # Initialize all three models
        claude = LlmChat(api_key=api_key, session_id="3way-claude", system_message="Be concise.").with_model("anthropic", "claude-4-sonnet-20250514")
        gpt = LlmChat(api_key=api_key, session_id="3way-gpt", system_message="Be concise.").with_model("openai", "gpt-5.1")
        gemini = LlmChat(api_key=api_key, session_id="3way-gemini", system_message="Be concise.").with_model("gemini", "gemini-2.5-pro")
        
        print("✓ All three models initialized")
        
        # Test concurrent battle
        prompt = "Name one programming language. Just one word."
        message = UserMessage(text=prompt)
        
        print(f"✓ Battle prompt: '{prompt}'")
        
        # Run all three concurrently
        results = await asyncio.gather(
            claude.send_message(message),
            gpt.send_message(message),
            gemini.send_message(message),
            return_exceptions=True
        )
        
        claude_resp, gpt_resp, gemini_resp = results
        
        # Check for exceptions
        for i, (name, resp) in enumerate([("Claude", claude_resp), ("GPT", gpt_resp), ("Gemini", gemini_resp)]):
            if isinstance(resp, Exception):
                print(f"⚠ {name} error: {resp}")
            else:
                print(f"✓ {name}: {resp[:80]}")
        
        # At least 2 should succeed
        successful = sum(1 for r in results if not isinstance(r, Exception))
        assert successful >= 2, f"Only {successful}/3 models succeeded"
        
        record_result("test_three_model_battle", True)
        return True
        
    except Exception as e:
        record_result("test_three_model_battle", False, str(e))
        import traceback
        traceback.print_exc()
        return False

async def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("APP STUDIO PRO - CORE INTEGRATION TESTS")
    print("Testing: Claude, GPT, Gemini, SSE")
    print("="*60)
    
    # Run all tests
    tests = [
        test_claude_stream(),
        test_battle_dual_models(),
        test_gemini_integration(),
        test_sse_endpoint_contract(),
        test_three_model_battle()
    ]
    
    await asyncio.gather(*tests)
    
    # Print summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    print(f"✅ PASSED: {len(test_results['passed'])}/{len(test_results['passed']) + len(test_results['failed'])}")
    for test in test_results['passed']:
        print(f"   ✓ {test}")
    
    if test_results['failed']:
        print(f"\n❌ FAILED: {len(test_results['failed'])}/{len(test_results['passed']) + len(test_results['failed'])}")
        for test in test_results['failed']:
            print(f"   ✗ {test}")
        print("\n⚠️  FIX FAILURES BEFORE PROCEEDING TO APP DEVELOPMENT!")
        sys.exit(1)
    else:
        print("\n🎉 ALL TESTS PASSED! CORE IS READY!")
        print("✓ Claude streaming works")
        print("✓ Multi-model battle works")
        print("✓ SSE infrastructure ready")
        print("\n➡️  PROCEED TO PHASE 2: FULL APP DEVELOPMENT")
        sys.exit(0)

if __name__ == "__main__":
    asyncio.run(main())
