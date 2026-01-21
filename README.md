# 🤖 AI Tutor (ChatGPT‑like UI/UX)

A **frontend‑only AI Tutor module** inspired by ChatGPT, built as part of the **HackHub / learning platform**.
This project focuses **purely on UI/UX and client‑side behavior** — **no real AI or OpenAI API is used**.

The goal is to simulate a **real, production‑grade AI chat experience** so that backend/AI logic can be plugged in later when resources allow.

---

## ✨ Key Highlights

* ChatGPT‑style chat interface
* Persistent chat history (frontend only)
* Clean, modern UI aligned with other platform pages
* Fully responsive layout
* Modular & scalable React architecture
* Zero backend dependency

---

## 🚀 Features

### 🧠 AI‑Like Chat Experience (UI Only)

* Chat bubbles (User vs AI)
* Typing indicator simulation
* Smooth message animations
* Auto‑scroll to latest message
* Real time digital wellbeing 

### 🕘 Chat History (Frontend Simulation)

* Chats persist using **LocalStorage**
* Each conversation has:

  * Unique chat ID
  * Timestamp
  * Message history
* Ability to:

  * Start a new chat
  * Switch between old chats
  * Clear chat history

> ⚠️ No real AI responses — replies are mocked / placeholder based.

---

## 🧱 Tech Stack

### Frontend

* **React.js**
* **React Router DOM**
* **Tailwind CSS**
* **Lucide Icons**

### Auth (Platform‑Level)

* **Clerk Authentication** (UserButton, user session handling)

### State & Storage

* React Hooks (`useState`, `useEffect`)
* Browser `localStorage`

---

## 📁 Project Structure (Simplified)

```
src/
│── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── ChatWindow.jsx
│   ├── ChatInput.jsx
│   └── MessageBubble.jsx
│
│── pages/
│   └── AITutor.jsx
│
│── utils/
│   └── chatStorage.js
│
│── App.jsx
│── main.jsx
```

---

## 🧩 UI/UX Design Goals

* Match the **existing platform design language**
* Keep layout consistent with other pages
* Avoid clutter — focus on learning flow
* Mobile‑first responsive design
* Sidebar‑based chat navigation (like ChatGPT)

---

## 🛠️ How It Works (Frontend Logic)

1. User sends a message
2. Message is stored in state + localStorage
3. Mock AI response is generated
4. Chat UI updates in real‑time
5. Full conversation persists on refresh

---

## ❌ What This Project Does NOT Include

* ❌ No OpenAI / AI APIs
* ❌ No backend or database
* ❌ No real AI intelligence

> This is **intentional** due to API cost constraints.

---

## 🔮 Future Enhancements

* Plug in real AI (OpenAI / local LLM)
* Backend‑powered chat persistence
* Chat folders & search
* Code block execution
* Markdown rendering
* Voice input

---

## 🎯 Purpose of This Project

* Build **real‑world UI skills**
* Understand how ChatGPT‑like systems work
* Prepare for scalable AI integration
* Showcase frontend architecture & UX thinking

---

## 👨‍💻 Author

**Ishfaq Ahmad Bhat**
B.Tech CSE | Full‑Stack Developer | HackHub Founder
From Tral, Kashmir 🇮🇳

---

## ⭐ Final Note

This project proves that **great AI experiences start with great UI/UX**.

Backend intelligence can come later — the foundation is already solid 🚀

---

**Feel free to fork, improve, or integrate it into your own platform.**
