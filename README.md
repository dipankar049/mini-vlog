# Mini Blog App

A simple full-stack blog application built with Node.js, Express, MongoDB, and Next.js. Users can register, login, create posts, view posts, and delete their own posts.

## Setup

### 1. Clone the repository
git clone https://github.com/dipankar049/mini-vlog.git
cd mini-blog

### 2. Backend setup
cd server
npm install
npm run dev

Create .env file in /server:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

### 3. Frontend setup
cd client
npm install
npm run dev

Create .env.local in /client:
NEXT_PUBLIC_API_URL=http://localhost:5000

## Run App
Backend: http://localhost:5000  
Frontend: http://localhost:3000