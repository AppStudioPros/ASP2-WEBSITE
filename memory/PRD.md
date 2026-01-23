# Product Requirements Document (PRD)
**Project**: App Studio Pro Website  
**Last Updated**: January 23, 2025

## Project Overview
Modern, multi-page marketing website for App Studio Pro featuring content management, email communications, and deployment to Vercel.

## Core Requirements

### 1. Website Structure ✅ COMPLETED
- [x] Multi-page application with React Router
- [x] Pages: Home, About, Services, Blog, Contact
- [x] Pages: Portfolio (All Projects + Individual Project Details)
- [x] Shared layout with header and footer
- [x] Responsive design with Tailwind CSS
- [x] Modern UI with animations (Framer Motion)

### 2. Portfolio Section ✅ COMPLETED (January 23, 2025)
- [x] All Projects page (`/projects`) - Grid gallery view with 22 projects
- [x] Individual project detail pages (`/projects/:slug`)
- [x] Featured project badges
- [x] Hover effects (scale image, show external link icon)
- [x] Related projects section based on industry/tags
- [x] Navigation integrated (header + footer links)
- [x] Homepage WorkSection "Explore All Projects" button linked
- [x] Project data stored in `/app/frontend/src/data/projects.js` (MOCKED)

### 3. Content Management 🔄 IN PROGRESS
- [ ] Sanity.io CMS integration for dynamic content
  - [ ] Blog posts management
  - [ ] Services content
  - [ ] Portfolio/case studies
- [ ] Content schemas defined in Sanity Studio
- [ ] Frontend fetches content from Sanity APIs

### 4. Email Communications ✅ COMPLETED (Backend Ready)
- [x] Contact form with Resend email integration
- [x] Newsletter subscription with welcome emails
- [x] Email templates (HTML formatted)
- [ ] Resend API key configured (Waiting for user)

### 5. Backend Infrastructure ✅ COMPLETED
- [x] FastAPI backend without MongoDB
- [x] Contact form API (`/api/contact`)
- [x] Newsletter subscription API (`/api/newsletter/subscribe`)
- [x] Sanity content APIs (`/api/sanity/*`)
  - [x] Blog posts endpoint
  - [x] Services endpoint
  - [x] Portfolio endpoint
- [x] Health check endpoint
- [x] Comprehensive error handling
- [x] CORS configuration

### 6. Frontend Integration ✅ COMPLETED
- [x] Contact form connected to backend API
- [x] Newsletter form connected to backend API
- [x] Toast notifications for user feedback
- [x] Loading states and error handling
- [x] Footer phone number fixed (+1 prefix)

### 7. Deployment 🔄 WAITING FOR USER
- [ ] Frontend deployment to Vercel
- [ ] Backend remains on Emergent platform
- [ ] Environment variables configured
- [ ] Domain verification in Resend

## Technical Stack

**Frontend**:
- React 18
- React Router (multi-page)
- Tailwind CSS
- Framer Motion
- Shadcn UI components

**Backend**:
- FastAPI (Python)
- Resend (Email service)
- Sanity.io (CMS)
- asyncio for non-blocking operations

**Deployment**:
- Frontend: Vercel (planned)
- Backend: Emergent platform (current)

## API Endpoints

### Contact Form
```
POST /api/contact
```
**Body**: `{ name, email, company?, phone?, projectType, budget?, timeline?, message }`  
**Response**: `{ success: true, message: string, email_id?: string }`

### Newsletter Subscription
```
POST /api/newsletter/subscribe
```
**Body**: `{ email }`  
**Response**: `{ success: true, message: string, email_id?: string }`

### Sanity Content
```
GET /api/sanity/blog-posts?limit=10&category=AI
GET /api/sanity/services
GET /api/sanity/portfolio?featured=true
```

## Pending Tasks

### Priority 1 (User Action Required)
1. **Sanity.io Setup**
   - Create Sanity project
   - Get Project ID and API Token
   - Add to backend `.env`
   - Create content schemas in Sanity Studio

2. **Resend Setup**
   - Get Resend API key
   - Verify domain `appstudiopro.com`
   - Add API key to backend `.env`

3. **Deployment**
   - Deploy frontend to Vercel
   - Configure environment variables
   - Test email delivery

### Priority 2 (After Credentials)
4. **Content Population**
   - Add blog posts to Sanity
   - Add services to Sanity
   - Add portfolio pieces to Sanity

5. **Frontend Updates**
   - Update BlogPage to fetch from Sanity
   - Update ServicesPage to fetch from Sanity
   - Add portfolio section with Sanity data

### Priority 3 (Enhancements)
6. **Newsletter Subscriber Storage**
   - Implement Sanity storage for subscribers
   - Create admin view for subscribers

7. **Testing & QA**
   - End-to-end testing with real credentials
   - Email delivery testing
   - Content update workflows

## Known Issues
- None currently. Budget Calculator was tentatively fixed in previous session (awaiting user verification).

## Design Specifications
- Color scheme: Blue (#00E5FF) and Orange (#FF6A00) accents
- Terminal-style section badges
- Consistent card styling with faded background icons
- Glitch text animations for emphasis
- Modern, professional corporate aesthetic

## Success Criteria
- [x] Website loads without errors
- [x] All pages are navigable
- [x] Contact form submissions work
- [x] Newsletter subscriptions work
- [ ] Emails deliver successfully
- [ ] Content is editable via Sanity
- [ ] Frontend deployed to Vercel
- [ ] All integrations configured and operational

---

**Documentation**: See `/app/BACKEND_INTEGRATION_GUIDE.md` for complete setup instructions.
