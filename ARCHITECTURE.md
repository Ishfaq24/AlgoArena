# AlgoArena - Architecture Documentation

## Overview

AlgoArena is a full-stack learning platform for practicing coding problems, taking mock tests, and receiving AI tutoring. The application consists of a React-based frontend and an Express.js backend.

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|----------|
| **Express.js** | Web server & REST API |
| **MongoDB + Mongoose** | Database & ODM |
| **Clerk** | Authentication middleware |
| **Google Gemini** | AI tutoring responses |
| **Stream.io** | Video call functionality |
| **Inngest** | Background job processing |

### Frontend
| Technology | Purpose |
|------------|----------|
| **React 18** | UI framework |
| **Vite** | Build tool |
| **Tailwind CSS + DaisyUI** | Styling |
| **React Router** | Client-side routing |
| **TanStack Query** | Server state management |
| **Monaco Editor** | Code editor component |
| **Stream Video SDK** | Video calls |
| **Piston API** | Code execution engine |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  Pages  │  │Components│  │ Hooks    │  │   Services   │   │
│  └────┬────┘  └────┬────┘  └────┬────┘  └──────┬───────┘   │
│       │            │            │               │              │
│       └────────────┴────────────┴───────────────┘              │
│                           │                                      │
│                    ┌──────┴──────┐                               │
│                    │  App.jsx   │                               │
│                    │ (Router)   │                               │
│                    └──────┬──────┘                               │
│                           │                                      │
│         ┌─────────────────┼─────────────────┐                    │
│         │                 │                 │                    │
│    ┌────┴────┐      ┌────┴────┐      ┌────┴────┐              │
│    │  Clerk  │      │ Axios   │      │ Piston  │              │
│    │Provider │      │Instance │      │  API    │              │
│    └─────────┘      └─────────┘      └─────────┘                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              │
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Express Server                       │   │
│  │                    (Port 3000)                         │   │
│  └───────────────────────┬──────────────────────────────┘   │
│                          │                                      │
│    ┌─────────────────────┼─────────────────────┐              │
│    │          Routes     │                      │              │
│    │  ┌────────┐  ┌─────┐│┌──────┐  ┌────────┐│              │
│    │  │  AI   │  │Chat │││Session│  │Usage   ││              │
│    │  └────────┘  └─────┘│└──────┘  └────────┘│              │
│    └─────────────────────┼─────────────────────┘              │
│                          │                                      │
│    ┌─────────────────────┼─────────────────────┐              │
│    │        Controllers  │                      │              │
│    │  ┌────────┐  ┌─────┐│┌──────┐  ┌────────┐│              │
│    │  │AI Ctrl │  │Chat │││Session│  │        ││              │
│    │  │        │  │Ctrl │││ Ctrl  │  │        ││              │
│    │  └────────┘  └─────┘│└──────┘  └────────┘│              │
│    └─────────────────────┼─────────────────────┘              │
│                          │                                      │
│    ┌─────────────────────┼─────────────────────┐              │
│    │       Services      │                      │              │
│    │  ┌──────────────────┴───────────────────┐ │              │
│    │  │         Gemini Service              │ │              │
│    │  │    (GoogleGenerativeAI)             │ │              │
│    │  └────────────────────────────────────┘ │              │
│    └──────────────────────────────────────────┘              │
│                          │                                      │
│    ┌─────────────────────┼─────────────────────┐              │
│    │         Models      │                      │              │
│    │  ┌────────┐  ┌─────┐│                     │              │
│    │  │  User  │  │Session│                   │              │
│    │  └────────┘  └─────┘│                     │              │
│    └─────────────────────┼─────────────────────┘              │
│                          │                                      │
│    ┌─────────────────────┼─────────────────────┐              │
│    │    Middleware       │                      │              │
│    │  ┌─────────────────┴──────────────────┐  │              │
│    │  │        protectRoute               │  │              │
│    │  │   (Clerk Auth + User Lookup)      │  │              │
│    │  └──────────────────────────────────┘  │              │
│    └──────────────────────────────────────────┘              │
│                          │                                      │
│    ┌─────────────────────┼─────────────────────┐              │
│    │    Libraries        │                      │              │
│    │  ┌────┐  ┌────┐  ┌─┴─┐  ┌─────────────┐ │              │
│    │  │Env │  │ DB │  │Inngest│  │  Stream   │ │              │
│    │  └────┘  └────┘  └────┘  └─────────────┘ │              │
│    └──────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ MongoDB Connection
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐  │
│  │  MongoDB   │  │  Clerk    │  │  Stream.io │  │  Piston  │  │
│  │  Atlas    │  │   Auth   │  │   Video   │  │    API   │  │
│  └────────────┘  └────────────┘  └────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
videoCallInterview/
├── package.json                 # Root package (build orchestration)
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js            # Express entry point
│       │
│       ├── lib/
│       │   ├── db.js            # MongoDB connection
│       │   ├── env.js           # Environment variables
│       │   ├── inngest.js       # Inngest configuration
│       │   └── stream.js        # Stream.io client
│       │
│       ├── models/
│       │   ├── User.js          # User schema
│       │   └── Session.js       # Practice session schema
│       │
│       ├── routes/
│       │   ├── ai.routes.js     # /api/ai endpoints
│       │   ├── chatRoutes.js    # /api/chat endpoints
│       │   ├── sessionRoutes.js # /api/sessions endpoints
│       │   └── Usage.Route.js   # Usage tracking
│       │
│       ├── controllers/
│       │   ├── ai.controller.js
│       │   ├── chatController.js
│       │   └── sessionController.js
│       │
│       ├── services/
│       │   └── gemini.service.js # Gemini AI wrapper
│       │
│       ├── middleware/
│       │   └── protectRoute.js  # Auth middleware
│       │
│       └── testGemini.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx             # Router configuration
│       ├── index.css           # Global styles
│       │
│       ├── api/
│       │   ├── axios.js         # Axios instance
│       │   └── sessions.js     # Session API calls
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── CodeEditorPanel.jsx
│       │   ├── OutputPanel.jsx
│       │   ├── ProblemDescription.jsx
│       │   ├── PracticeConfig.jsx
│       │   ├── TestTaker.jsx
│       │   ├── TestsLayout.jsx
│       │   ├── VideoCallUI.jsx
│       │   ├── DashboardVideo.jsx
│       │   ├── ActiveSession.jsx
│       │   ├── CreateSessionModel.jsx
│       │   ├── RecentSessions.jsx
│       │   ├── WelcomeSection.jsx
│       │   ├── StatsCards.jsx
│       │   ├── SectionGrid.jsx
│       │   ├── AITutorFab.jsx
│       │   ├── ArchitectureViz.jsx
│       │   ├── LearnCard.jsx
│       │   └── dashboard/
│       │       ├── AchievementsSection.jsx
│       │       ├── GoalsSection.jsx
│       │       ├── InsightCard.jsx
│       │       ├── PerformanceSection.jsx
│       │       └── StatsGrid.jsx
│       │
│       ├── Pages/
│       │   ├── HomePage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── SessionPage.jsx
│       │   ├── PracticeLayout.jsx
│       │   ├── problems/
│       │   │   ├── ProblemsLayout.jsx
│       │   │   ├── coding/
│       │   │   │   ├── ProblemsPage.jsx
│       │   │   │   └── ProblemPage.jsx
│       │   │   ├── school/
│       │   │   │   └── SchoolProblems.jsx
│       │   │   ├── aptitude/
│       │   │   │   └── AptitudeProblems.jsx
│       │   │   └── exam/
│       │   │       └── ExamProblems.jsx
│       │   ├── learn/
│       │   │   └── Learn.jsx
│       │   ├── tests/
│       │   │   └── TestLayout.jsx
│       │   └── ai/
│       │       ├── AITutorPage.jsx
│       │       ├── ChatContainer.jsx
│       │       ├── ChatInput.jsx
│       │       ├── Header.jsx
│       │       ├── Sidebar.jsx
│       │       └── fakeAI.js
│       │
│       ├── hooks/
│       │   ├── useChatStore.js
│       │   ├── useSessions.js
│       │   ├── useStreamClient.js
│       │   └── useTimeTracker.js
│       │
│       ├── lib/
│       │   ├── axios.js
│       │   ├── piston.js        # Code execution
│       │   ├── stream.js
│       │   └── utils.js
│       │
│       ├── data/
│       │   ├── dashboardData.js
│       │   └── problems.js     # Problem definitions
│       │
│       ├── services/
│       │   ├── dbService.js
│       │   └── geminiService.js
│       │
│       ├── types.js
│       └── utils/
│           └── aiInsights.js
│
└── ARCHITECTURE.md             # This file
```

---

## API Endpoints

### Authentication
- Handled by **Clerk** (external service)
- Middleware `protectRoute` validates Clerk tokens and attaches user to request

### Session Routes (`/api/sessions`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new practice session |
| GET | `/active` | Get all active sessions |
| GET | `/my-recent` | Get user's recent sessions |
| GET | `/:id` | Get session by ID |
| POST | `/:id/join` | Join a session |
| POST | `/:id/end` | End a session |

### Chat Routes (`/api/chat`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/token` | Get Stream.io token for video chat |

### AI Routes (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tutor` | Get AI tutor response (Gemini) |

---

## Data Models

### User
```javascript
{
  username: String (unique),
  email: String (unique, required),
  profileImage: String,
  clerkId: String (unique, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Session
```javascript
{
  problem: String (required),
  difficulty: String (enum: Easy, Medium, Hard),
  host: ObjectId (ref: User, required),
  participant: ObjectId (ref: User),
  status: String (enum: active, Completed),
  callId: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## User Flows

### 1. Code Practice Flow
```
User logs in → Selects problem → Reads description 
→ Writes code in Monaco Editor → Submits code 
→ Piston API executes → Output displayed
```

### 2. Video Interview Practice Flow
```
User creates session → Selects problem → Gets callId
→ Shares with participant → Both join video call 
→ Collaborate on problem → End session
```

### 3. AI Tutoring Flow
```
User navigates to AI Tutor → Sends message 
→ Backend calls Gemini API → Response displayed
```

### 4. Mock Test Flow
```
User selects test → TestTaker component renders questions 
→ User submits answers → Results calculated
```

---

## Environment Variables

### Backend (.env)
```
PORT=3000
DB_URL=<mongodb_connection_string>
NODE_ENV=development
CLIENT_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=<clerk_key>
CLERK_SECRET_KEY=<clerk_secret>
GEMINI_API_KEY=<gemini_key>
STREAM_API_KEY=<stream_key>
STREAM_API_SECRET=<stream_secret>
INNGEST_EVENT_KEY=<inngest_key>
INNGEST_SIGNING_KEY=<inngest_signing_key>
```

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=<clerk_key>
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## Deployment

- **Development**: Separate backend (port 3000) and frontend (port 5173)
- **Production**: 
  - Frontend builds to static files
  - Express serves static files from `/frontend/dist`
  - All routes wildcard `/*` serve `index.html`

---

## Security

1. **Authentication**: Clerk handles all auth
2. **Route Protection**: `protectRoute` middleware validates tokens
3. **CORS**: Configured for client URL only
4. **Environment**: Sensitive keys in `.env` files

---

## Dependencies Overview

### Key Backend Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `@clerk/express` - Auth middleware
- `@google/generative-ai` - Gemini AI
- `@stream-io/node-sdk` - Video calls
- `inngest` - Background jobs

### Key Frontend Dependencies
- `react` + `react-dom` - UI
- `@clerk/clerk-react` - Auth UI
- `@monaco-editor/react` - Code editor
- `@stream-io/video-react-sdk` - Video UI
- `react-router` - Routing
- `@tanstack/react-query` - Server state
- `tailwindcss` + `daisyui` - Styling

---

## Future Enhancements

- Real-time collaboration in code editor
- Code comparison and analysis
- More problem categories
- Leaderboards and achievements
- Timer-based mock tests
- Voice input for AI tutor
