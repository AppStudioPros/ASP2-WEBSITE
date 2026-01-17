# Tech Theater Website - Development Plan

## Project Overview
Rebrand App Studio Pro with a dark, high-tech "dumpster fire lighting" website (8/10 crazy, professional) that aggressively showcases custom AI engineering capabilities.

## Design Theme
- **Base:** Dark charcoal/black (#0d1117)
- **Primary Accent:** Ember/Fire (orange #FF6A00)
- **Secondary Accent:** Electric (cyan #33E6FF)
- **Typography:** Space Grotesk (headings), Chivo (body), Source Code Pro (code)

---

## Phase 1: POC - Hero + Truth Bomb (Status: IN PROGRESS)

### Completed
- [x] New design guidelines created (dark/fire theme)
- [x] Updated index.html with new fonts and dark class
- [x] Created new CSS tokens in index.css
- [x] Built HeroParticles component with tsparticles
- [x] Built TruthBomb split-screen comparison component
- [x] Created new App.js with Hero + TruthBomb sections
- [x] Installed required dependencies (tsparticles, framer-motion)

### Pending
- [ ] Verify POC renders correctly
- [ ] Get user feedback on vibe
- [ ] Fix any visual/functional issues

---

## Phase 2: Tech Theater Widgets (Status: NOT STARTED)

- [ ] AnimatedCounter - Real-time build counter with odometer digits
- [ ] ActivityHeatmap - GitHub-style developer activity grid
- [ ] CodePoetry - Animated syntax-highlighted code display

---

## Phase 3: Enhanced SEO Analyzer (Status: NOT STARTED)

- [ ] Re-skin existing analyzer with dark theme
- [ ] Add "Tech Theater" loading animations (dials, progress rings)
- [ ] Streaming console log effect during analysis
- [ ] Dramatic results presentation

---

## Phase 4: Content & Polish (Status: NOT STARTED)

- [ ] Live Session Showcase (mocked video embeds)
- [ ] Client work gallery
- [ ] White-label app store section
- [ ] Final animations and micro-interactions
- [ ] Mobile responsiveness polish

---

## Key Decisions
- **Mocking approved:** Build counters, heat maps, video embeds
- **AI Integrations:** Repurpose existing Claude/OpenAI analyzer logic
- **Design System:** Full dark theme with ember/electric accents

## Files Modified
- `/app/frontend/public/index.html` - Dark mode, new fonts
- `/app/frontend/src/index.css` - Dark theme CSS tokens
- `/app/frontend/src/App.js` - New Hero + TruthBomb layout
- `/app/frontend/src/App.css` - Custom app styles
- `/app/frontend/src/components/HeroParticles.js` - NEW
- `/app/frontend/src/components/TruthBomb.js` - NEW
