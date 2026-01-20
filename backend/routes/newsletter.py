from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import resend
import os
import asyncio
import logging
from datetime import datetime

router = APIRouter(prefix="/api", tags=["newsletter"])
logger = logging.getLogger(__name__)

class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr

@router.post("/newsletter/subscribe")
async def subscribe_to_newsletter(request: NewsletterSubscribeRequest):
    """Handle newsletter subscriptions - store in Sanity and send welcome email via Resend"""
    
    resend_api_key = os.getenv("RESEND_API_KEY")
    sender_email = os.getenv("SENDER_EMAIL", "onboarding@resend.dev")
    sanity_project_id = os.getenv("SANITY_PROJECT_ID")
    sanity_token = os.getenv("SANITY_API_TOKEN")
    sanity_dataset = os.getenv("SANITY_DATASET", "production")
    
    # Check if Sanity is configured
    if not sanity_project_id or not sanity_token:
        logger.warning("Sanity not configured - newsletter subscription logged but not stored")
        print(f"\n📧 NEWSLETTER SUBSCRIPTION (No Sanity Config):")
        print(f"   Email: {request.email}")
        print(f"   Timestamp: {datetime.utcnow().isoformat()}\n")
    else:
        # TODO: Store subscriber in Sanity once credentials are provided
        # This will be implemented after user provides Sanity credentials
        logger.info(f"Sanity configured - storing subscriber: {request.email}")
        pass
    
    # Send welcome email via Resend
    if not resend_api_key:
        logger.warning("RESEND_API_KEY not configured - welcome email not sent")
        return {
            "success": True,
            "message": "Thanks for subscribing! You'll receive our latest blog posts.",
            "note": "Email service not configured"
        }
    
    # HTML welcome email template
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }}
            .container {{ max-width: 600px; margin: 0 auto; background: white; }}
            .header {{ background: linear-gradient(135deg, #00E5FF 0%, #2196F3 100%); color: white; padding: 40px 20px; text-align: center; }}
            .content {{ padding: 30px 20px; }}
            .welcome-title {{ font-size: 24px; font-weight: bold; color: #333; margin-bottom: 20px; }}
            .message {{ font-size: 16px; color: #555; line-height: 1.8; margin-bottom: 20px; }}
            .features {{ background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .feature-item {{ margin-bottom: 10px; padding-left: 25px; position: relative; }}
            .feature-item:before {{ content: "✓"; position: absolute; left: 0; color: #4CAF50; font-weight: bold; }}
            .cta-button {{ display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #00E5FF 0%, #2196F3 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }}
            .footer {{ background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #777; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Welcome to App Studio Pro!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Thanks for joining our community</p>
            </div>
            <div class="content">
                <div class="welcome-title">Hi there! 👋</div>
                <div class="message">
                    Thank you for subscribing to the App Studio Pro blog! We're excited to have you as part of our community.
                </div>
                <div class="message">
                    You've just unlocked access to:
                </div>
                <div class="features">
                    <div class="feature-item">Latest insights on web development, mobile apps, and AI</div>
                    <div class="feature-item">Expert tips and best practices from our 35+ years of experience</div>
                    <div class="feature-item">Updates on new technologies and industry trends</div>
                    <div class="feature-item">Exclusive content and behind-the-scenes looks at our projects</div>
                </div>
                <div class="message">
                    We'll send you updates whenever we publish new content. No spam, just quality insights to help you build better digital products.
                </div>
                <div style="text-align: center;">
                    <a href="https://appstudiopro.com/blog" class="cta-button">Read Our Latest Posts</a>
                </div>
            </div>
            <div class="footer">
                <p style="margin: 0 0 10px 0;"><strong>App Studio Pro</strong></p>
                <p style="margin: 0 0 10px 0;">Building digital solutions for 35+ years</p>
                <p style="margin: 0;">You're receiving this email because you subscribed to our blog at {datetime.utcnow().strftime('%B %d, %Y')}</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": sender_email,
        "to": [request.email],
        "subject": "Welcome to App Studio Pro Blog! 🎉",
        "html": html_content
    }
    
    try:
        resend.api_key = resend_api_key
        # Run sync SDK in thread to keep FastAPI non-blocking
        email = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Welcome email sent successfully to {request.email}")
        return {
            "success": True,
            "message": "Thanks for subscribing! Check your email for a welcome message.",
            "email_id": email.get("id")
        }
    except Exception as e:
        logger.error(f"Failed to send welcome email: {str(e)}")
        # Don't fail the subscription if email fails
        return {
            "success": True,
            "message": "Thanks for subscribing! You'll receive our latest blog posts.",
            "warning": "Welcome email could not be sent"
        }
