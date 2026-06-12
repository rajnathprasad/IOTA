# IOTA 💛

**IOTA** is a modern technical interview platform designed to simulate real-world coding interviews. It provides collaborative coding, live video communication, screen sharing, AI-assisted question generation, chat, and interview proctoring in a single workspace.

# Site live at : https://iota-one-swart.vercel.app/

Built with Next.js, TypeScript, Prisma, PostgreSQL, Socket.IO, WebRTC, and Gemini AI.

---

## ✨ Features

### 🎥 Real-Time Communication

* One-to-one video calling using WebRTC
* Audio controls (mute/unmute)
* Camera controls (enable/disable)
* Low-latency peer-to-peer communication

### 💻 Collaborative Coding Workspace

* Built-in code editor
* Multiple language support
* Code execution and output panel
* Interviewer and candidate work in the same environment

### 🖥️ Screen Sharing

* Candidate screen sharing
* Interviewer screen viewing
* Dedicated screen-sharing workspace

### 🤖 AI-Assisted Question Generation

* Generate interview questions using Gemini AI
* Difficulty-based questions
* Coding and technical interview preparation support

### 🔍 Interview Proctoring

* Tab-switch detection
* Activity monitoring
* Interview integrity tracking

### 💬 Real-Time Chat

* Live messaging between interviewer and candidate
* Integrated directly into the interview workspace

### 🔐 Authentication & Authorization

* Email and password authentication
* Google OAuth authentication
* Role-based access control
* Candidate and Interviewer workflows

---

## 🏗️ Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Shadcn/UI
* Zustand

### Backend

* Next.js Server Actions
* Prisma ORM
* PostgreSQL
* NextAuth.js

### Real-Time Infrastructure

* Socket.IO
* WebRTC
* TURN/STUN Servers (Metered)

### AI

* Google Gemini API

---

## 📂 Project Structure

```text
app/
components/
features/
hooks/
lib/
prisma/
socket-server/
store/
types/
```

---

## 👥 User Roles

### Candidate

* Join interview rooms
* Participate in video interviews
* Solve coding questions
* Share screen
* Chat with interviewer

### Interviewer

* Create interview rooms
* Generate AI-assisted questions
* Monitor candidate activity
* Review solutions
* Conduct live interviews

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone <repo-url>
cd iota
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
DATABASE_URL=

AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

AUTH_TRUST_HOST=true

GEMINI_API_KEY=

NEXT_PUBLIC_SOCKET_URL=

NEXT_PUBLIC_TURN_USERNAME=
NEXT_PUBLIC_TURN_CREDENTIAL=
```

### Database

```bash
npx prisma generate
npx prisma db push
```

### Run Next.js

```bash
npm run dev
```

### Run Socket Server

```bash
npm run socket
```

---

## 🎯 Future Improvements

* Interview recordings
* Multi-participant interviews
* Whiteboard collaboration
* Automated coding evaluation
* AI interview feedback
* Resume analysis
* Interview analytics dashboard

---

### Created By

**Rajnath Prasad**

