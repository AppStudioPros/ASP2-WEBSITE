{
  "meta": {
    "product": "App Studio Pro — AI Website Analyzer",
    "audience": ["Business owners", "Marketing directors", "CTOs"],
    "brand_attributes": ["trustworthy", "corporate", "clean", "data-driven", "credible"],
    "goals": [
      "Make it effortless to submit a URL and run analysis",
      "Present scores and insights with instant comprehension",
      "Show growth projections (traffic, conversions) clearly",
      "Capture qualified leads via a professional consultation form"
    ]
  },
  "typography": {
    "fonts": {
      "heading": "Inter",
      "body": "Inter",
      "numeric": "Space Grotesk"
    },
    "google_fonts": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap",
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl",
      "h2": "text-base md:text-lg",
      "h3": "text-xl md:text-2xl",
      "body": "text-base md:text-base",
      "small": "text-sm"
    },
    "rules": [
      "Headings weight 700–900; body 400–500",
      "Use Space Grotesk for numbers, KPIs, chart values",
      "Tight letter-spacing for numeric readouts (-0.01em)"
    ]
  },
  "color_system": {
    "hex": {
      "primary": "#667eea",
      "secondary": "#764ba2",
      "accent": "#12A8FF",
      "bg": "#FFFFFF",
      "bg-muted": "#F7FAFC",
      "text": "#2D3748",
      "success": "#48BB78",
      "warning": "#ECC94B",
      "error": "#F56565",
      "border": "#E2E8F0"
    },
    "css_variables_hsl": {
      "--background": "0 0% 100%",
      "--foreground": "222 28% 23%", 
      "--card": "0 0% 100%",
      "--card-foreground": "222 28% 23%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "222 28% 23%",
      "--primary": "230 76% 66%", 
      "--primary-foreground": "0 0% 100%",
      "--secondary": "267 38% 46%",
      "--secondary-foreground": "0 0% 100%",
      "--accent": "202 100% 54%",
      "--accent-foreground": "0 0% 100%",
      "--muted": "210 45% 98%",
      "--muted-foreground": "215 16% 47%",
      "--success": "146 49% 51%",
      "--warning": "45 80% 61%",
      "--destructive": "0 88% 68%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "210 31% 90%",
      "--input": "210 31% 90%",
      "--ring": "230 76% 66%",
      "--radius": "0.75rem"
    },
    "usage": [
      "Use white (#FFFFFF) for content surfaces and cards",
      "Use #F7FAFC for section backgrounds to differentiate",
      "CTAs use accent #12A8FF with solid/tonal fills only",
      "Score color rules: >70 success, 40–70 warning, <40 error"
    ]
  },
  "gradients": {
    "allowed": [
      "Section background bands: bg from #F7FAFC to #FFFFFF (vertical 0–15% opacity overlay)",
      "Hero top banner: subtle diagonal from #F7FAFC → #FFFFFF with 10–15% tint",
      "Decorative legend/slider handles with a single mild two-color gradient"
    ],
    "prohibited": [
      "Dark/saturated purple-pink or blue-purple gradients",
      "Gradients on text-heavy content areas",
      "Gradients on small UI elements (<100px)"
    ],
    "enforcement": "If gradient area >20% viewport OR readability is impacted, fallback to solid colors"
  },
  "layout": {
    "container": "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8",
    "grid": "12-column CSS grid; gap-x-6 gap-y-8; cards span 12 on mobile, 6 on md, 3 or 4 on lg as needed",
    "nav": {
      "sticky": true,
      "class": "sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200"
    },
    "sections": [
      "Hero: URL input + Analyze CTA",
      "Trust band: logos/badges",
      "Results dashboard: score grid + assistant",
      "Before/After comparison",
      "Growth projections (charts)",
      "Lead capture/Consultation form",
      "FAQ + Footer"
    ]
  },
  "components": {
    "hero_url_input": {
      "purpose": "Collect website URL and start analysis",
      "structure": [
        "Label above input",
        "Input with placeholder 'https://yourdomain.com'",
        "Primary CTA button"
      ],
      "ui": {
        "wrapper": "w-full md:w-4/5 lg:w-2/3 mx-auto",
        "input": "h-12 rounded-lg border border-slate-300 focus-visible:ring-2 focus-visible:ring-[color:oklch(var(--ring))] text-slate-800 placeholder:text-slate-400",
        "button": "h-12 px-6 rounded-lg bg-[color:oklch(var(--accent))] text-white hover:bg-[#1197e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#12A8FF]"
      },
      "testids": {
        "input": "url-input-field",
        "button": "analyze-cta-button"
      }
    },
    "score_cards": {
      "items": ["Visual", "UI/UX", "SEO", "Exposure", "Overall"],
      "container_class": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6",
      "card_class": "bg-white rounded-xl border border-slate-200 shadow-sm p-6",
      "ring_css": "Use conic-gradient ring to render circular progress (see css_snippets.radial_progress)",
      "state_colors": {
        ">=70": "text-[#1F8350] ring-success",
        "40-69": "text-[#946200] ring-warning",
        "<40": "text-[#B42323] ring-destructive"
      },
      "content": [
        "Large score number in Space Grotesk",
        "Short 1–2 line explanation"
      ],
      "testids": [
        "score-card-visual",
        "score-card-uiux",
        "score-card-seo",
        "score-card-exposure",
        "score-card-overall"
      ]
    },
    "assistant_recommendations": {
      "component": "Card with list + optional collapsible rows",
      "ui": {
        "card": "bg-white rounded-xl border border-slate-200 p-6 shadow-sm",
        "item": "flex items-start gap-3 py-3 border-b last:border-0"
      },
      "testids": {
        "container": "ai-recommendations",
        "item": "ai-recommendation-item"
      }
    },
    "before_after": {
      "library": "react-compare-slider",
      "layout": "Side-by-side or slider on md+; stacked on mobile",
      "labels": ["Current Site", "Recommended Design"],
      "ui": {
        "wrapper": "bg-white rounded-xl border border-slate-200 shadow-sm p-4",
        "handle": "rounded-full w-8 h-8 bg-white border border-slate-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
      },
      "testids": {
        "container": "before-after",
        "slider": "before-after-slider"
      }
    },
    "charts": {
      "library": "Recharts",
      "types": ["LineChart", "BarChart"],
      "ui": {
        "container": "bg-white rounded-xl border border-slate-200 shadow-sm p-6",
        "height": 320,
        "palette": {
          "line_primary": "#12A8FF",
          "line_secondary": "#667eea",
          "bar_fill": "#E2E8F0"
        }
      },
      "features": ["Smooth curves (type=monotone)", "Axis labels", "Legend", "Tooltip"],
      "testids": {
        "traffic_chart": "traffic-projection-chart",
        "conversion_chart": "conversion-projection-chart"
      }
    },
    "lead_capture_form": {
      "fields": ["Full Name", "Work Email", "Company", "Website URL", "Monthly Visits (optional)", "Message"],
      "validation": "Use shadcn/ui Form; focus rings use primary; show success/error with Sonner",
      "ui": {
        "card": "bg-white rounded-xl border border-slate-200 shadow-sm p-6",
        "button": "h-11 rounded-lg bg-[#12A8FF] hover:bg-[#1197e6] text-white"
      },
      "testids": {
        "form": "consultation-form",
        "submit": "request-consultation-button"
      }
    },
    "cards_containers": {
      "spec": {
        "bg": "#FFFFFF",
        "shadow": "0 2px 8px rgba(0,0,0,0.1)",
        "radius": "12px",
        "padding": "2rem",
        "border": "1px solid #E2E8F0"
      }
    },
    "navigation": {
      "layout": "Left logo + right actions",
      "class": "flex items-center justify-between py-4",
      "testids": {
        "navbar": "main-navbar",
        "cta": "nav-request-demo-button"
      }
    }
  },
  "shadcn_components": {
    "paths": [
      "./components/ui/button.jsx",
      "./components/ui/input.jsx",
      "./components/ui/label.jsx",
      "./components/ui/card.jsx",
      "./components/ui/progress.jsx",
      "./components/ui/badge.jsx",
      "./components/ui/tabs.jsx",
      "./components/ui/table.jsx",
      "./components/ui/tooltip.jsx",
      "./components/ui/dialog.jsx",
      "./components/ui/switch.jsx",
      "./components/ui/select.jsx",
      "./components/ui/textarea.jsx",
      "./components/ui/form.jsx",
      "./components/ui/sonner.jsx"
    ],
    "import_conventions": {
      "components": "named exports (export const ComponentName = ...) from ./components/[name]",
      "pages": "default exports (export default function PageName(){...})"
    }
  },
  "motion": {
    "libraries": ["framer-motion", "react-countup"],
    "principles": [
      "Subtle fade-in on scroll (0.3s–0.4s ease)",
      "Button hover: specific properties only (background-color, box-shadow)",
      "Progress bars animate width on mount",
      "Number counters for scores with react-countup"
    ]
  },
  "accessibility": {
    "rules": [
      "All interactive elements MUST include data-testid attributes (kebab-case role names)",
      "Labels above inputs; inputs have aria-invalid on error",
      "Focus-visible rings: 2px, high-contrast",
      "Chart tooltips keyboard accessible via focusable legends",
      "Minimum touch targets: 44px"
    ]
  },
  "testing_attributes": {
    "naming": "kebab-case describing role (e.g., 'login-form-submit-button')",
    "required_on": ["buttons", "links", "form inputs", "menus", "cards showing critical values", "confirmation messages"],
    "examples": [
      "data-testid=\"url-input-field\"",
      "data-testid=\"analyze-cta-button\"",
      "data-testid=\"score-card-overall\"",
      "data-testid=\"traffic-projection-chart\"",
      "data-testid=\"request-consultation-button\""
    ]
  },
  "data_viz": {
    "recharts_setup_example": "import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';",
    "line_chart_snippet": "<ResponsiveContainer width='100%' height={320}><LineChart data={data}><CartesianGrid stroke='#EDF2F7' strokeDasharray='3 3' /><XAxis dataKey='label' tick={{ fill: '#718096' }} /><YAxis tick={{ fill: '#718096' }} /><Tooltip wrapperStyle={{ outline: 'none' }} /><Legend /><Line type='monotone' dataKey='traffic' stroke='#12A8FF' strokeWidth={3} dot={false} /><Line type='monotone' dataKey='conversions' stroke='#667eea' strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer>",
    "bar_chart_snippet": "<ResponsiveContainer width='100%' height={320}><BarChart data={data}><CartesianGrid stroke='#EDF2F7' strokeDasharray='3 3' /><XAxis dataKey='label' tick={{ fill: '#718096' }} /><YAxis tick={{ fill: '#718096' }} /><Tooltip wrapperStyle={{ outline: 'none' }} /><Legend /><Bar dataKey='baseline' fill='#E2E8F0' radius={[6,6,0,0]} /><Bar dataKey='projected' fill='#12A8FF' radius={[6,6,0,0]} /></BarChart></ResponsiveContainer>"
  },
  "css_snippets": {
    "radial_progress": "/* Circular score ring (conic gradient) */\n.score-ring {\n  --size: 124px;\n  --track: #EDF2F7;\n  --fill: #12A8FF;\n  width: var(--size);\n  height: var(--size);\n  border-radius: 9999px;\n  background: conic-gradient(var(--fill) calc(var(--value) * 1%), var(--track) 0);\n  display: grid;\n  place-items: center;\n}\n.score-ring > span {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 1.75rem;\n  color: #2D3748;\n}",
    "card_base": "@apply bg-white rounded-xl border border-slate-200 shadow-sm p-6;",
    "button_primary": ".btn-primary { background-color: #12A8FF; color:#fff; border-radius: 0.5rem; padding: 0.75rem 1.25rem; transition: background-color .2s ease, box-shadow .2s ease; } .btn-primary:hover { background-color:#1197e6; box-shadow: 0 6px 18px rgba(18,168,255,0.25); } .btn-primary:focus-visible { outline: 2px solid #12A8FF; outline-offset: 2px; }"
  },
  "images": {
    "usage": "Use real-world corporate imagery sparingly to build trust (hero, consultation form, testimonial band)",
    "image_urls": [
      {
        "category": "hero_trust",
        "description": "meeting room glass signage",
        "url": "https://images.unsplash.com/photo-1632858265907-961f1454ccf6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBiMmIlMjB0ZWFtJTIwbWVldGluZyUyMG1vZGVybiUyMG9mZmljZXxlbnwwfHx8fDE3Njg2MTI3NDB8MA&ixlib=rb-4.1.0&q=85"
      },
      {
        "category": "case_study",
        "description": "boardroom meeting",
        "url": "https://images.unsplash.com/photo-1764690690771-b4522d66b433?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBiMmIlMjB0ZWFtJTIwbWVldGluZyUyMG1vZGVybiUyMG9mZmljZXxlbnwwfHx8fDE3Njg2MTI3NDB8MA&ixlib=rb-4.1.0&q=85"
      },
      {
        "category": "form_sidebar",
        "description": "elegant office corridor",
        "url": "https://images.unsplash.com/photo-1668299444654-cc78b6692db1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBiMmIlMjB0ZWFtJTIwbWVldGluZyUyMG1vZGVybiUyMG9mZmljZXxlbnwwfHx8fDE3Njg2MTI3NDB8MA&ixlib=rb-4.1.0&q=85"
      },
      {
        "category": "testimonial",
        "description": "meeting at window table",
        "url": "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBiMmIlMjB0ZWFtJTIwbWVldGluZyUyMG1vZGVybiUyMG9mZmljZXxlbnwwfHx8fDE3Njg2MTI3NDB8MA&ixlib=rb-4.1.0&q=85"
      }
    ]
  },
  "libraries": {
    "install": [
      "npm i recharts",
      "npm i react-compare-slider",
      "npm i framer-motion",
      "npm i react-countup"
    ],
    "usage_notes": [
      "Recharts: always wrap in ResponsiveContainer; use strokeWidth 3; disable dots for lines",
      "react-compare-slider: add data-testid on the main <ReactCompareSlider />",
      "Framer Motion: use whileInView with once: true; threshold 0.2",
      "CountUp: animate score numbers (duration 1.2s)"
    ]
  },
  "page_structure": {
    "landing": [
      "Header (logo, Request Demo button)",
      "Hero with URL input + Analyze CTA",
      "Trust band (small, muted logos)",
      "How it works (3 steps, icon + copy)",
      "Footer (legal, contact)"
    ],
    "results_dashboard": [
      "Business type badge + overall score",
      "Score cards grid",
      "AI recommendations",
      "Before/After comparison",
      "Growth projections",
      "Lead capture form"
    ]
  },
  "buttons": {
    "style_family": "Professional / Corporate",
    "tokens": {
      "--btn-radius": "10px",
      "--btn-shadow": "0 6px 18px rgba(18,168,255,0.18)",
      "--btn-motion": ".2s ease"
    },
    "variants": {
      "primary": "bg-[#12A8FF] text-white hover:bg-[#1197e6] focus-visible:outline-2 focus-visible:outline-[#12A8FF]",
      "secondary": "bg-[#667eea] text-white hover:bg-[#5a6fe0]",
      "ghost": "bg-transparent text-[#2D3748] hover:bg-[#F7FAFC] border border-slate-200"
    },
    "sizes": {
      "sm": "h-9 px-4",
      "md": "h-11 px-5",
      "lg": "h-12 px-6"
    }
  },
  "micro_interactions": {
    "rules": [
      "Do not use universal transition; restrict to background-color, box-shadow, color",
      "Section fade-in on scroll; distance 8–12px",
      "Charts animate on mount only"
    ]
  },
  "export_conventions": {
    "components": "named exports (export const ComponentName = ...)",
    "pages": "default exports (export default function PageName(){...})",
    "paths_note": "Use ./components/ui/* from this repo (JS files, not TSX)"
  },
  "component_path": {
    "Button": "./components/ui/button.jsx",
    "Input": "./components/ui/input.jsx",
    "Label": "./components/ui/label.jsx",
    "Card": "./components/ui/card.jsx",
    "Progress": "./components/ui/progress.jsx",
    "Badge": "./components/ui/badge.jsx",
    "Tabs": "./components/ui/tabs.jsx",
    "Table": "./components/ui/table.jsx",
    "Tooltip": "./components/ui/tooltip.jsx",
    "Dialog": "./components/ui/dialog.jsx",
    "Switch": "./components/ui/switch.jsx",
    "Select": "./components/ui/select.jsx",
    "Textarea": "./components/ui/textarea.jsx",
    "Form": "./components/ui/form.jsx",
    "Sonner": "./components/ui/sonner.jsx"
  },
  "code_scaffolds": {
    "hero_section": "<section className=\"py-12 md:py-20 bg-[#F7FAFC]\" data-testid=\"hero-section\"><div className=\"mx-auto max-w-[1200px] px-4\"><h1 className=\"text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900\">Analyze your website with AI</h1><p className=\"mt-4 text-slate-600 max-w-2xl\">Get a professional-grade audit across UX, SEO, and funnel performance.</p><div className=\"mt-6 flex flex-col sm:flex-row gap-3\"><Input data-testid=\"url-input-field\" type=\"url\" placeholder=\"https://yourdomain.com\" className=\"h-12\" /><Button data-testid=\"analyze-cta-button\" className=\"h-12\">Analyze Website</Button></div></div></section>",
    "score_card": "<Card className=\"p-6\" data-testid=\"score-card-uiux\"><div className=\"flex items-center justify-between\"><span className=\"text-slate-500 text-sm\">UI/UX</span><Badge variant=\"secondary\">Business: SaaS</Badge></div><div className=\"mt-4 flex items-center gap-6\"><div className=\"score-ring\" style={{ ['--value'] : score }}><span><CountUp end={score} duration={1.2} /></span></div><p className=\"text-slate-600\">Improve spacing, emphasize primary CTA, and streamline forms.</p></div></Card>",
    "recharts_line": "<ResponsiveContainer width=\"100%\" height={320}><LineChart data={data}><CartesianGrid stroke=\"#EDF2F7\" strokeDasharray=\"3 3\" /><XAxis dataKey=\"label\" tick={{ fill: '#718096' }} /><YAxis tick={{ fill: '#718096' }} /><Tooltip wrapperStyle={{ outline: 'none' }} /><Legend /><Line type=\"monotone\" dataKey=\"traffic\" stroke=\"#12A8FF\" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer>",
    "before_after": "<div className=\"p-4 bg-white rounded-xl border\" data-testid=\"before-after\"><ReactCompareSlider itemOne={<img src=\"/before.png\" alt=\"Current Site\" />} itemTwo={<img src=\"/after.png\" alt=\"Recommended Design\" />} className=\"rounded-lg\" data-testid=\"before-after-slider\" /></div>",
    "lead_form": "<Card className=\"p-6\" data-testid=\"consultation-form\"><form className=\"grid grid-cols-1 sm:grid-cols-2 gap-4\"><div className=\"col-span-1\"><Label htmlFor=\"name\">Full Name</Label><Input id=\"name\" data-testid=\"name-input\" /></div><div className=\"col-span-1\"><Label htmlFor=\"email\">Work Email</Label><Input id=\"email\" type=\"email\" data-testid=\"email-input\" /></div><div className=\"col-span-1\"><Label htmlFor=\"company\">Company</Label><Input id=\"company\" data-testid=\"company-input\" /></div><div className=\"col-span-1\"><Label htmlFor=\"url\">Website URL</Label><Input id=\"url\" type=\"url\" data-testid=\"website-input\" /></div><div className=\"col-span-2\"><Label htmlFor=\"message\">Message</Label><Textarea id=\"message\" rows=\"4\" data-testid=\"message-input\" /></div><div className=\"col-span-2\"><Button className=\"h-11\" data-testid=\"request-consultation-button\">Request Consultation</Button></div></form></Card>"
  },
  "instructions_to_main_agent": [
    "Replace sci-fi styling by removing ./src/App.css references where possible; rely on Tailwind + tokens in index.css",
    "Inject Google Fonts link in index.html head for Inter and Space Grotesk",
    "Set CSS variables (color_system.css_variables_hsl) in :root (you can extend ./src/index.css base tokens)",
    "Use shadcn/ui components listed in component_path only; avoid raw HTML for complex components",
    "For charts use Recharts per data_viz; wrap with Card containers",
    "Use react-compare-slider for Before/After; ensure keyboard focus ring",
    "Every interactive and key informational element MUST include data-testid (see testing_attributes)",
    "Transitions: never use transition-all; restrict to specific properties",
    "Mobile-first: stack everything; upgrade to grid on md+",
    "Keep gradients to section backgrounds only and under 20% viewport coverage"
  ],
  "inspiration_references": {
    "stripe_linear_notion_notes": [
      "Stripe-like scannability: clear type ladder, generous whitespace",
      "Linear-like calm surfaces and unobtrusive motion",
      "Notion-like focus on content with minimal chrome"
    ],
    "citations": [
      "https://www.illustration.app/blog/stripe-payment-ux-gold-standard",
      "https://react-compare-slider.vercel.app"
    ]
  }
}


General UI UX Design Guidelines  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.