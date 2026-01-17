import { useUser } from "@clerk/clerk-react";
import Navbar from "../Components/Navbar";
import {
  Bell,
  MessageSquare,
  ChevronDown,
  Calendar,
  Zap,
  CheckCircle,
  Target,
  BookOpen,
} from "lucide-react";

/* -------------------------------------------------
   UTIL
------------------------------------------------- */
const cn = (...c) => c.filter(Boolean).join(" ");

/* -------------------------------------------------
   COLORS (AlgoArena)
------------------------------------------------- */
const COLORS = {
  bg: "#0b0b0b",
  card: "#121212",
  border: "rgba(34,197,94,0.25)", // green border
  primary: "#22c55e",
  muted: "rgba(255,255,255,0.55)",
};

/* -------------------------------------------------
   HEADER
------------------------------------------------- */
function Header() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <header className="flex items-center justify-between py-6">
      <h1 className="text-2xl font-semibold text-white">
        {greeting}, <span className="text-green-500">Oliver</span>
      </h1>

      <div className="flex items-center gap-4">
        <IconBtn icon={Bell} />
        <IconBtn icon={MessageSquare} dot />
        <Profile />
      </div>
    </header>
  );
}

const IconBtn = ({ icon: Icon, dot }) => (
  <button className="relative p-2 rounded-xl hover:bg-white/5">
    <Icon className="w-5 h-5 text-white/70" />
    {dot && (
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full" />
    )}
  </button>
);

const Profile = () => (
  <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5">
    <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center text-sm text-green-400">
      OL
    </div>
    <ChevronDown className="w-4 h-4 text-white/60" />
  </button>
);

/* -------------------------------------------------
   STAT CARD
------------------------------------------------- */
function StatCard({ icon: Icon, label, value }) {
  return (
    <div
      className="rounded-2xl p-5 shadow-lg"
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <Icon className="w-5 h-5 text-green-500 mb-3" />
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

/* -------------------------------------------------
   ACTIVITY
------------------------------------------------- */
function Activity() {
  const data = [4, 3, 6, 9, 4, 2, 3];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div
      className="rounded-2xl p-6 shadow-lg"
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">Activity</h3>

      <div className="flex items-end justify-between h-40">
        {data.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className="w-1 rounded-full"
              style={{
                height: h * 14,
                background: i === 3 ? COLORS.primary : "rgba(255,255,255,0.2)",
              }}
            />
            <span className="text-xs text-white/60">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------
   SESSION CARD
------------------------------------------------- */
function SessionCard({ title, level }) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4 shadow-lg"
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-green-400" />
      </div>

      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-white/50">{level}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   COMMUNITY
------------------------------------------------- */
function CommunityCard() {
  return (
    <div
      className="rounded-2xl p-6 shadow-lg"
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <span className="text-xs uppercase text-green-500 tracking-wide">
        Inspiring
      </span>
      <h3 className="text-xl font-bold text-white mt-2">
        AI Community around the world
      </h3>
    </div>
  );
}

/* -------------------------------------------------
   LEADERBOARD
------------------------------------------------- */
function Leaderboard() {
  const leaders = [
    { name: "Lucas", pts: 34056 },
    { name: "Fernanda", pts: 21032 },
    { name: "Aaliyah", pts: 18489 },
  ];

  return (
    <div
      className="rounded-2xl p-6 shadow-lg"
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">Leaders</h3>

      <div className="space-y-3">
        {leaders.map((l) => (
          <div key={l.name} className="flex justify-between text-sm">
            <span className="text-white/80">{l.name}</span>
            <span className="text-white font-medium">{l.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------
   DASHBOARD PAGE
------------------------------------------------- */
export default function DashboardPage() {
  const { user } = useUser();

  const activeSessions = [
    { id: 1, title: "Binary Search Tree", level: "Medium" },
    { id: 2, title: "LLM Prompt Design", level: "Easy" },
  ];

  return (
    <div
      className="min-h-screen px-6"
      style={{ background: COLORS.bg }}
    >
    <Navbar />
      <Header />

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Calendar} label="Active Sessions" value={2} />
        <StatCard icon={Zap} label="Recent Sessions" value={4} />
        <StatCard icon={CheckCircle} label="AI Ready" value={1} />
        <StatCard icon={Target} label="Total Sessions" value={6} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Activity />

          <div className="space-y-4">
            {activeSessions.map((s) => (
              <SessionCard
                key={s.id}
                title={s.title}
                level={s.level}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <CommunityCard />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
