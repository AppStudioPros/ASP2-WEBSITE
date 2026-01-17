from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os
from sse_starlette.sse import EventSourceResponse
from pydantic import BaseModel
from typing import List, Dict, Optional
import asyncio
from datetime import datetime
from bson import ObjectId
import json
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()

# Database
db_client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_client, db
    # Startup
    mongo_url = os.getenv("MONGO_URL")
    db_name = os.getenv("DB_NAME", "appstudiopro")
    db_client = AsyncIOMotorClient(mongo_url)
    db = db_client[db_name]
    print(f"✓ Connected to MongoDB: {db_name}")
    yield
    # Shutdown
    if db_client:
        db_client.close()
        print("✓ MongoDB connection closed")

app = FastAPI(lifespan=lifespan)

# CORS
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper: Serialize MongoDB documents
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

# Models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    model: Optional[str] = "claude"
    session_id: Optional[str] = "default"

class BattleRequest(BaseModel):
    prompt: str
    session_id: Optional[str] = "battle"

# Root endpoint
@app.get("/api")
async def root():
    return {
        "app": "App Studio Pro - AI Powerhouse",
        "version": "1.0.0-POC",
        "status": "ready",
        "features": ["claude_streaming", "multi_model_battle", "voice_support"]
    }

# Health check
@app.get("/api/health")
async def health():
    return {"status": "healthy", "database": "connected" if db is not None else "disconnected"}

# Claude Streaming Endpoint
@app.post("/api/ai/claude/stream")
async def claude_stream(request: ChatRequest):
    """Stream Claude responses via SSE"""
    
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")
    
    async def event_generator():
        try:
            # Initialize Claude
            system_msg = "You are a helpful AI assistant for App Studio Pro, a cutting-edge AI development agency. You help users understand our services and capabilities."
            
            chat = LlmChat(
                api_key=api_key,
                session_id=request.session_id,
                system_message=system_msg
            ).with_model("anthropic", "claude-4-sonnet-20250514")
            
            # Get last user message
            user_message = request.messages[-1].content if request.messages else "Hello"
            
            # For POC, we'll get full response and stream it token by token
            # In Phase 2, we'll implement true streaming
            response = await chat.send_message(UserMessage(text=user_message))
            
            # Simulate streaming by splitting into words
            words = response.split()
            for i, word in enumerate(words):
                token = word + (" " if i < len(words) - 1 else "")
                yield {
                    "event": "token",
                    "data": json.dumps({"token": token, "done": False})
                }
                await asyncio.sleep(0.05)  # Simulate streaming delay
            
            # Send done event
            yield {
                "event": "done",
                "data": json.dumps({"done": True})
            }
            
            # Save to database
            if db is not None:
                await db.chats.insert_one({
                    "session_id": request.session_id,
                    "messages": [m.dict() for m in request.messages] + [{"role": "assistant", "content": response}],
                    "model": "claude",
                    "created_at": datetime.utcnow()
                })
                
        except Exception as e:
            print(f"Error in claude_stream: {e}")
            yield {
                "event": "error",
                "data": json.dumps({"error": str(e)})
            }
    
    return EventSourceResponse(event_generator())

# Multi-Model Battle Endpoint
@app.post("/api/ai/battle")
async def battle_stream(request: BattleRequest):
    """Stream responses from multiple AI models concurrently"""
    
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")
    
    async def event_generator():
        try:
            # Initialize all three models
            claude = LlmChat(
                api_key=api_key,
                session_id=f"{request.session_id}-claude",
                system_message="You are Claude, a helpful AI assistant."
            ).with_model("anthropic", "claude-4-sonnet-20250514")
            
            gpt = LlmChat(
                api_key=api_key,
                session_id=f"{request.session_id}-gpt",
                system_message="You are GPT, a helpful AI assistant."
            ).with_model("openai", "gpt-5.1")
            
            gemini = LlmChat(
                api_key=api_key,
                session_id=f"{request.session_id}-gemini",
                system_message="You are Gemini, a helpful AI assistant."
            ).with_model("gemini", "gemini-2.5-pro")
            
            message = UserMessage(text=request.prompt)
            
            # Get all responses concurrently
            responses = await asyncio.gather(
                claude.send_message(message),
                gpt.send_message(message),
                gemini.send_message(message),
                return_exceptions=True
            )
            
            models = ["claude", "gpt", "gemini"]
            
            # Stream each model's response
            for model, response in zip(models, responses):
                if isinstance(response, Exception):
                    yield {
                        "event": "error",
                        "data": json.dumps({"model": model, "error": str(response)})
                    }
                else:
                    # Send start event
                    yield {
                        "event": "start",
                        "data": json.dumps({"model": model})
                    }
                    
                    # Simulate streaming for each model
                    words = response.split()
                    for i, word in enumerate(words):
                        token = word + (" " if i < len(words) - 1 else "")
                        yield {
                            "event": "token",
                            "data": json.dumps({"model": model, "token": token})
                        }
                        await asyncio.sleep(0.03)
                    
                    # Send model complete event
                    yield {
                        "event": "complete",
                        "data": json.dumps({"model": model, "response": response})
                    }
            
            # Send final done event
            yield {
                "event": "done",
                "data": json.dumps({"done": True})
            }
            
            # Save to database
            if db is not None:
                valid_responses = [
                    {"model": m, "response": r}
                    for m, r in zip(models, responses)
                    if not isinstance(r, Exception)
                ]
                await db.battles.insert_one({
                    "session_id": request.session_id,
                    "prompt": request.prompt,
                    "responses": valid_responses,
                    "created_at": datetime.utcnow()
                })
                
        except Exception as e:
            print(f"Error in battle_stream: {e}")
            yield {
                "event": "error",
                "data": json.dumps({"error": str(e)})
            }
    
    return EventSourceResponse(event_generator())

# Get chat history
@app.get("/api/chats")
async def get_chats(limit: int = 5):
    """Get recent chat history"""
    if db is None:
        raise HTTPException(status_code=500, detail="Database not connected")
    
    chats = await db.chats.find().sort("created_at", -1).limit(limit).to_list(length=limit)
    return {"chats": serialize_doc(chats)}

# Get battle history
@app.get("/api/battles")
async def get_battles(limit: int = 5):
    """Get recent battle history"""
    if db is None:
        raise HTTPException(status_code=500, detail="Database not connected")
    
    battles = await db.battles.find().sort("created_at", -1).limit(limit).to_list(length=limit)
    return {"battles": serialize_doc(battles)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
