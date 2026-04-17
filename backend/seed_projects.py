"""Script to seed the database with initial project data"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from models import Project
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')


mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


projects_data = [
    {
        "title": "Guardian Net",
        "short_description": "A smarter, safer society management platform",
        "description": "Built using the MERN stack, this full-stack web application serves as a digital gatekeeper for residential communities. It blends security with simplicity. Designed with user experience and safety in mind, Guardian Net empowers societies to stay connected, informed, and protected.",
        "technologies": ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST API"],
        "duration": "December 2024",
        "github": "https://github.com/Vinay130704",
        "demo": "#",
        "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjb2Rpbmd8ZW58MHx8fHwxNzY0MTU4OTk5fDA&ixlib=rb-4.1.0&q=85",
        "featured": True
    },
    {
        "title": "Caption Generator",
        "short_description": "AI-powered image captioning tool",
        "description": "This image captioning tool leverages Python and deep learning to turn pictures into words. By combining computer vision and natural language processing, the project automatically generates meaningful captions for input images. It's a small step into the world of AI, exploring how machines can 'see' and describe the world.",
        "technologies": ["Python", "TensorFlow", "Keras", "CNN", "LSTM", "Computer Vision"],
        "duration": "2024",
        "github": "https://github.com/Vinay130704",
        "demo": "#",
        "image": "https://images.unsplash.com/photo-1707528041466-83a325f01a3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzY0MTI5MDYzfDA&ixlib=rb-4.1.0&q=85",
        "featured": True
    },
    {
        "title": "Hangman Game",
        "short_description": "Classic word-guessing game with a Python twist",
        "description": "A classic game with a personal twist—this Python-based Hangman project showcases the art of logic and simplicity. Using fundamental concepts like loops, conditionals, and string handling, the game engages users in a fun word-guessing challenge straight from the terminal. A playful way to master core programming concepts while making something interactive.",
        "technologies": ["Python", "Core Concepts", "Terminal"],
        "duration": "2023",
        "github": "https://github.com/Vinay130704",
        "demo": "#",
        "image": "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzY0MTI5MDYzfDA&ixlib=rb-4.1.0&q=85",
        "featured": False
    }
]


async def seed_projects():
    """Seed the database with project data"""
    try:
        
        existing_count = await db.projects.count_documents({})
        if existing_count > 0:
            print(f"Database already has {existing_count} projects. Skipping seed.")
            return
        
        
        for project_data in projects_data:
            project = Project(**project_data)
            await db.projects.insert_one(project.dict())
            print(f"✓ Seeded project: {project.title}")
        
        print(f"\n✅ Successfully seeded {len(projects_data)} projects!")
        
    except Exception as e:
        print(f"❌ Error seeding projects: {str(e)}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_projects())
