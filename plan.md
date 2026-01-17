# App Studio Pro — Ultimate Tech Theater Website (Plan v1)

## Objectives
- Rebuild the site as a darker, high‑tech, professional “Tech Theater” that showcases real engineering with interactive demos.
- Balance wow-factor (8/10) with credibility: transparency, real code, honest constraints, all budgets welcome.
- Convert: Clear CTAs (See Real Engineering, Browse App Store, Talk to Humans) and lead capture.

## Scope (What we will build)
- Sections: Hero, Truth Bomb, Upgraded SEO Analyzer, Real‑Time Build Counter, GitHub Activity Meter, Code Poetry, Brutally Honest AI Chat, Interactive Capabilities Showcase (Budget Reality, Co‑Build Simulator, No‑Code Checker, Code Quality Scanner), Whitelabel App Store, Transparent Process, Budget Matrix, Real + Mocked Client Work.
- Tech: React (dark theme) + FastAPI + Mongo (optional). Animations via Framer Motion. Charts via Recharts. Code highlighting via Prism/React Syntax Highlighter. Counters via react-countup. Streaming via SSE. LLM via Claude (Emergent key). Image gen optional.

## Phase 1 — Core POC (Required)
Goal: Prove hardest pieces in isolation before full build.

Core workflows to validate
1) LLM Streaming (Claude) → “Brutally Honest AI Chat”.
2) SEO Analyzer Scraper → Robust fetch + parse + basic scoring.
3) Streaming Telemetry → SSE counters for Real‑Time Build Counter + activity feeds.
4) Code Poetry Runtime (SAFE) → Run pre‑approved code snippets and return output.

POC Deliverables
- Backend endpoints (minimal, isolated):
  - POST /api/ai/chat/stream (Claude SSE simulation OK for POC).
  - POST /api/seo/analyze/stream (SSE: step events + final JSON).
  - GET  /api/metrics/counters/stream (SSE: mock project counts, LOC, progress).
  - POST /api/codepoetry/run (body: snippet_id) → returns code + output.
- One Python test script test_core_theater.py that:
  - Calls Claude (expects non-empty response).
  - Calls SEO stream (receives steps + result JSON schema).
  - Subscribes to counters SSE (receives ≥5 events in 3s).
  - Calls codepoetry/run (returns code+output, output validated).
- Frontend POC (single page):
  - Simple dark page with three widgets: Chat (text box + streamed text), SEO “Analyzing…” demo (progress messages), Counters (live increment), Code Poetry sample (run + show output).

POC User Stories (≥5)
1. As a visitor, I can ask the Brutally Honest AI a question and see streamed text.
2. As a visitor, I can trigger SEO analysis and see step‑by‑step progress updates.
3. As a visitor, I can watch live counters change without reloading.
4. As a visitor, I can run a code snippet and see code + output instantly.
5. As a tester, I can run test_core_theater.py and see ALL PASS before full build.

Exit Criteria
- All four core integrations tested and working (no flaky behavior).
- SSE stable for ≥30 seconds; Claude responses consistent; scraper handles 2+ sites.

## Phase 2 — Full App Development (Tech Theater)
Build the complete experience around proven core.

Backend (FastAPI)
- AI Chat: POST /api/ai/chat/stream (Claude via Emergent key, defensive JSON).
- SEO Analyzer:
  - POST /api/seo/analyze/stream → emits steps + final result (scores, checks).
- Counters & Activity:
  - GET /api/metrics/counters/stream → projects in dev, LOC/week, progress bars.
  - GET /api/activity/github (mock) → heatmap, language split, commit freq.
- Code Poetry:
  - GET /api/codepoetry/snippets → list of safe snippets (id, title, code, lang).
  - POST /api/codepoetry/run → returns output logs (precompiled or safe runner).
- Budget:
  - POST /api/budget/calc → given $5K–$200K, returns features, walls, milestones.
- Capability Tools:
  - POST /api/nocode/check → feasibility notes (text only).
  - POST /api/codequality/scan → fetch URL, basic perf + security hints.
- App Store:
  - GET /api/apps → paginated whitelabel list (category, tech stack, ETA, base price).

Frontend (React, dark high‑tech theme)
- Global: Dark palette (#0a0e1a bg), Space Grotesk/Inter/JetBrains Mono. Subtle grid background. Framer Motion transitions.
- Sections & Components:
  1) Hero: bold claim, 3 CTAs, subtle shine animation.
  2) Truth Bomb: split screen; left (no‑code promise visuals), right (VS Code, APS agents, logos, terminal).
  3) Upgraded SEO Analyzer: animated dials (Recharts gauge), progress steps (typewriter), transparency panel (“what we’re checking”), animated bars for results.
  4) Real‑Time Build Counter: counters (react‑countup), blurred client rows, progress bars, SSE feed.
  5) GitHub Activity Meter: heatmap (mock), language pie, commits line chart.
  6) Code Poetry: code tabs (Prism), run button, terminal output pane; nice caret typing.
  7) Brutally Honest AI Chat: fixed widget and full‑page section; preset “tough questions”.
  8) Interactive Showcase: Budget slider with walls/milestones; Co‑Build Simulator (idea → component tree + scaffold), No‑Code Checker; Code Quality Scanner.
  9) Whitelabel App Store: filterable cards, demo links, tech badges, “View Source (mock)”.
  10) Transparent Process: timeline with real screenshots (mocked) + honest notes.
  11) Budget Matrix: 3 tiers with GET/NO‑GET/WALL/ALTERNATIVES; CTA.
  12) Real + Mocked Work: consistent case blocks; video placeholders.
- Reuse: Loading skeletons, error states, accessible focus, data‑testids.

Phase 2 User Stories (≥6)
1. As a user, I can explore the split “Truth Bomb” and grasp why real engineering matters.
2. As a user, I can run the SEO analyzer and watch dials/charts animate to my scores.
3. As a user, I can see live build activity with counters updating realistically.
4. As a user, I can run a Code Poetry example and view code + terminal output.
5. As a user, I can slide a budget and get honest “walls” and milestone suggestions.
6. As an investor, I can browse the App Store to see demo, tech, price range, and ETA.
7. As a skeptic, I can ask the AI blunt questions and get streamed, honest answers.
8. As a CTO, I can scan a competitor URL and see technical issues surfaced.

Testing (end of Phase 2)
- Lint FE/BE; run testing agent end‑to‑end: SEO analyzer (steps→charts), SSE counters stability, Code Poetry execution, AI chat streaming, budget calc outputs, App Store grid rendering.
- Fix all reported issues; re‑run until green.

## Implementation Steps (High Level)
1) Phase 1 POC
- Implement minimal endpoints + test_core_theater.py. Wire a tiny POC UI.
- Fix until stable (Claude stream, SEO SSE, Counters SSE, Code run).
2) Phase 2 App
- Install libs: framer-motion, recharts, react-syntax-highlighter/prism, react-countup, typewriter/typing.
- Build layout + theme; then sections in order: Hero → Truth Bomb → SEO → Counters → GitHub → Code Poetry → AI Chat → Showcase → App Store → Process → Budget → Clients.
- Connect to backend endpoints; add mocked data where indicated.
- Polish animations (duration 0.3–0.5s), ensure performance.
- Call testing agent; fix; finalize.

## Next Actions (Immediate)
- Approve dark theme palette/typography (Space Grotesk, Inter, JetBrains Mono).
- Provide/approve logos to display (Claude, Gemini 3). We’ll use generic if not provided.
- Confirm any real project names allowed; else all blurred/mocked.
- Optional: Prioritize which 4–6 demos ship first (we’ll ship SEO, Counters, Code Poetry, Budget, Co‑Build Simulator first).

## Success Criteria
- Professional dark theme; sophisticated, not cheesy.
- Interactive demos function reliably with real streaming and animated viz.
- Honest messaging and transparent walls drive trust.
- 8/10 “crazy” but enterprise‑credible; smooth performance, accessible.
- Clear CTAs present and tracked.
- End‑to‑end tests pass; no critical bugs; zero red screens.
