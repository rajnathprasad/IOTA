# IOTA 💛

**IOTA** is a modern, real-time technical interview platform designed to simulate real-world coding interviews. It combines collaborative coding in a Monaco-powered editor, multi-language code execution via Judge0, one-on-one WebRTC video calling, dynamic screen sharing, AI-assisted question generation powered by Google Gemini, real-time chat, and automated proctoring tab-switch detection into a unified workspace.

🔗 **Live Deployment:** [https://iota-one-swart.vercel.app/](https://iota-one-swart.vercel.app/)

---

## ✨ Core Features

### 🎥 Real-Time Audio/Video Communication
* **One-to-One Peer-to-Peer Calling:** Built on WebRTC `RTCPeerConnection` with low-latency streaming.
* **Audio & Video Controls:** Toggle mic mute/unmute and camera enable/disable with real-time remote indicator sync.
* **STUN/TURN Fallback:** Configured with Metered STUN and TURN relay servers to guarantee connectivity across NATs and strict firewalls.

### 💻 Collaborative Coding & Execution
* **Monaco Editor Integration:** Embedded VS Code-grade editor (`@monaco-editor/react`) with syntax highlighting and light/dark theme adaptation.
* **Multi-Language Support:** JavaScript, TypeScript, Python, Java, and C++.
* **Real-Time Code Sync:** Bidirectional code and language updates synchronized across rooms via Socket.IO.
* **Cloud Code Execution:** Remote compilation and execution via the Judge0 CE API (`ce.judge0.com`), returning stdout, stderr, and compilation errors.

### 🖥️ Dynamic Screen Sharing
* **Bi-directional Sharing:** Both candidate and interviewer can share screen streams (`navigator.mediaDevices.getDisplayMedia`).
* **WebRTC Track Renegotiation:** Dynamically adds and renegotiates video tracks over the existing peer connection without dropping calls.
* **Stream Identification:** Dedicated stream ID tracking to separate webcam feeds from screen share feeds in the layout.

### 🤖 AI-Assisted Question Generation
* **Google Gemini 2.5 Flash:** Powered by `@google/genai` to generate custom interview questions on demand based on prompt topics and difficulty.
* **Structured Output Schema:** Returns problem statements, sample inputs/outputs, and constraints.
* **In-Interview Sharing:** Interviewers can preview questions and broadcast them instantly to the candidate's workspace.

### 🔍 Anti-Cheating & Proctoring
* **Tab-Switch Detection:** Leverages the HTML5 `visibilitychange` API to monitor candidate focus.
* **Violation Tracking:** Records timestamps and out-of-focus durations, streaming alerts to the interviewer's dashboard in real-time.

### 💬 Real-Time In-Room Chat
* **Live Messaging:** In-room chat panel powered by Socket.IO for links, notes, and textual communication during the interview.

### 🔐 Authentication & Role-Based Access
* **NextAuth.js (Auth.js v5):** JWT-based session strategy supporting Google OAuth and Email/Password credentials (hashed with `bcryptjs`).
* **Role-Based Workflow:** Distinct interfaces and permissions for `INTERVIEWER` and `CANDIDATE` roles.
* **Profile Setup:** Automatic onboarding redirection for newly registered OAuth users.

---

## 🏗️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org/) 16 (App Router), [React](https://react.dev/) 19, [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/) v4, [Radix UI](https://www.radix-ui.com/), Shadcn UI, [Lucide React](https://lucide.dev/) |
| **Code Editor** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`@monaco-editor/react`) |
| **Code Execution** | [Judge0 CE API](https://ce.judge0.com/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Backend & API** | Next.js Server Actions, Route Handlers, Node.js |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/) (Neon Serverless), [Prisma ORM](https://www.prisma.io/) v7 (`@prisma/adapter-pg`) |
| **Authentication** | [Auth.js / NextAuth v5](https://authjs.dev/) with JWT strategy & bcryptjs |
| **Real-Time Signaling** | [Socket.IO](https://socket.io/) (Standalone Node server running on Railway) |
| **P2P Video & Screen** | WebRTC (`RTCPeerConnection`), Metered STUN/TURN Servers |
| **AI Integration** | [Google Gemini 2.5 Flash](https://ai.google.dev/) (`@google/genai`) |

---

## 📂 Project Structure

```text
iota/
├── app/                        # Next.js 16 App Router
│   ├── (auth)/                 # Login and Registration routes
│   ├── (protected)/            # Role-protected routes (dashboard, candidate, interviewer, interview)
│   ├── actions/                # Server Actions (auth, interview lifecycle, questions, profile)
│   ├── api/                    # API Route Handlers (auth, run-code via Judge0)
│   ├── complete-profile/       # Onboarding role selection for OAuth users
│   ├── globals.css             # Tailwind CSS tokens and themes
│   ├── layout.tsx              # Root HTML shell & ThemeProvider
│   └── page.tsx                # Public landing page
├── components/                 # React components
│   ├── auth/                   # Login, register, and profile forms
│   ├── candidate/              # Candidate room join form
│   ├── chat/                   # Real-time chat panel
│   ├── common/                 # Logos and branding assets
│   ├── dashboard/              # Shared dashboard views & layout
│   ├── interview/              # Monaco editor, output panel, AI question panel, screen share
│   ├── layout/                 # TopBar, BottomBar, Mic/Camera buttons, timers, presence
│   ├── proctoring/             # Tab switch alerts and metrics
│   ├── providers/              # Theme provider
│   ├── socket/                 # SocketProvider (Socket.IO event subscriptions)
│   ├── ui/                     # Shadcn / Radix UI primitives
│   └── webrtc/                 # WebRTCProvider (media streams, signaling & renegotiation)
├── lib/                        # Core utilities & shared instances
│   ├── gemini.ts               # Google Gemini client configuration
│   ├── prisma.ts               # Prisma Client singleton with PG adapter
│   ├── socket.ts               # Socket.IO client instance
│   └── utils.ts                # Class merging and utility helpers
├── prisma/                     # Database layer
│   ├── migrations/             # SQL schema migrations
│   └── schema.prisma           # Prisma schema (User, Interview, Account, Session)
├── socket-server/              # Standalone Socket.IO Signaling Server
│   ├── package.json
│   └── server.ts               # Event handlers for rooms, WebRTC, code sync & chat
├── store/                      # Zustand global state
│   └── interview-store.ts      # Active room, media streams, peer connection & UI state
├── types/                      # TypeScript declarations
│   └── next-auth.d.ts          # Session and JWT type extensions
├── auth.ts                     # NextAuth v5 configuration & callbacks
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 👥 User Roles & Workflow

```mermaid
flowchart TD
    User([User Visits Platform]) --> Auth{Authenticated?}
    Auth -- No --> AuthPage["Login / Register"]
    AuthPage --> Auth
    Auth -- Yes --> RoleCheck{Role Assigned?}
    RoleCheck -- No --> CompleteProfile["/complete-profile"]
    CompleteProfile --> DashboardRouter["/dashboard"]
    RoleCheck -- Yes --> DashboardRouter

    DashboardRouter --> RoleDecision{User Role}
    RoleDecision -- CANDIDATE --> CandidateHome["/candidate"]
    RoleDecision -- INTERVIEWER --> InterviewerHome["/interviewer"]

    InterviewerHome --> CreateRoom["Create Interview Room"]
    CreateRoom --> RoomCode["Generates 6-Char Code"]
    RoomCode --> RoomInterviewer["/interview/ROOM_CODE"]

    CandidateHome --> EnterCode["Enter Room Code"]
    EnterCode --> RoomCandidate["/interview/ROOM_CODE"]

    RoomInterviewer <--> SocketSignaling(("Socket.IO & WebRTC"))
    RoomCandidate <--> SocketSignaling
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
* Node.js 18+ installed
* A PostgreSQL instance (e.g. Neon, Supabase, or local PostgreSQL)
* Google Cloud OAuth Credentials (optional for Google login)
* Google Gemini API Key

### 2. Clone and Install

```bash
git clone <repo-url>
cd iota
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/iota"

# NextAuth v5
AUTH_SECRET="your-generated-auth-secret"
AUTH_TRUST_HOST="true"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI
GEMINI_API_KEY="your-gemini-api-key"

# Real-Time (Socket.IO)
# In development, point to local socket server (Port 3001)
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"

# WebRTC TURN/STUN (Metered credentials or custom)
NEXT_PUBLIC_TURN_USERNAME="your-turn-username"
NEXT_PUBLIC_TURN_CREDENTIAL="your-turn-credential"
```

### 4. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 5. Running the Application
Open two terminal windows:

**Terminal 1 (Next.js Application):**
```bash
npm run dev
```

**Terminal 2 (Socket.IO Signaling Server):**
```bash
npm run socket
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

> [!TIP]
> To test real-time collaboration locally, open the Interviewer view in a regular browser window and the Candidate view in an Incognito window or different browser profile so session cookies do not conflict.

---

## 🎯 Roadmap & Future Improvements

* [ ] Collaborative rich-text whiteboard (tldraw / Excalidraw integration)
* [ ] Multi-party interviews (Selective Forwarding Unit / SFU with LiveKit or mediasoup)
* [ ] Automated code evaluation with hidden test cases
* [ ] End-of-interview AI performance summary & feedback generation
* [ ] Session recording (MediaRecorder API / cloud recording)
* [ ] Analytics and interview history archive

---

### Author
**Rajnath Prasad**


