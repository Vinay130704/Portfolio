from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., max_length=2000)


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: str = "unread"  
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=200)
    short_description: str = Field(..., max_length=500)
    description: str
    technologies: List[str]
    duration: str
    github: str
    demo: str
    image: str
    featured: bool = False


class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    short_description: str
    description: str
    technologies: List[str]
    duration: str
    github: str
    demo: str
    image: str
    featured: bool = False
    views: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ProjectView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    viewed_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
