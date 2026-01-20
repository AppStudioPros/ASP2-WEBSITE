import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';
import { ScanlineOverlay } from './GlitchText';

// ASP Logo Component
const ASPLogo = ({ className = '' }) => (
  <img 
    src="https://customer-assets.emergentagent.com/job_truthbomb/artifacts/s6r33gbn_AppStudioPro.png" 
    alt="App Studio Pro"
    className={`h-8 w-auto ${className}`}
    data-testid="asp-logo"
  />
);

export const Layout = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative" data-testid="app-container">
      <Toaster position="top-right" />
      <ScanlineOverlay />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2" data-testid="nav-logo">
              <ASPLogo />
            </Link>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link 
                  to="/" 
                  className={`transition-colors ${isActive('/') && location.pathname === '/' ? 'text-[#00E5FF]' : 'text-[hsl(var(--foreground))] hover:text-[#00E5FF]'}`}
                  data-testid="nav-home"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`transition-colors ${isActive('/about') ? 'text-[#00E5FF]' : 'text-[hsl(var(--foreground))] hover:text-[#00E5FF]'}`}
                  data-testid="nav-about"
                >
                  About
                </Link>
                <Link 
                  to="/services" 
                  className={`transition-colors ${isActive('/services') ? 'text-[#00E5FF]' : 'text-[hsl(var(--foreground))] hover:text-[#00E5FF]'}`}
                  data-testid="nav-services"
                >
                  Services
                </Link>
                <Link 
                  to="/blog" 
                  className={`transition-colors ${isActive('/blog') ? 'text-[#00E5FF]' : 'text-[hsl(var(--foreground))] hover:text-[#00E5FF]'}`}
                  data-testid="nav-blog"
                >
                  Blog
                </Link>
              </div>
              <Link to="/contact">
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold transition-all duration-200"
                  data-testid="nav-cta-button"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]/30">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <ASPLogo className="h-8 mb-4" />
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 max-w-sm">
                Transforming ideas into digital solutions. 35+ years of excellence in web development, 
                app creation, and AI innovation.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/in/appstudiopro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a 
                  href="https://www.instagram.com/appstudiopro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=100090446731786" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a 
                  href="https://x.com/AppStudioPro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a 
                  href="https://youtube.com/@appstudioproofficial" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-[hsl(var(--foreground))]">Quick Links</h3>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><Link to="/" className="hover:text-[#00E5FF] transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#00E5FF] transition-colors">About</Link></li>
                <li><Link to="/services" className="hover:text-[#00E5FF] transition-colors">Services</Link></li>
                <li><Link to="/blog" className="hover:text-[#00E5FF] transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-[#00E5FF] transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-[hsl(var(--foreground))]">Contact</h3>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><a href="tel:+17202760797" className="hover:text-[#00E5FF] transition-colors">+1 720-276-0797</a></li>
                <li><a href="mailto:info@appstudiopro.com" className="hover:text-[#00E5FF] transition-colors">info@appstudiopro.com</a></li>
                <li><Link to="/privacy" className="hover:text-[#00E5FF] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#00E5FF] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
              © 2025 App Studio Pro. All rights reserved.
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
              <span className="text-[#4CAF50]">status:</span> operational | 
              <span className="text-[#00E5FF]"> uptime:</span> 99.9%
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
