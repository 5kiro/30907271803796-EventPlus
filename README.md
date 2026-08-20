# 30907271803796-EventPlus

EventPulse is a Node.js and Express backend API for event discovery, registration, administration, and real-time announcements.

## Stack

Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs, Socket.io, Swagger, Jest, and Supertest.

## Local Setup

1. Clone the repository: `git clone https://github.com/5kiro/30907271803796-EventPlus.git`.
2. Install Node.js 18 or newer and MongoDB, or use MongoDB Atlas.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
5. Run `npm run seed`.
6. Run `npm run dev`.
7. Visit `http://localhost:3000/health` or `http://localhost:3000/api-docs`.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register an attendee |
| POST | `/api/auth/login` | Login and receive a JWT |
| GET | `/api/events` | List, filter, search, sort, and paginate events |
| GET | `/api/events/:id` | View a populated event |
| POST | `/api/events` | Admin creates an event |
| PATCH | `/api/events/:id` | Admin updates an event |
| DELETE | `/api/events/:id` | Admin deletes an event |
| POST | `/api/registrations` | Register for an event |
| GET | `/api/registrations/my` | View your registrations |
| DELETE | `/api/registrations/:id` | Cancel your registration |
| GET | `/api/announcements/:eventId` | Announcement history |
| POST | `/api/announcements` | Admin announcement broadcast |
| GET | `/health` | Runtime and database health |

## Deployment

Live deployment URL: deployment not completed yet.

After deployment, replace the sentence above with the URL provided by Vercel or Render, then verify `/health` and `/api-docs`.
