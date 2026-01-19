// import { useUser } from "@clerk/clerk-react";
// import Navbar from "../components/Navbar.jsx";
// import WelcomeSection from "../components/WelcomeSection.jsx";

// import InsightCard from "../components/dashboard/InsightCard.jsx";
// import StatsGrid from "../components/dashboard/StatsGrid.jsx";
// import PerformanceSection from "../components/dashboard/PerformanceSection.jsx";
// import GoalsSection from "../components/dashboard/GoalsSection.jsx";
// import AchievementsSection from "../components/dashboard/AchievementsSection.jsx";

// import { dashboardData } from "../data/dashboardData.js";
// import { generateInsight } from "../utils/aiInsights.js";

// function DashboardPage() {
//   const { user } = useUser();
//   const insight = generateInsight(dashboardData);

//   return (
//     <div className="min-h-screen bg-base-300">
//       <Navbar />
//       <div className="p-6 space-y-6">
//         <WelcomeSection user={user} />
//         <InsightCard text={insight} />
//         <StatsGrid stats={dashboardData.stats} trends={dashboardData.trends} />
//         <PerformanceSection data={dashboardData} />
//         <GoalsSection goals={dashboardData.goals} />
//         <AchievementsSection />
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;



import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import useTimeTracker from "../hooks/useTimeTracker.js";

export default function Dashboard() {
  
    useTimeTracker("dashboard");

  const [usage, setUsage] = useState(null);
  const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
};

  useEffect(() => {
    axios.get("/usage/today").then((res) => {
      setUsage(res.data);
    });
  }, []);

 if (!usage) return <p>Loading...</p>;

if (!usage.totalTime) {
  return <p>No usage recorded yet. Stay on the page for a while 🙂</p>;
}


  return (
    <div>
      <h2>Today's Usage</h2>
      <p>Total Time: {usage.totalTime} seconds</p>
      <p>Total Time: {formatTime(usage.totalTime)}</p>

      <ul>
        {Object.entries(usage.pageWiseTime || {}).map(([page, time]) => (
          <li key={page}>
            {page}: {time} sec
          </li>
        ))}
      </ul>
    </div>
  );
}
