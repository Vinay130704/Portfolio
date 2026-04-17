# Backend Integration Contracts

## Overview
This document outlines the API contracts and integration points between frontend and backend for Vinay Kumar's portfolio website.

## Current Mock Data (to be replaced)
- **Contact Form**: Currently using `submitContactForm()` mock function in `mock.js`
- **Projects**: Static data in `mock.js` - will be fetched from database
- **Skills, Experience, Certifications**: Static data (can remain static or be made dynamic later)

## Database Models

### 1. Contact Message Model
**Collection**: `contact_messages`
```python
{
    "id": str (UUID),
    "name": str,
    "email": str,
    "subject": str,
    "message": str,
    "status": str (default: "unread"),  # unread, read, replied
    "created_at": datetime,
    "ip_address": str (optional)
}
```

### 2. Project Model (Optional - for dynamic management)
**Collection**: `projects`
```python
{
    "id": str (UUID),
    "title": str,
    "short_description": str,
    "description": str,
    "technologies": List[str],
    "duration": str,
    "github": str,
    "demo": str,
    "image": str,
    "featured": bool,
    "created_at": datetime,
    "updated_at": datetime,
    "views": int (default: 0)
}
```

### 3. Project Views Tracker
**Collection**: `project_views`
```python
{
    "id": str (UUID),
    "project_id": str,
    "viewed_at": datetime,
    "ip_address": str (optional)
}
```

## API Endpoints

### Contact Endpoints

#### POST /api/contact
**Purpose**: Submit contact form
**Request Body**:
```json
{
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string"
}
```
**Response**:
```json
{
    "success": true,
    "message": "Message sent successfully!",
    "id": "uuid"
}
```

#### GET /api/contact (Admin)
**Purpose**: Get all contact messages
**Response**:
```json
{
    "messages": [
        {
            "id": "uuid",
            "name": "string",
            "email": "string",
            "subject": "string",
            "message": "string",
            "status": "unread",
            "created_at": "2025-01-26T10:30:00"
        }
    ]
}
```

### Project Endpoints

#### GET /api/projects
**Purpose**: Get all projects
**Response**:
```json
{
    "projects": [
        {
            "id": "uuid",
            "title": "string",
            "short_description": "string",
            "description": "string",
            "technologies": ["string"],
            "duration": "string",
            "github": "string",
            "demo": "string",
            "image": "string",
            "featured": true,
            "views": 0
        }
    ]
}
```

#### GET /api/projects/:id
**Purpose**: Get single project (and increment view count)
**Response**:
```json
{
    "id": "uuid",
    "title": "string",
    "short_description": "string",
    "description": "string",
    "technologies": ["string"],
    "duration": "string",
    "github": "string",
    "demo": "string",
    "image": "string",
    "featured": true,
    "views": 1
}
```

#### POST /api/projects/:id/view
**Purpose**: Increment project view count
**Response**:
```json
{
    "success": true,
    "views": 1
}
```

## Frontend Integration Points

### 1. Contact Form Component
**File**: `/app/frontend/src/components/Contact.jsx`

**Current Mock Implementation**:
```javascript
const result = await submitContactForm(formData);
```

**Backend Integration**:
```javascript
const response = await axios.post(`${API}/contact`, formData);
```

**Changes Required**:
- Replace mock `submitContactForm` with actual API call
- Add proper error handling
- Update success/error toast messages

### 2. Projects Component (Optional Enhancement)
**File**: `/app/frontend/src/components/Projects.jsx`

**Current Mock Implementation**:
```javascript
import { projects } from '../mock';
```

**Backend Integration** (if making dynamic):
```javascript
const [projects, setProjects] = useState([]);

useEffect(() => {
    const fetchProjects = async () => {
        const response = await axios.get(`${API}/projects`);
        setProjects(response.data.projects);
    };
    fetchProjects();
}, []);
```

## Implementation Plan

### Phase 1: Essential Backend (Priority)
1. ✅ Create Contact Message model
2. ✅ Implement POST /api/contact endpoint
3. ✅ Implement GET /api/contact endpoint (for admin)
4. ✅ Test contact form submission
5. ✅ Integrate frontend Contact component with backend

### Phase 2: Projects Enhancement (Optional)
1. Create Project model
2. Seed database with existing project data from mock.js
3. Implement GET /api/projects endpoint
4. Implement project view tracking
5. Update frontend Projects component to fetch from API

### Phase 3: Admin Features (Future)
1. Admin authentication
2. Admin dashboard to view contact messages
3. Admin panel to manage projects (CRUD)

## Environment Variables
**Backend (.env)**:
- `MONGO_URL`: Already configured
- `DB_NAME`: Already configured

**Frontend (.env)**:
- `REACT_APP_BACKEND_URL`: Already configured

## Error Handling
All API endpoints should return consistent error responses:
```json
{
    "success": false,
    "message": "Error description",
    "error": "Detailed error (in development only)"
}
```

## Security Considerations
1. Input validation on all endpoints
2. Rate limiting on contact form (prevent spam)
3. Email validation
4. XSS protection (sanitize inputs)
5. CORS properly configured (already done)

## Implementation Status

### Phase 1: Essential Backend ✅
1. ✅ Created Contact Message model
2. ✅ Implemented POST /api/contact endpoint
3. ✅ Implemented GET /api/contact endpoint (for admin)
4. ✅ Integrated frontend Contact component with backend
5. ✅ Projects seeded to database

### Phase 2: Projects Enhancement ✅
1. ✅ Created Project model
2. ✅ Seeded database with existing project data from mock.js
3. ✅ Implemented GET /api/projects endpoint
4. ✅ Implemented project view tracking
5. ✅ Updated frontend Projects component to fetch from API

## Testing Checklist
- [ ] Contact form submits successfully
- [ ] Contact messages saved to database
- [ ] Error handling works for invalid inputs
- [ ] Toast notifications display correctly
- [ ] Admin can view all contact messages
- [ ] Projects API returns correct data
