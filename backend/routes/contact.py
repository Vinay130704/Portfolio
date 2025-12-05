from fastapi import APIRouter, HTTPException, Request
from models import ContactMessage, ContactMessageCreate
from typing import List
import logging
from server import db
from utils.email import send_contact_email
import os

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/contact", response_model=dict)
async def create_contact_message(input: ContactMessageCreate, request: Request):
    """
    Submit a contact form message
    """
    try:
        
        client_ip = request.client.host if request.client else None
        
        
        contact_dict = input.dict()
        contact_obj = ContactMessage(**contact_dict, ip_address=client_ip)
        
        
        result = await db.contact_messages.insert_one(contact_obj.dict())
        
        logger.info(f"Contact message created: {contact_obj.id} from {contact_obj.email}")
        
        
        email_to = os.environ.get("MAIL_TO")
        if email_to:
            await send_contact_email(
                subject=contact_obj.subject,
                email_to=[email_to],
                body=contact_dict
            )
        
        return {
            "success": True,
            "message": "Message sent successfully!",
            "id": contact_obj.id
        }
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")


@router.get("/contact", response_model=dict)
async def get_contact_messages(skip: int = 0, limit: int = 100):
    """
    Get all contact messages (Admin endpoint)
    """
    try:
        messages_cursor = db.contact_messages.find().sort("created_at", -1).skip(skip).limit(limit)
        messages = await messages_cursor.to_list(length=limit)
        
        
        for message in messages:
            if "_id" in message:
                del message["_id"]
        
        return {
            "success": True,
            "messages": messages,
            "count": len(messages)
        }
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")


@router.get("/contact/{message_id}", response_model=dict)
async def get_contact_message(message_id: str):
    """
    Get a specific contact message by ID
    """
    try:
        message = await db.contact_messages.find_one({"id": message_id})
        
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        
        
        if "_id" in message:
            del message["_id"]
        
        return {
            "success": True,
            "message": message
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch message")


@router.patch("/contact/{message_id}/status", response_model=dict)
async def update_message_status(message_id: str, status: str):
    """
    Update contact message status (Admin endpoint)
    """
    valid_statuses = ["unread", "read", "replied"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return {
            "success": True,
            "message": "Status updated successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating message status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update status")
