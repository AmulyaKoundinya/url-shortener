# URL Shortener System

A full-stack DevOps-based URL Shortener application built using React, Flask, Redis, Docker, and Nginx.

This project provides a scalable and containerized URL shortening platform where users can create short links, manage URLs, and track analytics through a modern web dashboard.

---

# Features

- Shorten long URLs instantly
- Redirect users using generated short URLs
- Track click analytics and statistics
- Modern React frontend dashboard
- REST API using Flask backend
- Fast in-memory storage using Redis
- Dockerized multi-container architecture
- Nginx reverse proxy configuration
- Persistent and scalable deployment setup

---

# Tech Stack

## Frontend
- React
- Vite
- CSS

## Backend
- Flask
- Python

## Database
- Redis

## DevOps & Deployment
- Docker
- Docker Compose
- Nginx

---

# System Architecture

```text
User
  │
  ▼
Nginx Reverse Proxy
  │
  ├── Frontend (React + Vite)
  │
  └── Backend API (Flask)
            │
            ▼
         Redis Database
```

---

# Project Structure

```text
url-shortener/
│
├── frontend/          # React frontend
├── backend/           # Flask backend
├── nginx/             # Nginx configuration
├── docker-compose.yml
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/AmulyaKoundinya/url-shortener.git
```

## Move Into Project Folder

```bash
cd url-shortener
```

---

# Run Using Docker

## Build and Start Containers

```bash
docker-compose up --build
```

## Run in Detached Mode

```bash
docker-compose up -d
```

---

# Application Ports

| Service   | Port |
|------------|------|
| Frontend   | 5173 |
| Backend    | 5000 |
| Nginx      | 80   |
| Redis      | 6379 |

---

# How It Works

1. User enters a long URL in the React frontend.
2. Frontend sends request to Flask backend API.
3. Backend generates a unique short URL.
4. URL mappings are stored in Redis.
5. Nginx routes requests between frontend and backend.
6. Clicking the short URL redirects to the original URL.
7. Click statistics are tracked and stored.

---

# DevOps Concepts Demonstrated

- Containerization using Docker
- Multi-container orchestration with Docker Compose
- Reverse proxy setup using Nginx
- Inter-container networking
- Persistent service deployment
- Backend API integration
- In-memory caching with Redis
- Scalable microservice-style architecture

---

# API Example

## Shorten URL

```http
POST /api/shorten
```

### Request Body

```json
{
  "url": "https://example.com"
}
```

### Response

```json
{
  "short_url": "http://localhost/abc123"
}
```

---

# Future Enhancements

- User authentication
- QR code generation
- Custom short URLs
- URL expiration support
- Dashboard analytics graphs
- Kubernetes deployment

---

# Contributors

- Project developed collaboratively using GitHub workflow and DevOps practices.

---

# License

This project is for educational and learning purposes.