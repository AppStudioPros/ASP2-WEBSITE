# Tech Theater Website - Development Plan

## Project Overview
Rebrand App Studio Pro with a dark, high-tech "dumpster fire lighting" website (8/10 crazy, professional) that aggressively showcases custom AI engineering capabilities.

## Design Theme
- **Base:** Dark charcoal/black (#0d1117)
- **Primary Accent:** ASP Brand Cyan (#00E5FF)
- **Secondary Accent:** ASP Brand Blue (#2196F3)
- **Fire Accent:** Orange (#FF6A00) for "Build Fire" emphasis
- **Typography:** Space Grotesk (headings), Chivo (body), Source Code Pro (code)

---

## Phase 1: POC - Hero + Truth Bomb (Status: COMPLETED ✅)

- [x] New design guidelines created (dark/fire theme)
- [x] Updated index.html with new fonts and dark class
- [x] Created new CSS tokens in index.css with ASP brand colors
- [x] Built HeroParticles component with tsparticles (cyan/blue particles)
- [x] Built TruthBomb split-screen comparison component
- [x] Created new App.js with Hero + TruthBomb sections
- [x] Realistic fire animation next to "Fire" headline
- [x] ASP logo integrated into navbar and footer

---

## Phase 2: Tech Theater Widgets (Status: COMPLETED ✅)

- [x] AnimatedCounter - Real-time build counter with odometer digits (247+)
- [x] ActivityHeatmap - GitHub-style developer activity grid (cyan gradient)
- [x] CodePoetry - Animated syntax-highlighted code display (Python, JS, TS snippets)
- [x] Tech Theater section layout with "Live Dashboard" badge

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

## Key Components Built

### `/app/frontend/src/components/`
- `HeroParticles.js` - Animated particle background
- `TruthBomb.js` - Split-screen comparison section
- `FireAnimation.js` - Realistic animated fire effect
- `AnimatedCounter.js` - Odometer-style number counter
- `ActivityHeatmap.js` - GitHub-style contribution grid
- `CodePoetry.js` - Animated code snippet display

---

## Key Decisions
- **Brand Colors:** ASP cyan/blue gradient with fire orange accent
- **Mocking approved:** Build counters (semi-mocked), heat maps (mocked data)
- **Fire Animation:** CSS/Framer Motion based realistic flames
- **Code Snippets:** Python AI Agent, JavaScript Sync Engine, TypeScript API Layer

## Files Modified
- `/app/frontend/public/index.html` - Dark mode, new fonts
- `/app/frontend/src/index.css` - Dark theme CSS tokens with ASP brand
- `/app/frontend/src/App.js` - Complete page layout
- `/app/frontend/src/App.css` - Custom app styles
