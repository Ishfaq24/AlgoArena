# AlgoArena - Your All-in-One Coding Practice Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Express-5.1-blue?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-8.19-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
</p>

AlgoArena is a full-stack learning platform for practicing coding problems, taking mock tests, receiving AI tutoring, and practicing video interviews. Built with modern web technologies to help developers improve their skills.

---

## ✨ Features

- **🏋️ Code Practice** - Solve coding problems with an in-browser code editor (Monaco Editor)
- **🎥 Video Interview Practice** - Practice mock interviews with real-time video calls (Stream.io)
- **🤖 AI Tutor** - Get help from Google Gemini-powered AI assistant
- **📝 Mock Tests** - Take timed aptitude and coding tests
- **📊 Dashboard** - Track your progress and achievements
- **👥 Session Management** - Create and join practice sessions with others

---

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Express.js | Web server & REST API |
| MongoDB + Mongoose | Database & ODM |
| Clerk | Authentication |
| Google Gemini | AI tutoring |
| Stream.io | Video calls |
| Inngest | Background jobs |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS + DaisyUI | Styling |
| React Router | Client-side routing |
| TanStack Query | Server state |
| Monaco Editor | Code editor |
| Stream Video SDK | Video calls |
| Piston API | Code execution |

---

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Git** for version control

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ishfaq24/AlgoArena.git
cd AlgoArena
```

### 2. Install Dependencies

Install all dependencies for both backend and frontend:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies  
cd ../frontend && npm install
```

Or use the convenience script:

```bash
npm run build
```

### 3. Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
DB_URL=mongodb://localhost:27017/algoarena

# Authentication (Clerk)
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# AI (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Video Calls (Stream.io)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Background Jobs (Inngest)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Security
JWT_SECRET=your_jwt_secret
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:3000/api
```

> **Note:** You'll need to sign up for free accounts at:
> - [Clerk](https://clerk.com) - Authentication
> - [Google AI Studio](https://makersuite.google.com/app/apikey) - Gemini API
> - [Stream](https://getstream.io/) - Video calls
> - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database (or use local)

### 4. Run the Application

#### Development Mode (Recommended)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Client runs on http://localhost:5173

#### Production Mode

```bash
# Build frontend
cd frontend && npm run build

# Start backend (serves both API and static files)
cd ../backend && npm start
```

---

## 📁 Project Structure

```
AlgoArena/
├── package.json              # Root orchestration
│
├── backend/
│   ├── src/
│   │   ├── server.js         # Express entry point
│   │   ├── lib/              # Utilities (db, env, inngest, stream)
│   │   ├── models/           # Mongoose schemas (User, Session)
│   │   ├── routes/           # API endpoints
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic (Gemini AI)
│   │   └── middleware/       # Auth middleware
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Router config
│   │   ├── main.jsx          # React entry
│   │   ├── components/       # Reusable UI components
│   │   ├── Pages/            # Route pages
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities (axios, piston)
│   │   ├── data/             # Static data
│   │   ├── services/         # API services
│   │   └── utils/            # Helper functions
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── ARCHITECTURE.md           # Architecture documentation
```

---

## 🔌 API Endpoints

### Sessions (`/api/sessions`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new session |
| GET | `/active` | Get active sessions |
| GET | `/my-recent` | Get user's recent sessions |
| GET | `/:id` | Get session by ID |
| POST | `/:id/join` | Join a session |
| POST | `/:id/end` | End a session |

### Chat (`/api/chat`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/token` | Get Stream.io video token |

### AI (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tutor` | Get AI tutor response |

---

## 🤝 Contributing Guidelines

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/ishfaq24/AlgoArena.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Keep your fork updated**:
   ```bash
   git remote add upstream https://github.com/ishfaq24/AlgoArena.git
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes** following the code style

3. **Test your changes**:
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend  
   cd frontend && npm run dev
   ```

4. **Commit with descriptive messages**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

### Code Style Guidelines

- Use **ES6+** features (arrow functions, destructuring, async/await)
- Follow existing code conventions in the project
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable and function names

### Commit Message Format

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example:
```
feat: add dark mode toggle to dashboard

- Added theme context
- Updated components to support dark mode
- Added toggle button in navbar
```

### Pull Request Checklist

- [ ] Code follows project conventions
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if needed)
- [ ] No merge conflicts
- [ ] PR description explains the changes

### Reporting Issues

When reporting issues, include:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Make sure MongoDB is running
mongod

# Or update DB_URL in .env to use Atlas
```

**Port Already in Use**
```bash
# Find process using the port
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

**Node Modules Issues**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Clerk Auth Not Working**
- Verify `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are correct
- Check Clerk dashboard for your application

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [Stream](https://getstream.io/) - Video SDK
- [Google Gemini](https://gemini.google.com/) - AI
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code Editor
- [Piston](https://github.com/engineer-man/piston) - Code Execution
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

## 👨‍💻 Author

**Ishfaq Ahmad Bhat**
- GitHub: [@ishfaq24](https://github.com/ishfaq24)
- LinkedIn: [Ishfaq Ahmad Bhat](https://linkedin.com/in/ishfaq24)

---

## ⭐ Show Your Support

Give a ⭐ if this project helped you!

```bash
# Star the repo
git stash
git clone https://github.com/ishfaq24/videoCallInterview.git
cd videoCallInterview
# Star on GitHub!
```

---

**Happy Coding! 🚀**
