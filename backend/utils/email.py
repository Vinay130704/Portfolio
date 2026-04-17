import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from typing import List
import logging

logger = logging.getLogger(__name__)

conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get("MAIL_USERNAME", ""),
    MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD", ""),
    MAIL_FROM=os.environ.get("MAIL_FROM", "noreply@example.com"),
    MAIL_PORT=int(os.environ.get("MAIL_PORT", 587)),
    MAIL_SERVER=os.environ.get("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_FROM_NAME=os.environ.get("MAIL_FROM_NAME", "Portfolio Contact"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_contact_email(subject: str, email_to: List[EmailStr], body: dict):
    """
    Send contact form submission email
    """
    try:
        html = f"""
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> {body.get('name')}</p>
        <p><strong>Email:</strong> {body.get('email')}</p>
        <p><strong>Subject:</strong> {body.get('subject')}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>{body.get('message')}</p>
        """

        message = MessageSchema(
            subject=f"New Contact: {subject}",
            recipients=email_to,
            body=html,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        await fm.send_message(message)
        logger.info(f"Email sent to {email_to}")
        return True
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        return False
