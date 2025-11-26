from fastapi import APIRouter, HTTPException, Request
from models import Project, ProjectCreate, ProjectView
from typing import List
import logging
from server import db

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/projects", response_model=dict)
async def get_projects():
    """
    Get all projects
    """
    try:
        projects_cursor = db.projects.find().sort("created_at", -1)
        projects = await projects_cursor.to_list(length=100)
        
        # Remove MongoDB _id field
        for project in projects:
            if "_id" in project:
                del project["_id"]
        
        return {
            "success": True,
            "projects": projects
        }
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")


@router.get("/projects/{project_id}", response_model=dict)
async def get_project(project_id: str, request: Request):
    """
    Get a specific project by ID and increment view count
    """
    try:
        project = await db.projects.find_one({"id": project_id})
        
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Increment view count
        await db.projects.update_one(
            {"id": project_id},
            {"$inc": {"views": 1}}
        )
        
        # Track view
        client_ip = request.client.host if request.client else None
        view = ProjectView(project_id=project_id, ip_address=client_ip)
        await db.project_views.insert_one(view.dict())
        
        # Update view count in response
        project["views"] = project.get("views", 0) + 1
        
        # Remove MongoDB _id field
        if "_id" in project:
            del project["_id"]
        
        return {
            "success": True,
            "project": project
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch project")


@router.post("/projects/{project_id}/view", response_model=dict)
async def track_project_view(project_id: str, request: Request):
    """
    Track a project view (for analytics)
    """
    try:
        project = await db.projects.find_one({"id": project_id})
        
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Increment view count
        result = await db.projects.update_one(
            {"id": project_id},
            {"$inc": {"views": 1}}
        )
        
        # Track view
        client_ip = request.client.host if request.client else None
        view = ProjectView(project_id=project_id, ip_address=client_ip)
        await db.project_views.insert_one(view.dict())
        
        # Get updated view count
        updated_project = await db.projects.find_one({"id": project_id})
        views = updated_project.get("views", 0)
        
        return {
            "success": True,
            "views": views
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error tracking project view: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to track view")


@router.post("/projects", response_model=dict)
async def create_project(input: ProjectCreate):
    """
    Create a new project (Admin endpoint)
    """
    try:
        project_dict = input.dict()
        project_obj = Project(**project_dict)
        
        result = await db.projects.insert_one(project_obj.dict())
        
        logger.info(f"Project created: {project_obj.id}")
        
        return {
            "success": True,
            "message": "Project created successfully",
            "id": project_obj.id
        }
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")
