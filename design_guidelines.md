{
  "brand_meta": {
    "product": "App Studio Pro - Ultra-futuristic AI Agency Website (Phase 2)",
    "audience": ["startups", "enterprises", "tech enthusiasts"],
    "brand_attributes": ["visionary", "mastery of AI", "precision", "awe-inducing", "trustworthy"],
    "tone": "confident, futuristic, technically sophisticated, welcoming to non-technical buyers"
  },
  "visual_personality": {
    "style_fusion": "Glassmorphism + Holographic neon + Asymmetrical hero + Bento/Grid sections + Subtle parallax",
    "do_not_center_entire_app": true,
    "use_dark_base": "#0a0a0f solid (no heavy gradients on content)",
    "neon_usage": "cyan/ocean-blue highlights only; purple used as solid accent borders and text glow — never as small-element gradients; gradients limited to section backgrounds under 20% viewport"
  },
  "color_system": {
    "base": {
      "background": "#0a0a0f",
      "surface": "#131320",
      "elevated": "rgba(20,20,30,0.6)",
      "border": "rgba(138,43,226,0.30)",
      "divider": "rgba(102,126,234,0.25)",
      "text_primary": "#E9ECFF",
      "text_secondary": "#A8A8B3",
      "text_muted": "#7B7B8A"
    },
    "brand": {
      "primary_cyan": "#00FFFF",
      "primary_cyan_soft": "#66E0FF",
      "ocean_blue": "#12A8FF",
      "electric_blue": "#4FD1FF",
      "purple_accent": "#8A2BE2",
      "indigo": "#667EEA"
    },
    "states": {
      "success": "#1DE9B6",
      "warning": "#FFD166",
      "error": "#FF5C7A",
      "info": "#64E1FF",
      "focus_ring": "#00E5FF"
    },
    "chat_voice_overrides": {
      "note": "Per rule: avoid purple for AI chat/voice. Use cyan/ocean for chat bubbles and accents",
      "assistant_bubble_bg": "rgba(10, 30, 40, 0.6)",
      "user_bubble_bg": "rgba(25, 25, 40, 0.6)",
      "bubble_border": "rgba(0, 229, 255, 0.35)",
      "bubble_glow": "rgba(0, 229, 255, 0.25)"
    },
    "charts": {
      "series": ["#12A8FF", "#1DE9B6", "#FFD166", "#8A2BE2", "#FF5C7A"],
      "grid": "rgba(100, 100, 140, 0.25)"
    },
    "css_custom_properties": {
      "--bg": "#0a0a0f",
      "--surface": "#131320",
      "--elevated": "rgba(20,20,30,0.6)",
      "--border": "rgba(138,43,226,0.30)",
      "--text": "#E9ECFF",
      "--text-2": "#A8A8B3",
      "--primary": "#00FFFF",
      "--primary-2": "#12A8FF",
      "--accent-purple": "#8A2BE2",
      "--ring": "#00E5FF",
      "--success": "#1DE9B6",
      "--warning": "#FFD166",
      "--error": "#FF5C7A",
      "--glass": "rgba(20,20,30,0.6)",
      "--glass-border": "rgba(138,43,226,0.30)",
      "--glass-blur": "20px",
      "--shadow-neon": "0 0 32px rgba(0,229,255,0.28)",
      "--shadow-elev": "0 8px 32px rgba(0,0,0,0.35)"
    }
  },
  "gradients_and_texture": {
    "restriction_rule": "NEVER use dark/saturated purple/pink stacks on small elements; gradient area < 20% viewport; never on text-heavy blocks",
    "approved_gradients": [
      {
        "name": "Neon Mist",
        "usage": "hero/section bg only",
        "css": "linear-gradient(135deg, rgba(0,255,255,0.08) 0%, rgba(18,168,255,0.10) 50%, rgba(102,126,234,0.08) 100%)"
      },
      {
        "name": "Abyss Edge",
        "usage": "decorative overlays, dividers",
        "css": "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(18,168,255,0.10) 50%, rgba(0,0,0,0) 100%)"
      },
      {
        "name": "Holo Halo",
        "usage": "hero orb accents (SVG mask)",
        "css": "radial-gradient(60% 60% at 50% 40%, rgba(0,229,255,0.20) 0%, rgba(0,229,255,0) 60%)"
      }
    ],
    "texture": {
      "noise_overlay": "subtle grain via CSS background-image: url('/noise.png') with opacity 0.04 on section wrappers (avoid on cards)",
      "glow_edges": "box-shadow: 0 0 0 1px rgba(0,229,255,0.25) inset, 0 0 24px rgba(0,229,255,0.2)"
    }
  },
  "typography": {
    "web_fonts": [
      {
        "family": "Space Grotesk",
        "role": "Headings / Numeric / Tech flair"
      },
      {
        "family": "Fira Sans",
        "role": "Body / UI labels (clear + engineered)"
      }
    ],
    "import_example": "<link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Fira+Sans:wght@400;500;700&display=swap\" rel=\"stylesheet\">",
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight",
      "h2": "text-base md:text-lg font-semibold uppercase tracking-wider text-[--text-2]",
      "body": "text-base sm:text-sm leading-relaxed",
      "small": "text-sm text-[--text-2]",
      "mono_for_code": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    },
    "letterforms": {
      "tracking": "wide for overlines, tight for headlines",
      "gradient_text_rule": "Use gradient text only for single-line hero highlights (existing gradient ok). Never on paragraphs."
    }
  },
  "spacing_and_layout": {
    "container": "max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8",
    "grid": {
      "columns": "12",
      "gutter": "1.25rem",
      "bento": "use grid auto-rows-[minmax(120px,auto)] gap-5; place larger cards via col-span-* row-span-*"
    },
    "spacing_scale_px": [4, 8, 12, 16, 24, 32, 40, 48, 64, 80],
    "radius": {
      "sm": 8,
      "md": 12,
      "lg": 20,
      "xl": 28
    },
    "shadows": {
      "elevated": "var(--shadow-elev)",
      "neon": "var(--shadow-neon)",
      "glass_border": "0 0 0 1px var(--glass-border) inset"
    }
  },
  "components": {
    "use_shadcn_first": true,
    "component_path": {
      "button": "./components/ui/button.jsx",
      "card": "./components/ui/card.jsx",
      "tabs": "./components/ui/tabs.jsx",
      "dialog": "./components/ui/dialog.jsx",
      "tooltip": "./components/ui/tooltip.jsx",
      "sheet": "./components/ui/sheet.jsx",
      "dropdown_menu": "./components/ui/dropdown-menu.jsx",
      "select": "./components/ui/select.jsx",
      "switch": "./components/ui/switch.jsx",
      "slider": "./components/ui/slider.jsx",
      "avatar": "./components/ui/avatar.jsx",
      "progress": "./components/ui/progress.jsx",
      "carousel": "./components/ui/carousel.jsx",
      "calendar": "./components/ui/calendar.jsx",
      "sonner_toast": "./components/ui/sonner.jsx",
      "input": "./components/ui/input.jsx",
      "textarea": "./components/ui/textarea.jsx",
      "badge": "./components/ui/badge.jsx",
      "hover_card": "./components/ui/hover-card.jsx"
    },
    "new_composites_to_create": [
      {
        "name": "NeuralBackgroundCanvas.js",
        "tech": ["three", "@react-three/fiber", "@react-three/drei"],
        "desc": "Live neural net with particles + lines; respect performance budget"
      },
      {
        "name": "AvatarDock.js",
        "desc": "Glassmorphic floating panel that hosts AI avatar video/canvas + transcript",
        "notes": "No purple accents inside chat; cyan glow focus",
        "testids": ["avatar-dock", "avatar-mic-button", "avatar-transcript"]
      },
      {
        "name": "BattleArena.js",
        "desc": "Multi-model chat arena with Tabs from shadcn for models and live streaming",
        "testids": ["arena-root", "arena-model-tab-claude", "arena-model-tab-gpt", "arena-model-tab-gemini"]
      },
      {
        "name": "HologramShowcase.js",
        "desc": "3D project viewer (R3F) with turntable controls, holographic material, grid floor, bloom postprocessing",
        "testids": ["hologram-canvas", "hologram-asset-select", "hologram-rotate-cta"]
      },
      {
        "name": "PortfolioGeneratorForm.js",
        "desc": "AI-powered portfolio generator; use shadcn Form + Input + Textarea + Select",
        "testids": ["portfolio-form", "portfolio-submit-button"]
      },
      {
        "name": "VoiceHUD.js",
        "desc": "Voice command overlay + command tips; non-blocking to pointer",
        "testids": ["voice-hud", "voice-toggle"]
      },
      {
        "name": "RoadmapTimeline.js",
        "desc": "Scrollable timeline using Steps (Tabs/Accordion) with progress",
        "testids": ["roadmap-timeline"]
      },
      {
        "name": "TeamGrid.js",
        "desc": "Team in cards with neon underglow + tilt/parallax",
        "testids": ["team-grid"]
      },
      {
        "name": "ContactAIForm.js",
        "desc": "AI-assisted form with suggestions; shadcn form + Sonner toasts",
        "testids": ["contact-form", "contact-submit-button"]
      }
    ],
    "button_variants": {
      "primary": {
        "shape": "professional/corporate",
        "classes": "inline-flex items-center justify-center rounded-md px-5 py-3 bg-[--primary] text-[#001A1F] font-semibold shadow-[var(--shadow-neon)] hover:bg-[#12D7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
        "data_testid": "primary-button"
      },
      "secondary_glass": {
        "shape": "glass/neomorphic",
        "classes": "rounded-xl px-5 py-3 bg-[--glass] border border-[color:var(--glass-border)] text-[--text] shadow-[var(--shadow-elev)] hover:shadow-[0_0_0_1px_rgba(0,229,255,0.25),0_0_24px_rgba(0,229,255,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] transition-shadow",
        "data_testid": "secondary-glass-button"
      },
      "ghost": {
        "shape": "minimalist",
        "classes": "rounded-md px-4 py-2 text-[--text] border border-transparent hover:border-[color:var(--glass-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] transition-colors",
        "data_testid": "ghost-button"
      }
    },
    "interactive_states": {
      "hover": "Use transition-colors or transition-shadow only. Never use transition: all",
      "active": "translate-y-[1px] for press feedback on large buttons",
      "disabled": "opacity-60 cursor-not-allowed",
      "focus": "focus-visible:ring-2 ring-[--ring] ring-offset-0"
    }
  },
  "page_structure": {
    "nav": {
      "layout": "sticky top-0 backdrop-blur-xl bg-black/40 border-b border-[color:var(--glass-border)]",
      "content": ["logo", "primary links", "voice toggle", "cta button"],
      "micro": "underline-on-hover for links; voice toggle glows when active",
      "testids": ["nav-bar", "nav-voice-toggle", "nav-cta"]
    },
    "hero": {
      "layout": "asymmetrical split: left text stack, right avatar/hologram",
      "elements": ["h1 gradient accent", "subhead overline", "support copy", "primary + secondary CTAs", "avatar dock or neural canvas"],
      "notes": "Limit gradient to background deco only. Keep copy on solid/blur glass surfaces"
    },
    "sections": [
      {
        "id": "services",
        "layout": "bento grid of glass cards; each card shows a live micro-demo or icon",
        "testids": ["services-section", "service-card-web", "service-card-app", "service-card-ai"]
      },
      {
        "id": "portfolio",
        "layout": "HologramShowcase + carousel of static case cards",
        "testids": ["portfolio-section"]
      },
      {
        "id": "battle-arena",
        "layout": "Tabs per model + side-by-side transcript blocks",
        "testids": ["battle-section"]
      },
      {
        "id": "team",
        "layout": "responsive 2/3/4 grid with avatar glow rings and role badges",
        "testids": ["team-section"]
      },
      {
        "id": "roadmap",
        "layout": "horizontal scroll on lg, vertical accordion on sm",
        "testids": ["roadmap-section"]
      },
      {
        "id": "contact",
        "layout": "AI-assisted form with suggestion chips + validation hints",
        "testids": ["contact-section"]
      }
    ]
  },
  "motion_and_microinteractions": {
    "library": "framer-motion",
    "principles": [
      "stagger entrances (40-80ms) for grid items",
      "no universal transition: all; only specific properties",
      "parallax on mouse for hologram panel (translate and rotate up to 4deg)",
      "neon pulse for voice toggle (opacity + box-shadow)"
    ],
    "example_js_variants": {
      "fadeUp": "{ hidden:{opacity:0, y:20}, show:{opacity:1, y:0, transition:{duration:0.5, ease:'easeOut'}} }",
      "stagger": "{ show:{ transition:{ staggerChildren:0.06 } } }"
    },
    "scroll_reveal": "use IntersectionObserver or framer-motion whileInView, once:true, margin:'-10%'"
  },
  "three_js_hologram_spec": {
    "r3f_setup": "import { Canvas } from '@react-three/fiber'; import { OrbitControls, Grid, Environment } from '@react-three/drei';",
    "canvas_props": "gl powerPreference:'high-performance', dpr:[1,2], frameloop:'demand' when idle",
    "scene": {
      "lights": "Three low-intensity area/spot lights in cyan/teal/indigo; ambient minimal",
      "materials": "Additive emissive material (emissive: '#00E5FF', emissiveIntensity: 0.6). Use thin-film fresnel shader or MeshPhysicalMaterial with transmission 0.8, clearcoat 1",
      "post": "bloom (threshold 0.85, intensity 0.6, radius 0.7)",
      "floor": "Grid from drei with fade and cyan lines (opacity 0.15)"
    },
    "performance": [
      "Cap polycount < 120k",
      "Use KTX2 compressed textures",
      "Lazy-load models via suspense and prefetch on hover",
      "Pause rendering when tab hidden"
    ],
    "controls": "OrbitControls enablePan:false minDistance:1.6 maxDistance:6 autoRotate on idle"
  },
  "icons_and_media": {
    "icons": "Use lucide-react for line icons; fallback: Font Awesome CDN. No emoji icons.",
    "image_treatment": "Desaturate 10-20%, add cyan inner glow for hover; always put images on glass cards with border-[rgba(138,43,226,0.30)]",
    "video_and_lottie": "Prefer Lottie for small loop accents (<300KB). For avatar, use video/canvas with masking and soft drop-shadow"
  },
  "breakpoints_and_responsiveness": {
    "mobile_first": true,
    "tailwind_breakpoints": {"sm": 640, "md": 768, "lg": 1024, "xl": 1280},
    "adaptations": {
      "hero": "Stacked column; avatar canvas occupies full width above fold",
      "bento": "1-col mobile, 2-col md, 3-4 col lg",
      "timeline": "Accordion on mobile, horizontal on lg",
      "3d": "Lower DPR to 1 on mobile, disable bloom on low-end via prefers-reduced-data"
    }
  },
  "accessibility": {
    "contrast": "Maintain WCAG AA: body text on #0a0a0f >= 4.5:1; avoid neon text on transparent backgrounds",
    "focus": "Always visible ring color var(--ring); do not rely on glow alone",
    "motion_reduce": "Respect prefers-reduced-motion: disable auto-rotate, parallax, excessive animations",
    "aria": "Label mic/voice toggles, model tabs, 3D canvas role='img' with aria-label for scene description"
  },
  "testing_conventions": {
    "rule": "All interactive and key informational elements MUST include data-testid (kebab-case)",
    "naming": [
      "<feature>-<element>-button",
      "<section>-title",
      "<component>-input",
      "<component>-error-text"
    ],
    "examples": [
      "data-testid=\"nav-cta\"",
      "data-testid=\"portfolio-submit-button\"",
      "data-testid=\"arena-model-tab-claude\"",
      "data-testid=\"contact-form-error-text\""
    ]
  },
  "code_scaffolds": {
    "tailwind_tokens": "Add CSS variables to :root or .dark using existing index.css, mapping brand colors; use classes like bg-[--glass] border-[color:var(--glass-border)] text-[--text]",
    "glass_card_class": "'bg-[--glass] backdrop-blur-xl border border-[color:var(--glass-border)] rounded-2xl shadow-[var(--shadow-elev)]'",
    "hero_cta_group": "'flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'"
  },
  "library_integrations": {
    "packages": [
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
      "three-stdlib",
      "maath",
      "lottie-react",
      "recharts"
    ],
    "install": "npm i framer-motion @react-three/fiber @react-three/drei three-stdlib maath lottie-react recharts",
    "usage_snippets_js": {
      "motion_button": "import { motion } from 'framer-motion';\nexport function NeonCTA({ children, onClick }) {\n  return (\n    <motion.button data-testid=\"primary-cta-button\" className=\"rounded-md px-5 py-3 bg-[--primary] text-[#001A1F] font-semibold shadow-[var(--shadow-neon)] hover:bg-[#12D7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] transition-colors\" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick}>\n      {children}\n    </motion.button>\n  );\n}",
      "r3f_canvas": "import { Canvas } from '@react-three/fiber';\nimport { OrbitControls, Grid } from '@react-three/drei';\nexport default function HologramCanvas() {\n  return (\n    <div className=\"relative rounded-2xl overflow-hidden\" data-testid=\"hologram-canvas\">\n      <Canvas gl={{ powerPreference: 'high-performance' }} dpr={[1,2]}>\n        <ambientLight intensity={0.05} />\n        <pointLight color=\"#00E5FF\" intensity={1.2} position={[3,3,3]} />\n        <Grid args={[10,10]} cellColor=\"#00E5FF\" cellSize={0.8} cellThickness={0.25} fade={1} position={[0,-1,0]} />\n        <OrbitControls enablePan={false} minDistance={1.6} maxDistance={6} />\n      </Canvas>\n    </div>\n  );\n}"
    }
  },
  "images_urls": [
    {
      "url": "https://images.unsplash.com/photo-1550176593-d107c56ca211?crop=entropy&cs=srgb&fm=jpg&q=85",
      "description": "Silhouettes at futuristic cyan neon frame",
      "category": "hero background accent (masked overlay, low opacity 0.15)"
    },
    {
      "url": "https://images.unsplash.com/photo-1556607356-d6a622ea735f?crop=entropy&cs=srgb&fm=jpg&q=85",
      "description": "Gesture neon signage",
      "category": "services backdrop slice (right edge decoration)"
    },
    {
      "url": "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=srgb&fm=jpg&q=85",
      "description": "Night city neon scene",
      "category": "portfolio section divider background (blurred 10px)"
    },
    {
      "url": "https://images.unsplash.com/photo-1766389088588-21e13679ffa3?crop=entropy&cs=srgb&fm=jpg&q=85",
      "description": "UV light outlined subject in neon green",
      "category": "team intro banner strip (masked gradient)"
    }
  ],
  "iconography": {
    "library": "lucide-react (primary). Font Awesome CDN allowed if needed",
    "stroke": 1.5,
    "treatment": "Embed inside circular glass buttons with cyan focus ring"
  },
  "content_rules": {
    "hero_copy": "Short, declarative. Max 14 words. Emphasize outcomes (ship AI faster, safer).",
    "services_cards": "3 bullets max, 1 live micro-demo if possible (slider/progress/code block)",
    "portfolio": "Show measurable results badges (conversion %, build time)"
  },
  "performance": {
    "lazyload": "Intersection-based mount for Arena and Hologram sections",
    "images": "next-gen formats + width srcset; use 0.6-0.8 quality",
    "scripts": "Defer Three.js scenes, use requestIdleCallback for non-critical"
  },
  "instructions_to_main_agent": {
    "must_use": "shadcn/ui components from ./components/ui/*.jsx for dropdown, calendar, menu, toasts, etc. No raw HTML widgets.",
    "data_testid": "Apply to every interactive and key informational element using kebab-case and role-based naming.",
    "gradients": "Only on section wrappers or hero background; keep under 20% viewport coverage.",
    "ai_chat_voice": "Remove purple accents inside chat/voice UI; use cyan/ocean hues.",
    "micro_interactions": "Every button/link/cta has hover + focus + press; specify exact transition properties only.",
    "parallax_and_3d": "Enable subtle parallax on hero imagery; 3D canvases pause when offscreen.",
    "accessibility": "Enforce focus states and motion-reduce fallbacks.",
    "testing": "Follow data-testid scheme strictly for E2E.",
    "files_to_create": [
      "src/components/AvatarDock.js",
      "src/components/BattleArena.js",
      "src/components/HologramShowcase.js",
      "src/components/PortfolioGeneratorForm.js",
      "src/components/VoiceHUD.js",
      "src/components/RoadmapTimeline.js",
      "src/components/TeamGrid.js",
      "src/components/ContactAIForm.js",
      "src/components/NeuralBackgroundCanvas.js"
    ]
  },
  "section_specific_specs": {
    "services": {
      "card": "class: bg-[--glass] border border-[color:var(--glass-border)] rounded-2xl p-6 hover:shadow-[0_0_0_1px_rgba(0,229,255,0.25),0_0_24px_rgba(0,229,255,0.20)] transition-shadow",
      "icon": "lucide-react icons at 28px, cyan stroke",
      "cta": "Secondary glass variant"
    },
    "portfolio": {
      "hologram": "use R3F as above; rotate on hover; CTA 'Rotate Project' with data-testid='hologram-rotate-cta'",
      "cards": "carousel of case studies using shadcn carousel"
    },
    "battle_arena": {
      "structure": "Tabs: Claude, GPT, Gemini; each with stream transcript area and input at bottom",
      "input": "shadcn input + send button; cyan ring; data-testid='arena-input'",
      "note": "No purple in chat UI"
    },
    "team": {
      "card": "avatar with neon ring: drop-shadow(0 0 16px rgba(0,229,255,0.35))",
      "hover": "slight tilt (rotate-1) + lift (translate-y-[-4px])"
    },
    "roadmap": {
      "timeline": "border-l md:border-l-0 md:border-t with cyan markers; progress via shadcn progress"
    },
    "contact": {
      "form": "shadcn form + validation; toasts via Sonner",
      "assistant": "chips that suggest fields; each chip is a ghost button"
    }
  },
  "security_and_privacy": {
    "forms": "Mask sensitive inputs; provide explicit consent checkbox (data-testid='consent-checkbox')",
    "analytics": "Delay non-essential analytics until user interaction"
  },
  "websearch_inspirations": [
    {
      "source": "Behance - AI website design",
      "url": "https://www.behance.net/search/projects/ai%20website%20design?locale=en_US",
      "notes": "Dark futuristic compositions, glass + neon cyan highlights"
    },
    {
      "source": "3D websites examples",
      "url": "https://htmlburger.com/blog/3d-websites-examples/",
      "notes": "R3F/WebGL and scroll interactions inspiration"
    }
  ],
  "general_ui_ux_design_guidelines": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
