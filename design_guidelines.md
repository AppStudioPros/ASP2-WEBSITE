{
  "meta": {
    "project_name": "Tech Theater — App Studio Pro",
    "brand_attributes": ["aggressive", "confident", "engineering-first", "high-contrast", "dark theatrical", "anti-template"],
    "tone": "Dark, high-tech with ember/electric accents. 8/10 on the crazy scale but enterprise-ready.",
    "primary_audience": ["CTOs", "Product leaders", "VC-backed founders", "Enterprise buyers"],
    "success_actions": [
      "Scroll-engage with Hero (particles/parallax)",
      "Compare split-screen Truth Bomb section",
      "Interact with widgets (counter/heatmap/code)",
      "Run the SEO Analyzer tool",
      "Contact/Book intro via primary CTA"
    ]
  },

  "typography": {
    "brand_pairing": {
      "display_headings": "Space Grotesk",
      "body_copy": "Chivo",
      "code_mono": "Source Code Pro"
    },
    "font_import_html": [
      "<link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Chivo:wght@300;400;600;700&family=Source+Code+Pro:wght@400;600;700&display=swap\" rel=\"stylesheet\">"
    ],
    "tailwind_font_classes": {
      "heading": "font-[\"Space Grotesk\",ui-sans-serif,system-ui]",
      "body": "font-[Chivo,ui-sans-serif,system-ui]",
      "mono": "font-[\"Source Code Pro\",ui-monospace,monospace]"
    },
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight",
      "h2": "text-base md:text-lg font-semibold tracking-tight",
      "h3": "text-lg md:text-xl font-semibold",
      "body": "text-sm md:text-base",
      "small": "text-xs md:text-sm"
    }
  },

  "color_system": {
    "notes": "Dark-first palette with ember/electric accents. Avoid startup blue and any saturated purple→pink gradients. Use gradients only in section backdrops and decorative overlays (<=20% viewport).",
    "tokens_hsl": {
      "--background": "210 15% 6%",            
      "--foreground": "210 15% 96%",
      "--card": "210 14% 8%",
      "--card-foreground": "210 12% 94%",
      "--muted": "210 10% 22%",
      "--muted-foreground": "210 7% 62%",
      "--border": "210 10% 16%",
      "--input": "210 10% 18%",
      "--ring": "24 95% 56%",                  
      "--accent-ember": "24 100% 52%",          
      "--accent-ember-2": "40 100% 52%",        
      "--accent-electric": "186 95% 60%",       
      "--accent-lava": "358 92% 56%",          
      "--success": "162 72% 45%",
      "--warning": "40 100% 52%",
      "--destructive": "0 72% 46%",
      "--chart-1": "24 95% 56%",
      "--chart-2": "186 95% 60%",
      "--chart-3": "358 92% 56%",
      "--chart-4": "162 72% 45%",
      "--chart-5": "210 10% 62%"
    },
    "tailwind_suggested_classes": {
      "bg_base": "bg-[hsl(var(--background))]",
      "text_base": "text-[hsl(var(--foreground))]",
      "card": "bg-[hsl(var(--card))] border border-[hsl(var(--border))]",
      "ember_text": "text-[hsl(var(--accent-ember))]",
      "electric_text": "text-[hsl(var(--accent-electric))]",
      "ember_glow": "shadow-[0_0_60px_rgba(255,106,0,0.15)]",
      "electric_glow": "shadow-[0_0_70px_rgba(0,240,255,0.15)]",
      "divider": "border-t border-[hsl(var(--border))]"
    },
    "gradients": {
      "allowed_examples": [
        "bg-[radial-gradient(80%_60%_at_50%_10%,rgba(255,106,0,0.18),rgba(0,0,0,0)_60%)]",
        "bg-[conic-gradient(from_200deg_at_70%_30%,rgba(0,240,255,0.15),rgba(0,0,0,0)_40%)]"
      ],
      "prohibited": ["purple→pink", "blue→purple", "green→blue", "red→pink", "stacked multi-layer in same viewport"],
      "usage_rules": [
        "Decorative overlays only; never on heavy text blocks",
        "Keep under 20% of viewport; otherwise fallback to solid",
        "Use low alpha to preserve contrast"
      ]
    }
  },

  "css_tokens": {
    "add_to_index_css": """
@layer base {
  :root.tech-theater-dark {
    --background: 210 15% 6%;
    --foreground: 210 15% 96%;
    --card: 210 14% 8%;
    --card-foreground: 210 12% 94%;
    --muted: 210 10% 22%;
    --muted-foreground: 210 7% 62%;
    --border: 210 10% 16%;
    --input: 210 10% 18%;
    --ring: 24 95% 56%;
    --accent-ember: 24 100% 52%;
    --accent-ember-2: 40 100% 52%;
    --accent-electric: 186 95% 60%;
    --accent-lava: 358 92% 56%;
    --radius: 0.625rem;
  }
}
    """,
    "init_dark_mode_js": {
      "snippet": "document.documentElement.classList.add('dark'); document.documentElement.classList.add('tech-theater-dark');"
    }
  },

  "layout_system": {
    "container": "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]",
    "grid": {
      "split_screen": "grid grid-cols-1 lg:grid-cols-[1fr,1.18fr] items-stretch gap-6",
      "bento_3up": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
      "stack": "flex flex-col gap-8"
    },
    "spacing": {
      "section_y": "py-16 sm:py-24 lg:py-32",
      "block": "p-6 sm:p-8 lg:p-10"
    }
  },

  "sections": {
    "hero": {
      "goal": "Deliver a bold engineering-first statement with living background (embers/code particles) + decisive CTA.",
      "structure": {
        "wrapper": "relative overflow-hidden bg-[hsl(var(--background))]",
        "backdrop_layers": [
          "absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(255,106,0,0.14),rgba(0,0,0,0)_60%)]",
          "<HeroParticles data-testid=\"hero-particles-canvas\" />"
        ],
        "content": "relative container min-h-[72vh] flex items-center",
        "heading": "text-[hsl(var(--foreground))] font-bold font-[\'Space Grotesk\'] text-4xl sm:text-5xl lg:text-6xl max-w-3xl",
        "subtext": "text-[hsl(var(--muted-foreground))] text-base md:text-lg max-w-2xl mt-5",
        "ctas": "mt-8 flex flex-wrap gap-4"
      },
      "interactions": [
        "Parallax: subtle translateY of ember layer on mousemove",
        "CTA hover: ring-ember + glow"
      ]
    },

    "truth_bomb": {
      "goal": "Call out no-code myths vs real engineering reality in a dramatic split-screen.",
      "layout": "grid grid-cols-1 lg:grid-cols-2 gap-6",
      "left_panel": {
        "classes": "relative border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--card))] p-8 sm:p-10",
        "effects": ["grayscale", "opacity-80"],
        "title_style": "text-[hsl(var(--muted-foreground))] font-semibold",
        "data_testids": ["truth-bomb-left-panel", "truth-bomb-left-claim-list"]
      },
      "right_panel": {
        "classes": "relative border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--card))] p-8 sm:p-10 ring-1 ring-[hsl(var(--ring))]",
        "accents": ["ember_glow", "electric_glow"],
        "title_style": "text-[hsl(var(--foreground))] font-semibold",
        "data_testids": ["truth-bomb-right-panel", "truth-bomb-right-proof-list"]
      },
      "mobile": "Stacks vertically; keep left first for narrative"
    },

    "widgets": {
      "build_counter": {
        "description": "Real-time builds counter with odometer-style animated digits.",
        "component": "AnimatedCounter.js",
        "container_classes": "card p-6 flex items-center justify-between",
        "data_testids": ["build-counter", "build-counter-increment-button"],
        "note": "Use framer-motion for staggered digits."
      },
      "github_heatmap": {
        "description": "Developer activity grid using CSS Grid with d3-scale for intensity.",
        "component": "ActivityHeatmap.js",
        "container_classes": "card p-6",
        "data_testids": ["github-heatmap", "github-heatmap-cell"],
        "note": "Fetch data or mock. Support dark theme cells and accessible labels."
      },
      "code_poetry": {
        "description": "Animated code snippet with Prism.js highlighting + staggered line reveals.",
        "component": "CodePoetry.js",
        "container_classes": "card p-6 bg-gradient-to-b from-transparent to-black/20",
        "data_testids": ["code-poetry", "code-poetry-line"],
        "note": "Monospace + mild glow edges; never over 20% gradient coverage."
      }
    },

    "seo_analyzer": {
      "goal": "Dark, dramatic form with kinetic loading: progress ring, dials, and streaming log text.",
      "wrapper": "card p-6 sm:p-8 space-y-6",
      "form": {
        "fields": [
          {"component": "Input", "label": "Website URL", "placeholder": "https://example.com", "testid": "seo-url-input"},
          {"component": "Select", "label": "Depth", "options": ["Shallow", "Standard", "Deep"], "testid": "seo-depth-select"}
        ],
        "cta": {"component": "Button", "label": "Run Analysis", "variant": "default", "testid": "seo-run-button"}
      },
      "loading": {
        "ui": ["<Progress data-testid=\\"seo-progress\\\" value={progress}/>", "spinner/dials via framer-motion"],
        "stream": "Animated console lines in monospace with caret; use setInterval to append and auto-scroll.",
        "testids": ["seo-log-stream", "seo-status-text"]
      },
      "result": {
        "ui": ["Tabs for Overview, Issues, Recommendations", "Badge severities", "Accordion for details"],
        "testids": ["seo-result-tabs", "seo-issue-item", "seo-recommendation-item"]
      }
    }
  },

  "components_and_paths": {
    "use_shadcn": true,
    "paths": {
      "Button": "./components/ui/button",
      "Card": "./components/ui/card",
      "Tabs": "./components/ui/tabs",
      "Accordion": "./components/ui/accordion",
      "Badge": "./components/ui/badge",
      "Input": "./components/ui/input",
      "Select": "./components/ui/select",
      "Progress": "./components/ui/progress",
      "Dialog": "./components/ui/dialog",
      "Toast": "./components/ui/toaster",
      "Sonner": "./components/ui/sonner",
      "Tooltip": "./components/ui/tooltip",
      "Switch": "./components/ui/switch",
      "Separator": "./components/ui/separator"
    },
    "new_components": [
      {"name": "HeroParticles", "path_suggestion": "./components/HeroParticles.js"},
      {"name": "AnimatedCounter", "path_suggestion": "./components/AnimatedCounter.js"},
      {"name": "ActivityHeatmap", "path_suggestion": "./components/ActivityHeatmap.js"},
      {"name": "CodePoetry", "path_suggestion": "./components/CodePoetry.js"},
      {"name": "SEOAnalyzer", "path_suggestion": "./components/SEOAnalyzer.js"}
    ]
  },

  "buttons": {
    "tokens": {
      "--btn-radius": "0.625rem",
      "--btn-shadow": "0 0 0 0 rgba(0,0,0,0)",
      "--btn-motion": "150ms ease-out",
      "--btn-ring": "0 0 0 4px rgba(255,106,0,0.25)"
    },
    "variants": {
      "primary": "bg-[hsl(var(--accent-ember))] text-black hover:bg-[hsl(var(--accent-ember-2))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-ember))] disabled:opacity-60",
      "secondary": "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80",
      "ghost": "bg-transparent text-[hsl(var(--foreground))] hover:bg-white/5 border border-[hsl(var(--border))]"
    },
    "sizes": {
      "sm": "px-3 h-9 rounded-[var(--btn-radius)]",
      "md": "px-4 h-11 rounded-[var(--btn-radius)]",
      "lg": "px-6 h-12 rounded-[var(--btn-radius)]"
    }
  },

  "micro_interactions_and_motion": {
    "principles": [
      "No universal transition: target only color/background/opacity on interactive elements",
      "Use short, confident durations (120–220ms)",
      "Entrance: fade+rise 12px with slight delay staggering",
      "Hover: ember/electric ring + 1–2px translateY"
    ],
    "framer_motion_patterns": {
      "fade_rise": {"initial": {"opacity": 0, "y": 12}, "animate": {"opacity": 1, "y": 0}, "transition": {"duration": 0.4}},
      "stagger_container": {"variants": {"show": {"transition": {"staggerChildren": 0.08}}}}
    }
  },

  "libraries": {
    "install": [
      "npm i framer-motion react-countup",
      "npm i prismjs",
      "npm i d3-scale d3-array",
      "npm i react-tsparticles tsparticles-engine",
      "npm i lucide-react"
    ],
    "usage_notes": [
      "Use react-tsparticles only in Hero. Keep particle count lean (<150) for performance.",
      "Prism.js: import 'prismjs/themes/prism-tomorrow.css' or a custom dark theme.",
      "d3-scale for heatmap color mapping; render with CSS Grid for responsiveness.",
      "Sonner toasts for SEO Analyzer states (success/error)."
    ]
  },

  "code_scaffolds_js": {
    "HeroParticles.js": """
import { useMemo } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-engine'

export const HeroParticles = (props) => {
  const options = useMemo(() => ({
    background: { color: 'transparent' },
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 90, density: { enable: true, area: 800 } },
      color: { value: ['#FF6A00', '#33E6FF'] },
      opacity: { value: { min: 0.08, max: 0.25 } },
      size: { value: { min: 1, max: 2 } },
      move: { enable: true, speed: 0.5 },
      links: { enable: false },
      shape: { type: 'circle' }
    },
    detectRetina: true
  }), [])

  return (
    <div className=\"absolute inset-0 pointer-events-none\" aria-hidden data-testid=\"hero-particles-canvas\">
      <Particles id=\"hero-particles\" options={options} init={loadSlim} />
    </div>
  )
}
    """,

    "AnimatedCounter.js": """
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const AnimatedCounter = ({ value, label }) => {
  const [digits, setDigits] = useState(String(value).split(''))
  useEffect(() => setDigits(String(value).split('')), [value])

  return (
    <div className=\"flex items-end gap-3\" data-testid=\"build-counter\">
      <div className=\"flex gap-1 text-4xl sm:text-5xl font-bold font-[\\'Space Grotesk\\'] text-[hsl(var(--foreground))]\">
        {digits.map((d, i) => (
          <AnimatePresence key={i} mode=\"popLayout\">
            <motion.span
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className=\"tabular-nums font-[\\'Source Code Pro\\'] text-[hsl(var(--accent-ember))]\"
            >
              {d}
            </motion.span>
          </AnimatePresence>
        ))}
      </div>
      {label && <span className=\"text-sm text-[hsl(var(--muted-foreground))]\">{label}</span>}
    </div>
  )
}
    """,

    "ActivityHeatmap.js": """
import { scaleLinear } from 'd3-scale'

export const ActivityHeatmap = ({ weeks = 12, data = [] }) => {
  // data = [{ date: '2024-01-01', count: 3 }, ...]
  const values = data.map(d => d.count)
  const max = Math.max(1, ...values)
  const color = scaleLinear().domain([0, max]).range(['#161b22', '#FF6A00'])

  // Build a recent-days sequence
  const days = weeks * 7
  const today = new Date()
  const cells = Array.from({ length: days }).map((_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - 1 - i))
    const key = date.toISOString().slice(0, 10)
    const v = data.find(d => d.date === key)?.count || 0
    return { key, v }
  })

  return (
    <div className=\"grid grid-cols-7 gap-1\" role=\"grid\" aria-label=\"Developer activity heatmap\" data-testid=\"github-heatmap\">
      {cells.map((c, idx) => (
        <div
          key={c.key + idx}
          title={`${c.key}: ${c.v} events`}
          className=\"w-3.5 h-3.5 rounded-[2px]\"
          style={{ backgroundColor: color(c.v) }}
          data-testid=\"github-heatmap-cell\"
          aria-label={`${c.key}: ${c.v} events`}
        />
      ))}
    </div>
  )
}
    """,

    "CodePoetry.js": """
import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'

export const CodePoetry = ({ code = '', language = 'javascript' }) => {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) Prism.highlightAllUnder(ref.current)
  }, [code])

  const lines = code.split('\n')

  return (
    <pre ref={ref} className=\"relative p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] before:absolute before:inset-0 before:bg-[radial-gradient(60%_40%_at_10%_0%,rgba(255,106,0,0.07),rgba(0,0,0,0)_60%)] before:pointer-events-none overflow-auto\" data-testid=\"code-poetry\">
      <code className={`language-${language} text-sm font-[\\'Source Code Pro\\']`}>
        {lines.map((line, i) => (
          <div key={i} className=\"opacity-0 animate-[fadeIn_0.4s_ease_forwards] [animation-delay:var(--d)]\" style={{ ['--d']:`${i*80}ms` }} data-testid=\"code-poetry-line\">{line || '\u00A0'}</div>
        ))}
      </code>
    </pre>
  )
}
    """,

    "SEOAnalyzer.js": """
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Progress } from './components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { toast } from './components/ui/sonner'

export default function SEOAnalyzer() {
  const [url, setUrl] = useState('')
  const [depth, setDepth] = useState('Standard')
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [log, setLog] = useState([])

  const run = async () => {
    if (!url) {
      toast('Enter a URL to analyze')
      return
    }
    setIsRunning(true)
    setProgress(0)
    setLog([])

    let p = 0
    const timer = setInterval(() => {
      p = Math.min(100, p + Math.random() * 14)
      setProgress(p)
      setLog(prev => [...prev, `Scanning… ${Math.round(p)}%`])
      if (p >= 100) {
        clearInterval(timer)
        setIsRunning(false)
        setLog(prev => [...prev, 'Complete. Rendering results…'])
      }
    }, 450)
  }

  return (
    <div className=\"space-y-6\">
      <div className=\"flex flex-col sm:flex-row gap-3\">
        <Input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder=\"https://example.com\"
          className=\"h-12 bg-[hsl(var(--input))] border-[hsl(var(--border))]\"
          data-testid=\"seo-url-input\"
        />
        {/* Replace with shadcn Select if needed in your page context */}
        <Button onClick={run} className=\"h-12\" data-testid=\"seo-run-button\">Run Analysis</Button>
      </div>
      {isRunning && (
        <div className=\"space-y-3\">
          <Progress value={progress} data-testid=\"seo-progress\" />
          <div className=\"h-40 overflow-auto bg-black/40 border border-[hsl(var(--border))] rounded-md p-3 font-[\\'Source Code Pro\\'] text-[hsl(var(--muted-foreground))]\" data-testid=\"seo-log-stream\">
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </div>
      )}

      {!isRunning && progress >= 100 && (
        <Tabs defaultValue=\"overview\" className=\"w-full\" data-testid=\"seo-result-tabs\">
          <TabsList>
            <TabsTrigger value=\"overview\">Overview</TabsTrigger>
            <TabsTrigger value=\"issues\">Issues</TabsTrigger>
            <TabsTrigger value=\"recs\">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value=\"overview\">Scores & charts</TabsContent>
          <TabsContent value=\"issues\">Issue list (a11y, meta, speed)</TabsContent>
          <TabsContent value=\"recs\">Prioritized actions</TabsContent>
        </Tabs>
      )}
    </div>
  )
}
    """
  },

  "accessibility": {
    "contrast": "Maintain WCAG AA contrast. Foreground on background >= 4.5:1. Ember/electric accents must be paired with dark surfaces or black text depending on luminance.",
    "focus": "Visible focus ring using ring-[hsl(var(--ring))] with 2px thickness.",
    "motion_pref": "Respect prefers-reduced-motion: reduce parallax and particle counts.",
    "testing": "Every interactive element and key info block must have data-testid attributes (kebab-case, role-oriented)."
  },

  "image_urls": [
    {
      "url": "https://images.unsplash.com/photo-1766553134878-4e7c9116dfd5?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "hero_overlay",
      "description": "Flame streaks to multiply-blend over the hero for ember glints",
      "placement": "Hero background overlay with low opacity (<=12%)"
    },
    {
      "url": "https://images.unsplash.com/photo-1690460232618-3b4fb3dc1dd6?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "section_divider",
      "description": "Glowing ember coals texture",
      "placement": "Subtle masked top/bottom of sections as decorative band"
    },
    {
      "url": "https://images.unsplash.com/photo-1610733099270-0960608da9fc?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "truth_bomb_left",
      "description": "Subtle dark foliage/ash texture for muted myths side",
      "placement": "Background image with grayscale/opacity 0.2"
    },
    {
      "url": "https://images.unsplash.com/photo-1721040530907-646692053af8?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "code_poetry_bg",
      "description": "Glossy dark surface to hint at liquid metal",
      "placement": "Behind code block at 6–10% opacity"
    }
  ],

  "instructions_to_main_agent": [
    "Add the Google Fonts link to index.html head and set base fonts via Tailwind classes on html/body.",
    "Set documentElement classes 'dark tech-theater-dark' on app init.",
    "Use shadcn/ui components from ./components/ui; do not use raw HTML for complex controls.",
    "Implement Hero with <HeroParticles /> and ensure gradient overlays stay under 20% viewport.",
    "Build Truth Bomb section with two Cards; left muted, right energized with ember/electric rings.",
    "Create widgets: AnimatedCounter, ActivityHeatmap, CodePoetry using provided scaffolds; ensure data-testid on all key parts.",
    "Implement SEOAnalyzer with streaming log and Progress; wire to backend later. Use Sonner toasts for states.",
    "Apply motion patterns with framer-motion; avoid transition-all. Specify transition properties per element.",
    "Verify accessibility: keyboard focus, reduced motion, and color contrast.",
    "Mobile-first: stack split sections; increase spacing (2–3x)."
  ]
}


<General UI UX Design Guidelines>  
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
</General UI UX Design Guidelines>
