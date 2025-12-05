
"""
Backend API Testing Suite for Developer Portfolio
Tests all API endpoints and verifies MongoDB integration
"""

import requests
import json
import sys
import os
from datetime import datetime
import uuid


BACKEND_URL = "https://code-showcase-348.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

def test_health_check():
    """Test GET /api/ - Health check endpoint"""
    print_test_header("Health Check Endpoint")
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print_success("Health check endpoint working correctly")
                print_info(f"Response: {data}")
                return True
            else:
                print_error(f"Unexpected response data: {data}")
                return False
        else:
            print_error(f"Health check failed with status {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Health check request failed: {str(e)}")
        return False

def test_contact_form_submission():
    """Test POST /api/contact - Contact form submission"""
    print_test_header("Contact Form Submission")
    
    
    contact_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Test Message",
        "message": "This is a test message from the portfolio contact form"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("id"):
                print_success("Contact form submission successful")
                print_info(f"Message ID: {data.get('id')}")
                print_info(f"Response: {data}")
                return data.get("id")  
            else:
                print_error(f"Contact form submission failed: {data}")
                return None
        else:
            print_error(f"Contact form submission failed with status {response.status_code}")
            print_error(f"Response: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print_error(f"Contact form submission request failed: {str(e)}")
        return None

def test_get_contact_messages():
    """Test GET /api/contact - Get all contact messages"""
    print_test_header("Get Contact Messages")
    
    try:
        response = requests.get(f"{API_BASE}/contact", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "messages" in data:
                messages = data.get("messages", [])
                print_success(f"Retrieved {len(messages)} contact messages")
                print_info(f"Response structure: success={data.get('success')}, count={data.get('count')}")
                
                
                test_message_found = False
                for msg in messages:
                    if msg.get("email") == "john@example.com" and msg.get("subject") == "Test Message":
                        test_message_found = True
                        print_success("Test contact message found in database")
                        break
                
                if not test_message_found and len(messages) > 0:
                    print_warning("Test contact message not found, but other messages exist")
                elif len(messages) == 0:
                    print_warning("No contact messages found in database")
                
                return True
            else:
                print_error(f"Invalid response structure: {data}")
                return False
        else:
            print_error(f"Get contact messages failed with status {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Get contact messages request failed: {str(e)}")
        return False

def test_get_projects():
    """Test GET /api/projects - Get all projects"""
    print_test_header("Get Projects")
    
    try:
        response = requests.get(f"{API_BASE}/projects", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "projects" in data:
                projects = data.get("projects", [])
                print_success(f"Retrieved {len(projects)} projects")
                
                if len(projects) > 0:
                    
                    first_project = projects[0]
                    required_fields = ["id", "title", "short_description", "description", 
                                     "technologies", "duration", "github", "demo", "image", 
                                     "featured", "views"]
                    
                    missing_fields = []
                    for field in required_fields:
                        if field not in first_project:
                            missing_fields.append(field)
                    
                    if not missing_fields:
                        print_success("Project structure is correct")
                        print_info(f"Sample project: {first_project.get('title')}")
                        return projects  
                    else:
                        print_error(f"Missing fields in project structure: {missing_fields}")
                        return projects
                else:
                    print_warning("No projects found in database")
                    return []
            else:
                print_error(f"Invalid response structure: {data}")
                return None
        else:
            print_error(f"Get projects failed with status {response.status_code}")
            print_error(f"Response: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print_error(f"Get projects request failed: {str(e)}")
        return None

def test_get_single_project_and_views(project_id):
    """Test GET /api/projects/{project_id} - Get single project and increment views"""
    print_test_header(f"Get Single Project and Track View")
    
    try:
        
        response = requests.get(f"{API_BASE}/projects/{project_id}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "project" in data:
                project = data.get("project")
                initial_views = project.get("views", 0)
                print_success(f"Retrieved project: {project.get('title')}")
                print_info(f"Initial view count: {initial_views}")
                
                
                response2 = requests.get(f"{API_BASE}/projects/{project_id}", timeout=10)
                if response2.status_code == 200:
                    data2 = response2.json()
                    project2 = data2.get("project")
                    new_views = project2.get("views", 0)
                    
                    if new_views > initial_views:
                        print_success(f"View count incremented correctly: {initial_views} -> {new_views}")
                        return True
                    else:
                        print_error(f"View count not incremented: {initial_views} -> {new_views}")
                        return False
                else:
                    print_error(f"Second request failed with status {response2.status_code}")
                    return False
            else:
                print_error(f"Invalid response structure: {data}")
                return False
        elif response.status_code == 404:
            print_error(f"Project not found: {project_id}")
            return False
        else:
            print_error(f"Get single project failed with status {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Get single project request failed: {str(e)}")
        return False

def test_track_project_view(project_id):
    """Test POST /api/projects/{project_id}/view - Track project view"""
    print_test_header("Track Project View")
    
    try:
        response = requests.post(f"{API_BASE}/projects/{project_id}/view", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "views" in data:
                views = data.get("views")
                print_success(f"Project view tracked successfully")
                print_info(f"Current view count: {views}")
                return True
            else:
                print_error(f"Invalid response structure: {data}")
                return False
        elif response.status_code == 404:
            print_error(f"Project not found: {project_id}")
            return False
        else:
            print_error(f"Track project view failed with status {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Track project view request failed: {str(e)}")
        return False

def create_test_project():
    """Create a test project for testing purposes"""
    print_test_header("Creating Test Project")
    
    test_project = {
        "title": "Test Project",
        "short_description": "A test project for API testing",
        "description": "This is a detailed description of the test project created for API testing purposes.",
        "technologies": ["Python", "FastAPI", "MongoDB"],
        "duration": "1 week",
        "github": "https://github.com/test/test-project",
        "demo": "https://test-project-demo.com",
        "image": "https://via.placeholder.com/400x300",
        "featured": False
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/projects",
            json=test_project,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("id"):
                print_success("Test project created successfully")
                print_info(f"Project ID: {data.get('id')}")
                return data.get("id")
            else:
                print_error(f"Test project creation failed: {data}")
                return None
        else:
            print_error(f"Test project creation failed with status {response.status_code}")
            print_error(f"Response: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print_error(f"Test project creation request failed: {str(e)}")
        return None

def main():
    """Run all backend tests"""
    print(f"{Colors.BOLD}🚀 Starting Backend API Tests{Colors.ENDC}")
    print(f"{Colors.BOLD}Backend URL: {BACKEND_URL}{Colors.ENDC}")
    print(f"{Colors.BOLD}API Base: {API_BASE}{Colors.ENDC}")
    
    test_results = {}
    
    
    test_results["health_check"] = test_health_check()
    
    
    message_id = test_contact_form_submission()
    test_results["contact_submission"] = message_id is not None
    
    
    test_results["get_contacts"] = test_get_contact_messages()
    
    
    projects = test_get_projects()
    test_results["get_projects"] = projects is not None
    
    
    project_id = None
    if projects and len(projects) > 0:
        project_id = projects[0].get("id")
        print_info(f"Using existing project for view tests: {project_id}")
    else:
        
        project_id = create_test_project()
        test_results["create_project"] = project_id is not None
    
    if project_id:
        test_results["get_single_project"] = test_get_single_project_and_views(project_id)
        test_results["track_view"] = test_track_project_view(project_id)
    else:
        print_error("No project available for view testing")
        test_results["get_single_project"] = False
        test_results["track_view"] = False
    
    
    print_test_header("Test Summary")
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        if result:
            print_success(f"{test_name}: PASSED")
            passed += 1
        else:
            print_error(f"{test_name}: FAILED")
    
    print(f"\n{Colors.BOLD}Results: {passed}/{total} tests passed{Colors.ENDC}")
    
    if passed == total:
        print(f"{Colors.GREEN}{Colors.BOLD}🎉 All tests passed!{Colors.ENDC}")
        return 0
    else:
        print(f"{Colors.RED}{Colors.BOLD}❌ Some tests failed{Colors.ENDC}")
        return 1

if __name__ == "__main__":
    sys.exit(main())