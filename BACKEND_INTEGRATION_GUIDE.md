# Backend Integration Guide for Vercel & Sanity/Resend

This document explains the backend infrastructure prepared for Sanity.io and Resend integration.

## 🎯 What's Been Built

### 1. **Contact Form API** (`/api/contact`)
- ✅ Accepts form submissions with name, email, company, phone, project details
- ✅ Sends formatted HTML emails to `info@appstudiopro.com` via Resend
- ✅ Includes comprehensive error handling and logging
- ✅ Works with or without Resend configured (fallback logging)

### 2. **Newsletter Subscription API** (`/api/newsletter/subscribe`)
- ✅ Accepts email subscriptions
- ✅ Sends welcome email to subscribers via Resend
- ✅ Ready for Sanity integration to store subscribers
- ✅ Includes error handling and logging

### 3. **Sanity Content APIs** (`/api/sanity/*`)
- ✅ `/api/sanity/blog-posts` - Fetch blog posts with optional category filter
- ✅ `/api/sanity/services` - Fetch all services
- ✅ `/api/sanity/portfolio` - Fetch portfolio pieces (optional featured filter)
- ✅ All endpoints ready to query Sanity once credentials are provided

### 4. **Health Check API** (`/api/health`)
- ✅ Reports status of Sanity and Resend integrations
- ✅ Helps verify configuration

---

## 🔧 Required Configuration

### Step 1: Get Sanity.io Credentials

1. **Create a Sanity Project** (if not already done):
   - Go to https://sanity.io/manage
   - Create a new project or select existing one
   - Note your **Project ID**

2. **Get API Token**:
   - In your Sanity project settings → API → Tokens
   - Create a new token with **Read + Write** permissions
   - Copy the token (starts with `sk...`)

3. **Add to `/app/backend/.env`**:
   ```env
   SANITY_PROJECT_ID=your_actual_project_id
   SANITY_API_TOKEN=sk_your_actual_token
   SANITY_DATASET=production
   ```

### Step 2: Get Resend API Key

1. **Create Resend Account**:
   - Go to https://resend.com
   - Sign up for free account

2. **Get API Key**:
   - Dashboard → API Keys → Create API Key
   - Copy the key (starts with `re_...`)

3. **Verify Sending Domain** (Important!):
   - In Resend dashboard, add and verify your domain `appstudiopro.com`
   - Or use the default `onboarding@resend.dev` for testing

4. **Add to `/app/backend/.env`**:
   ```env
   RESEND_API_KEY=re_your_actual_api_key
   SENDER_EMAIL=noreply@appstudiopro.com
   ```
   
   **Note**: In testing mode, Resend only delivers to verified email addresses. Verify `info@appstudiopro.com` in your Resend dashboard.

### Step 3: Restart Backend

After updating .env:
```bash
sudo supervisorctl restart backend
```

---

## 📊 Sanity Content Schema (Recommended)

To use the backend APIs effectively, create these content types in Sanity Studio:

### Blog Post Schema
```javascript
{
  name: 'blogPost',
  type: 'document',
  fields: [
    {name: 'title', type: 'string'},
    {name: 'slug', type: 'slug'},
    {name: 'excerpt', type: 'text'},
    {name: 'publishedAt', type: 'datetime'},
    {name: 'author', type: 'reference', to: [{type: 'author'}]},
    {name: 'categories', type: 'array', of: [{type: 'reference', to: [{type: 'category'}]}]},
    {name: 'mainImage', type: 'image'},
    {name: 'body', type: 'array', of: [{type: 'block'}]}
  ]
}
```

### Service Schema
```javascript
{
  name: 'service',
  type: 'document',
  fields: [
    {name: 'title', type: 'string'},
    {name: 'slug', type: 'slug'},
    {name: 'description', type: 'text'},
    {name: 'icon', type: 'image'},
    {name: 'features', type: 'array', of: [{type: 'string'}]},
    {name: 'price', type: 'string'},
    {name: 'order', type: 'number'}
  ]
}
```

### Portfolio Piece Schema
```javascript
{
  name: 'portfolioPiece',
  type: 'document',
  fields: [
    {name: 'title', type: 'string'},
    {name: 'slug', type: 'slug'},
    {name: 'description', type: 'text'},
    {name: 'image', type: 'image'},
    {name: 'technologies', type: 'array', of: [{type: 'string'}]},
    {name: 'featured', type: 'boolean'},
    {name: 'projectUrl', type: 'url'}
  ]
}
```

### Newsletter Subscriber Schema (Optional)
```javascript
{
  name: 'subscriber',
  type: 'document',
  fields: [
    {name: 'email', type: 'string'},
    {name: 'subscribedAt', type: 'datetime'},
    {name: 'source', type: 'string'},
    {name: 'active', type: 'boolean'}
  ]
}
```

---

## 🧪 Testing the APIs

### Test Contact Form
```bash
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)

curl -X POST "$API_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Test Corp",
    "phone": "+1 555-1234",
    "projectType": "Website Development",
    "budget": "$25,000 - $50,000",
    "timeline": "Q1 2025",
    "message": "Need a new company website"
  }'
```

### Test Newsletter Subscription
```bash
curl -X POST "$API_URL/api/newsletter/subscribe" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com"
  }'
```

### Test Sanity Blog Posts (once configured)
```bash
curl -s "$API_URL/api/sanity/blog-posts?limit=5"
```

### Check Health Status
```bash
curl -s "$API_URL/api/health" | python3 -c "import sys, json; print(json.dumps(json.load(sys.stdin), indent=2))"
```

---

## 🌐 Frontend Integration

The frontend is already connected to these APIs:

### Contact Form (`/app/frontend/src/pages/ContactPage.js`)
- ✅ Form submissions call `/api/contact`
- ✅ Shows success/error toast messages
- ✅ Resets form on success

### Newsletter Form (`/app/frontend/src/pages/BlogPage.js`)
- ✅ Email input calls `/api/newsletter/subscribe`
- ✅ Shows success/error toast messages
- ✅ Resets form on success

### Sanity Content (Ready for integration)
The following pages can be updated to fetch from Sanity:
- `/app/frontend/src/pages/BlogPage.js` - Replace static `blogPosts` array
- `/app/frontend/src/pages/ServicesPage.js` - Replace static `allServices` array
- Portfolio sections - Fetch from `/api/sanity/portfolio`

---

## 🚀 Deployment to Vercel

### Option A: Frontend Only on Vercel (Recommended)
1. **Deploy frontend to Vercel**:
   - Connect your GitHub repo to Vercel
   - Set build command: `cd frontend && yarn build`
   - Set output directory: `frontend/build`
   - Add environment variable: `REACT_APP_BACKEND_URL=<your_emergent_backend_url>`

2. **Keep backend on Emergent**:
   - Backend continues running on this platform
   - Update CORS in `/app/backend/.env` to allow Vercel domain:
     ```env
     CORS_ORIGINS="https://yourdomain.vercel.app,http://localhost:3000"
     ```

### Option B: Full Migration to Vercel (More Complex)
- Requires converting FastAPI to Vercel serverless functions
- Not recommended unless you have specific requirements

---

## 📝 Current Status

### ✅ Completed
- [x] Removed MongoDB dependencies
- [x] Created contact form API with Resend integration
- [x] Created newsletter subscription API with Resend integration
- [x] Created Sanity content APIs (blog, services, portfolio)
- [x] Connected frontend contact form to API
- [x] Connected frontend newsletter form to API
- [x] Fixed footer phone number (+1 prefix added)
- [x] Comprehensive error handling and logging
- [x] Health check endpoint

### ⏳ Waiting for User
- [ ] Sanity.io credentials (Project ID & API Token)
- [ ] Resend API key
- [ ] Sanity content schema creation
- [ ] Domain verification in Resend

### 🔮 Next Steps After Credentials
1. Test contact form with real email delivery
2. Test newsletter subscription with real email delivery
3. Create Sanity content schemas
4. Populate Sanity with blog posts, services, portfolio
5. Update frontend to fetch from Sanity APIs
6. Deploy frontend to Vercel

---

## 🐛 Troubleshooting

### Contact form not sending emails
- Check `/var/log/supervisor/backend.out.log` for logs
- Verify `RESEND_API_KEY` in `.env` is correct
- Ensure `info@appstudiopro.com` is verified in Resend dashboard

### Newsletter welcome email not sending
- Same as above
- Check subscriber email is verified (if in Resend testing mode)

### Sanity queries failing
- Verify `SANITY_PROJECT_ID` and `SANITY_API_TOKEN` are correct
- Check Sanity project has correct CORS settings
- Ensure content types exist in Sanity

### "Integration not configured" in health check
- Run: `tail -n 20 /app/backend/.env`
- Ensure no `your_` prefixes in actual credentials
- Restart backend: `sudo supervisorctl restart backend`

---

## 📚 Additional Resources

- **Resend Docs**: https://resend.com/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Vercel Deployment**: https://vercel.com/docs

---

## 💬 Questions?

All backend code is in:
- `/app/backend/server.py` - Main application
- `/app/backend/routes/contact.py` - Contact form handling
- `/app/backend/routes/newsletter.py` - Newsletter subscriptions
- `/app/backend/routes/sanity.py` - Sanity CMS queries

Frontend integration:
- `/app/frontend/src/pages/ContactPage.js` - Contact form
- `/app/frontend/src/pages/BlogPage.js` - Newsletter subscription
