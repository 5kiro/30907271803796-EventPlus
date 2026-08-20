# 00000-EventPulse

EventPulse is a Node.js and Express backend API for event discovery, registration, administration, and real-time announcements.

## Stack

Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs, Socket.io, Swagger, Jest, and Supertest.

## Local Setup

1. Install Node.js 18 or newer and MongoDB.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
4. Run `npm run seed`.
5. Run `npm run dev`.
6. Visit `/health` or `/api-docs`.

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

Deployment URL: configure after deploying to Vercel.
