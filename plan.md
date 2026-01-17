# App Studio Pro — AI Website Analyzer (Complete Rebuild) — Plan

## 1) Objectives
- Build a professional AI Website Analyzer to drive qualified leads for App Studio Pro.
- Deliver clear, actionable scores (Visual, UI/UX, SEO, Exposure) and a weighted Overall Score (0–100).
- Auto-detect business type and recommend AI assistants + funnel optimizations.
- Generate a real visual homepage mockup (OpenAI gpt-image-1 via Emergent Universal LLM Key) and show before/after.
- Provide growth projection charts and a polished lead-capture flow (SendGrid email, Calendly embed).
- Design: 70% more professional (corporate, modern purple/blue gradient, clean cards/graphs, Inter font). No sci‑fi.

## 2) Phase 1 — Core POC (Isolation) [REQUIRED]
Purpose: Prove the hardest parts (web scraping + LLM analysis + image generation + email) before full build.

Core to prove:
1) Web Scraper (requests + BeautifulSoup) → parse title, description, meta tags, headings H1/H2, viewport, robots, canonical, links count, CSS color hints.
2) Claude Analysis (Emergent LLM key) → business type classification, factor scoring suggestions, AI assistants & funnel ideas (return as JSON).
3) OpenAI Image Generation (gpt-image-1 via Emergent key) → produce a “homepage redesign” mockup from a compact prompt.
4) “Before” image fallback → use og:image if screenshotting is unavailable in POC.
5) SendGrid email (notify team on lead) → verify minimal endpoint + credentials handling.

POC Steps:
- Integration Playbooks: Confirm OpenAI image gen + SendGrid (use EMERGENT_LLM_KEY for images; ask user for SENDGRID_API_KEY & SENDER_EMAIL).
- Create single Python test script test_core_analyzer.py to:
  a) Scrape a test URL (e.g., https://example.com) → structured extract
  b) Call Claude with extract → JSON (scores draft + business type + suggestions)
  c) Call OpenAI image gen → returns image bytes (validate non-empty)
  d) If SendGrid configured → send a test email (skip gracefully if not)
  e) Print PASS/FAIL summary; exit 0 on success
- Exit Criteria: All (a–c) pass reliably; (d) passes when credentials present.

POC User Stories (≥5):
1. As a user, I can input a URL and get a preliminary analysis summary.
2. As a user, I can see detected business type from my website.
3. As a user, I can request an AI redesign mockup and get an image preview.
4. As a user, I can see a “Before” preview using the site’s og:image.
5. As a business owner, my consultation email notification reaches the team when configured.

## 3) Phase 2 — Main App Development
Deliver the full analyzer with professional UI, image mockups, projection graphs, and lead capture.

Backend (FastAPI):
- POST /api/analyze { url }
  • Scrape + compute factors; run Claude for classification & recs; compute scores & weighted Overall.
  • Return: { url, factors: {visual, ux, seo, exposure}, overall, business_type, ai_assistants, funnel_recs, palette, og_image, notes }
- POST /api/mockup { url, preferences? }
  • Use analysis + design spec (purple/blue gradient, modern, clean) to craft prompt for gpt-image-1; return base64 image.
- POST /api/lead { name, email, phone, company, url, analysis_snapshot }
  • SendGrid email to team; respond with success.
- GET /api/health → { status }.

Scoring (0–100):
- Visual (25%): modern layout cues, typography presence, color harmony, whitespace usage.
- UI/UX (25%): navigation clarity, headings hierarchy, accessibility basics (alt presence ratio, viewport meta), CTA visibility.
- SEO (30%): title/meta/description, canonical, robots, structured data presence (ld+json count), page weight/time-to-first-byte proxy, mobile tag.
- Exposure (20%): social/og tags, presence of sitemap/robots link hints, number of external links, contact footprints.
- Overall = weighted average; return breakdown & rationales.

Business Intelligence:
- Business type classifier (Claude) → { ecommerce | saas | local | services | content | other }.
- AI Assistants & Funnel Recs mapped per type (e.g., ecom: rec bot + cart recovery; saas: onboarding + support; local: booking; services: lead qualifier).

Image Mockup Generation:
- Use EMERGENT_LLM_KEY + gpt-image-1.
- Prompt includes: brand-agnostic, corporate, modern purple/blue gradient (#667eea→#764ba2, accent #12A8FF), clean nav/hero/CTA/cards/testimonial/footer.
- Return base64; frontend shows “After” alongside “Before” (og:image).

Lead Capture:
- CTA button opens a form (Name, Email, Phone, Company) → POST /api/lead (SendGrid).
- Calendly embed/link (configurable env) in a modal/section.

Frontend (React):
- Home: URL input, primary CTA “Analyze Website”.
- Results Dashboard:
  • Score cards (Visual/UI-UX/SEO/Exposure/Overall) with clear explanations.
  • Business Type + AI Assistants & Funnel Recommendations.
  • Growth Projections: chart (3, 6, 12 months) for traffic & conversions uplift.
  • Before/After: og:image vs generated mockup (download/save).
  • Professional CTA: Free Consultation form + Calendly embed.
- Design System:
  • Colors: #667eea, #764ba2, #12A8FF, white/light gray backgrounds, #2D3748 text.
  • Typography: Inter; Grid-based layout; subtle card shadows; elegant gradients; micro-animations only.
- State Management: loading, partial failures (e.g., mockup timeout) with graceful fallbacks.

Phase 2 User Stories (≥5):
1. As a user, I can analyze my URL and see 4 factor scores + overall with rationales.
2. As a user, I can view business type, tailored AI assistants, and funnel recommendations.
3. As a user, I can generate and view an “After” mockup image next to my site’s “Before”.
4. As a user, I can see traffic/conversion projection charts for 3/6/12 months.
5. As a prospect, I can submit the consultation form and receive a confirmation while the team gets an email.
6. As a prospect, I can book a calendar slot via embedded Calendly.
7. As a user, I get clear errors if scraping or mockup generation fails.

## 4) Phase 3 — Testing & Refinement
- Cross-site tests (example.com, marketing sites, SaaS, local businesses).
- Tune scoring weights & heuristics; improve accessibility checks; add structured data detection.
- Improve mockup prompts/templates; allow user to choose style variants.
- Polish UI spacing/contrast; add testimonials/case studies block.
- Optional persistence (MongoDB) for saved analyses & email logs; export PDF report.

Phase 3 User Stories (≥5):
1. As a user, I can re-run analysis on multiple domains and compare results.
2. As a user, I can export a sharable PDF summary of my analysis.
3. As a user, I can choose between 2–3 mockup style variants.
4. As a user, I can refine scores by providing my business goals.
5. As a team member, I can review SendGrid logs or saved submissions if persistence is enabled.

## 5) Implementation Steps (Sequenced)
1. Phase 1 POC
   - Implement scraper module; build feature extractors.
   - Wire Claude JSON analysis (business type + suggestions) using EMERGENT_LLM_KEY.
   - Wire OpenAI gpt-image-1 image generation; validate non-empty bytes.
   - Implement SendGrid helper (env-driven); dry-run if no key.
   - Create single test_core_analyzer.py covering all above; FIX UNTIL PASS.
2. Phase 2 App
   - Design pass (call design agent) with 70% professional theme.
   - Backend endpoints: /api/analyze, /api/mockup, /api/lead; health.
   - Frontend pages: Home (URL input), Results Dashboard, Consultation modal (Calendly + form).
   - Charts: Recharts or Chart.js for growth projections.
   - Loading/error UX; data-testid for all interactive elements.
   - E2E with testing agent; fix issues; finalize copy.
3. Phase 3 Polish
   - Heuristic tuning; prompt tuning; visual refinements; optional persistence & PDF.

## 6) Next Actions
- Provide SendGrid credentials: SENDGRID_API_KEY & SENDER_EMAIL (+ team recipient email).
- Provide Calendly link to embed (or we’ll use a placeholder link).
- Confirm any legal copy or brand assets to include.

## 7) Success Criteria
- URL → Comprehensive analysis with 4 factor scores + overall (0–100) and clear rationales.
- Business type detected + tailored AI assistant recommendations.
- Visual mockup generated (gpt-image-1) and displayed next to the “Before”.
- Growth projections rendered (traffic & conversions, 3/6/12 months).
- Lead form sends team email via SendGrid; Calendly available for booking.
- UI meets “70% more professional” standard: clean, corporate, data-driven.
- All core flows validated with testing agent; zero critical errors.
