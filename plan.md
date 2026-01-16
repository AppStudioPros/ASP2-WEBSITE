# App Studio Pro — Ultra‑Futuristic AI Website Plan

## 1) Objectives (North Star)
- Position App Studio Pro as the kings of AI with a show-stopping, interactive AI experience.
- Deliver flawless Claude-powered interactions with real-time streaming and voice (talking avatar + voice navigation).
- Showcase live AI demos (designs, mockups, code, copy), a portfolio generator, multi‑model “Chat Battle Arena,” and a holographic 3D portfolio.
- Achieve stunning cyber blue + purple matrix design with smooth 60fps visuals and graceful degradation on low-end devices.

---
## 2) Phase 1 — POC (Core AI, Voice, Real‑Time, Basic 3D)
Purpose: Validate the hardest pieces FIRST. Do not proceed until these pass.

Core to validate (Level 5 complexity → POC REQUIRED):
- Claude streaming via SSE (server) → React client.
- Voice: STT (Web Speech API) + TTS (Web Speech Synthesis API) for MVP; plan upgrade to premium TTS in Phase 3.
- Real-time channel (SSE for streams, WS for progress events) works reliably.
- Basic 3D background (neural network/particles) at 60fps on desktop with graceful mobile fallback.

Integrations to prepare (via playbooks before coding):
- Anthropic Claude (primary). Also set up Emergent Universal LLM integration for GPT/Gemini (text only) used in Chat Battle.
- No paid TTS/STT in POC; use browser APIs. Identify candidate premium TTS for Phase 3 via brief web research (latency-focused).

POC Implementation Steps
1. Backend (FastAPI)
   - /api/ai/claude/stream (POST, SSE): messages[] → token stream.
   - /api/battle/stream (POST, WS or SSE): prompt → multiplexed streams from Claude + GPT via Emergent LLM key.
   - Utilities: serialize_doc for Mongo (ObjectId/datetime), SSE generator, provider switch.
2. Frontend (React)
   - Minimal pages: Hero (Avatar), Demos, Background canvas.
   - AI Avatar MVP: Chat box; incoming tokens spoken via SpeechSynthesis; mic button using Web Speech API (STT) for text input + command detection.
   - Neural background (Three.js or performant Canvas particles) with pointer interaction (cyber blue + purple).
   - Simple “Battle Arena” panel rendering 2 concurrent streams.
3. Data & Storage
   - Mongo collections: chats, generations (schema-light for POC). Save last 5 sessions.
4. Test Core in Isolation
   - Single Python script tests (test_core.py):
     - test_claude_stream(): asserts streamed tokens > 0
     - test_battle_dual_models(): verifies two model streams complete
     - test_sse_endpoint_contract(): SSE headers + event format
   - Frontend manual checks: STT start/stop, TTS playback, 60fps background.
5. Websearch (targeted)
   - Survey low-latency TTS (ElevenLabs, PlayHT, Azure Neural) and best practice for Claude streaming with SSE in FastAPI.

POC User Stories (≥5)
1. As a visitor, I can ask the avatar a question and hear a spoken, streaming response.
2. As a visitor, I can click the mic and say “Go to services,” seeing the command recognized and a scroll action triggered.
3. As a user, I see an interactive neural background that responds to my mouse at ~60fps.
4. As a user, I can run a “Chat Battle” and watch Claude and GPT stream responses side‑by‑side.
5. As a tester, I can run test_core.py and get PASS for Claude SSE + dual‑model streaming.

POC Success Criteria
- Claude SSE streams tokens reliably (<1s first token on average, network permitting).
- STT recognizes basic commands with visible feedback; TTS speaks streamed chunks smoothly.
- Neural background maintains near‑60fps on desktop; mobile falls back to lighter variant.
- Dual‑model battle produces two complete answers without errors.

---
## 3) Phase 2 — Main App Development (All Features + Stunning UX)
Build the full experience around the proven core. Keep all backend routes prefixed with /api and bind 0.0.0.0:8001.

Backend (FastAPI + MongoDB)
- Auth: lightweight session/jwt bypass for testing agent (optional toggle).
- AI Endpoints
  - /api/ai/claude/stream (SSE) — AI Avatar + Content Gen
  - /api/ai/generate/portfolio (WS/SSE) — Portfolio Generator with live progress
  - /api/ai/battle (WS/SSE) — Multi-model collaboration
- Content Gen Demos
  - /api/generate/code, /api/generate/copy, /api/generate/design (all stream)
- Data Models (schemas with serialization helpers)
  - chats {userId?, messages, model, createdAt}
  - generations {type, input, outputs, assets, createdAt}
  - projects {title, media, meta, 3d_config}
- File handling: Accept text inputs first; image upload optional (Phase 3).

Frontend (React + R3F/Three + shadcn/ui)
- Global: Cyber blue + purple matrix theme, glassmorphism, neon glows, particle effects.
- Sections
  1) Hero: AI Avatar (floating orb/face), mic, chat dock, greeting speech on load (with permission cue).
  2) Services: Cards with live mini‑demos (generate copy/design/code in place).
  3) Demos Hub: Full panel for real-time content generation with streaming and syntax highlighting.
  4) Portfolio Generator: Idea input/upload → animated progress → generated site/portfolio preview.
  5) Chat Battle Arena: Multi‑model streams, comparison, “merge answer” option.
  6) Holographic Portfolio: R3F 3D cards (bloom, depth of field, hover tilt, drag to rotate), click for details modal.
  7) Team & Roadmap: Futuristic layout with subtle 3D parallax.
  8) Contact: AI‑assisted form (summarize intent, propose next steps), optional email trigger.
- Voice Navigation: Command grammar (services, portfolio, contact, demos, battle, team), visual VU meter and transcript.
- Performance: Lazy load heavy 3D, reduce polycount, dynamic resolution scaling, prefers-reduced-motion support.

Real‑Time & Streaming
- SSE for token streaming; WebSockets for multi‑phase tasks (portfolio progress, battle coordination).
- Client stream parser with backpressure handling; typewriter + partial TTS chunking.

Design & Guidelines
- Call design_agent to generate detailed UI guidelines and components map before coding UI.
- Ensure all interactive elements have data-testid for testing.

Phase 2 User Stories (≥10)
1. I’m greeted by a speaking AI avatar with a subtle animated face/orb.
2. I say “Contact page,” and the site scrolls there and focuses the form.
3. I type “Create a fitness app design,” and see streaming UI copy + component list + color palette.
4. I request “Generate login screen code,” and see live, syntax‑highlighted code stream.
5. I describe my business idea, and a portfolio mock with sections, copy, and imagery suggestions appears with progress feedback.
6. I open Chat Battle and watch Claude, GPT, and Gemini respond; I can compare and pick the best.
7. I explore projects in a 3D holographic grid, rotating a card and opening details.
8. The neural background reacts to my cursor; on mobile it simplifies gracefully.
9. Contact form summarizes my message using AI and prepares a proposal outline.
10. I can revisit the session history of chats and generations.

Phase 2 Success Criteria
- All endpoints function with streaming; no 500s in happy path.
- Voice navigation reliable on Chrome/Desktop; graceful fallback elsewhere.
- 3D scene smooth on modern laptops; fallback enabled on low-end/mobile.
- Visuals match cyber‑futuristic theme; no readability issues; responsive across breakpoints.
- Testing agent E2E passes for non‑mic/camera paths.

---
## 4) Phase 3+ — Enhancements & Hardening
- Premium TTS (ElevenLabs/PlayHT/Azure) with caching; user voice selection.
- Project CMS (admin to add/edit portfolio, team, case studies).
- Auth & user accounts; save favorites, export proposals.
- Image generation hooks (OpenAI gpt‑image‑1 / Gemini) for illustrative assets.
- Accessibility polish, SEO, OpenGraph, sitemap.
- Cost controls: prompt compression, caching, truncation, dedupe.

---
## 5) Implementation Steps (Chronological)
1. Integrations: Use integration_playbook_expert_v2 for Anthropic + Emergent multi‑model; confirm keys (Anthropic key, EMERGENT_LLM_KEY already available via manager).
2. Create test_core.py covering Claude SSE, dual‑model battle, SSE headers.
3. Implement backend SSE/WS endpoints; validate with test script until PASS.
4. Build minimal React POC UI: avatar chat (STT/TTS), battle panel, neural background.
5. Fix performance/latency issues → proceed to Phase 2 full build with design_agent guidelines.
6. Implement all sections/features; wire Mongo persistence; polish animations.
7. Call testing_agent_v3 for E2E (skip mic/camera); fix all issues; iterate.

---
## 6) Next Actions (Require Your Input)
- Provide Anthropic API key (for Claude). Confirm if we also use Emergent Universal key for GPT/Gemini text.
- Approve POC voice plan: Web Speech (free) for Phase 1 → Premium TTS in Phase 3.
- Any must‑show portfolio items for the holographic showcase to preload?

---
## 7) Global Success Criteria
- Core AI (Claude streaming) and multi‑model flows are reliable and low latency.
- Voice UX feels instant and magical; commands understood; clear visual feedback.
- 3D/visuals are breathtaking yet performant; no layout jank; responsive.
- All user stories in Phase 2 demonstrably work; testing agent passes.
- No hardcoded envs; /api prefix respected; serialize_doc prevents JSON errors.
