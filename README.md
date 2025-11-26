# Portfolio Website

A modern, responsive personal portfolio website built with the MERN stack (MongoDB, Express-like FastAPI, React, Node.js environment) and Python. This project showcases my skills, projects, and experience with a sleek, dark-themed UI.

![Portfolio Preview](/frontend/public/assets/recipe-genai.png)

## 🚀 Features

-   **Dynamic Project Showcase**: Display featured projects with images, descriptions, and links to code/live demos.
-   **Contact Form**: Functional contact form with email notifications using FastAPI and SMTP.
-   **Responsive Design**: Fully responsive layout optimized for all devices using Tailwind CSS.
-   **Modern UI/UX**: Glassmorphism effects, smooth transitions, and interactive elements.
-   **Backend API**: Robust Python FastAPI backend handling data and email services.
-   **Database Integration**: MongoDB for storing contact messages and project view analytics.

## 🛠️ Tech Stack

### Frontend
-   **React.js**: UI library
-   **Tailwind CSS**: Utility-first CSS framework
-   **Lucide React**: Icons
-   **Axios**: HTTP client

### Backend
-   **FastAPI**: High-performance Python web framework
-   **MongoDB**: NoSQL database
-   **Motor**: Asynchronous MongoDB driver for Python
-   **FastAPI-Mail**: Email sending library
-   **Pydantic**: Data validation

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js & npm
-   Python 3.8+
-   MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/Vinay130704/Portfolio.git
cd Portfolio
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment and activate it:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:
```env
MONGO_URL="mongodb://127.0.0.1:27017"
DB_NAME="portfolio_db"
CORS_ORIGINS="http://localhost:3000,http://localhost:3001"

# Email Configuration
MAIL_USERNAME="your-email@gmail.com"
MAIL_PASSWORD="your-app-password"
MAIL_FROM="your-email@gmail.com"
MAIL_PORT=587
MAIL_SERVER="smtp.gmail.com"
MAIL_FROM_NAME="Portfolio Contact"
MAIL_TO="your-email@gmail.com"
```

Run the backend server:
```bash
python -m uvicorn server:app --reload
```
The server will start at `http://127.0.0.1:8000`.

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `frontend` directory:
```env
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```

Run the frontend application:
```bash
npm start
```
The app will open at `http://localhost:3000`.

## 📬 Contact
Feel free to reach out to me via the contact form on the website or directly at [vinaykumar.jld13@gmail.com](mailto:vinaykumar.jld13@gmail.com).

---
Made with ❤️ and Python
