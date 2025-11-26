import asyncio
import os
from dotenv import load_dotenv
from pathlib import Path
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

# Load env vars
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

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

async def test_email():
    print(f"Testing email with:")
    print(f"Server: {conf.MAIL_SERVER}:{conf.MAIL_PORT}")
    print(f"User: {conf.MAIL_USERNAME}")
    
    message = MessageSchema(
        subject="Test Email from Portfolio",
        recipients=[os.environ.get("MAIL_TO")],
        body="If you see this, email sending is working!",
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        print("\n✅ Email sent successfully!")
    except Exception as e:
        print(f"\n❌ Error sending email: {e}")

if __name__ == "__main__":
    asyncio.run(test_email())
