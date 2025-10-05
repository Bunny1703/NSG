# NSG Surveillance System

A modern surveillance system with AI-powered feature extraction, real-time alerts, and multi-source video input support.

## Features

- Multi-source video input support (drones, body cams, CCTV)
- AI-powered feature extraction (objects, patterns, activities)
- Real-time alerts and event visualization
- Watchlist-based face recognition
- Reporting & analytics dashboard
- Secure authentication and access control

## Tech Stack

- Frontend: React, Material-UI
- Backend: Django, Django REST Framework
- AI/ML: TensorFlow, OpenCV
- Database: PostgreSQL
- Authentication: JWT, 2FA

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- PostgreSQL

### Installation

1. Clone the repository
2. Set up the backend:
   ```
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Set up the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

## Security Features

- End-to-end encryption (HTTPS, TLS 1.3)
- Role-based access control
- Biometric/2FA for critical accounts
- Data anonymization for privacy

## Compliance

This system is designed to comply with IT Act, 2000 & upcoming data protection norms.