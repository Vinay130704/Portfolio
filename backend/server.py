from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')


mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


app = FastAPI()


api_router = APIRouter(prefix="/api")



class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


from routes.contact import router as contact_router
from routes.projects import router as projects_router

api_router.include_router(contact_router)
api_router.include_router(projects_router)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import HTTPException



build_dir = ROOT_DIR.parent / "frontend" / "build"
logger.info(f"Frontend build directory: {build_dir}")
logger.info(f"Build directory exists: {build_dir.exists()}")
if (build_dir / "static").exists():
    app.mount("/static", StaticFiles(directory=build_dir / "static"), name="static")


@app.get("/")
async def serve_root():
    index_path = build_dir / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    return {"message": "Frontend not found. Check build directory."}


@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    
    if full_path.startswith("api"):
        raise HTTPException(status_code=404, detail="Not Found")
    
    
    file_path = build_dir / full_path
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    
    
    index_path = build_dir / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    
    return {"message": "Frontend not built. Run 'npm run build' in frontend directory."}