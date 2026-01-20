from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import resend
import os
import asyncio
import logging
from datetime import datetime

router = APIRouter(prefix="/api", tags=["contact"])
logger = logging.getLogger(__name__)

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    company: str = ""
    phone: str = ""
    projectType: str
    budget: str = ""
    timeline: str = ""
    message: str

@router.post("/contact")
async def submit_contact_form(request: ContactFormRequest):
    """Handle contact form submissions - send email via Resend"""
    
    resend_api_key = os.getenv("RESEND_API_KEY")
    sender_email = os.getenv("SENDER_EMAIL", "onboarding@resend.dev")
    recipient_email = "info@appstudiopro.com"
    
    if not resend_api_key:
        logger.warning("RESEND_API_KEY not configured - contact form submission logged but not emailed")
        print(f"\n📧 CONTACT FORM SUBMISSION (No Resend Key):")
        print(f"   From: {request.name} ({request.email})")
        print(f"   Company: {request.company}")
        print(f"   Phone: {request.phone}")
        print(f"   Project Type: {request.projectType}")
        print(f"   Budget: {request.budget}")
        print(f"   Timeline: {request.timeline}")
        print(f"   Message: {request.message}\n")
        
        return {
            "success": True,
            "message": "Thank you! We'll get back to you within 24 hours.",
            "note": "Email service not configured - using fallback logging"
        }
    
    # HTML email template
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #00E5FF 0%, #2196F3 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }}
            .content {{ background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #555; }}
            .value {{ color: #333; }}
            .footer {{ margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px; font-size: 12px; color: #777; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">App Studio Pro Website</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">{request.name}</div>
                </div>
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:{request.email}">{request.email}</a></div>
                </div>
                <div class="field">
                    <div class="label">Company:</div>
                    <div class="value">{request.company or 'Not provided'}</div>
                </div>
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">{request.phone or 'Not provided'}</div>
                </div>
                <div class="field">
                    <div class="label">Project Type:</div>
                    <div class="value">{request.projectType}</div>
                </div>
                <div class="field">
                    <div class="label">Budget:</div>
                    <div class="value">{request.budget or 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="label">Timeline:</div>
                    <div class="value">{request.timeline or 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="label">Message:</div>
                    <div class="value" style="white-space: pre-wrap;">{request.message}</div>
                </div>
                <div class="footer">
                    <strong>Submitted:</strong> {datetime.utcnow().strftime('%B %d, %Y at %I:%M %p UTC')}
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": sender_email,
        "to": [recipient_email],
        "subject": f"New Contact Form: {request.projectType} - {request.name}",
        "html": html_content
    }
    
    try:
        resend.api_key = resend_api_key
        # Run sync SDK in thread to keep FastAPI non-blocking
        email = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Contact form email sent successfully to {recipient_email}")
        return {
            "success": True,
            "message": "Thank you! We'll get back to you within 24 hours.",
            "email_id": email.get("id")
        }
    except Exception as e:
        logger.error(f"Failed to send contact form email: {str(e)}")
        # Log the submission even if email fails
        print(f"\\n📧 CONTACT FORM SUBMISSION (Email Failed):\")\n        print(f\"   From: {request.name} ({request.email})\")\n        print(f\"   Company: {request.company}\")\n        print(f\"   Message: {request.message}\\n\")\n        \n        # Return success anyway so user experience isn't broken\n        return {\n            \"success\": True,\n            \"message\": \"Thank you! We'll get back to you within 24 hours.\",\n            \"note\": \"Contact received (email service temporarily unavailable)\"\n        }
