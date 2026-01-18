import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar.jsx";
import WelcomeSection from "../components/WelcomeSection.jsx";

import InsightCard from "../components/dashboard/InsightCard.jsx";
import StatsGrid from "../components/dashboard/StatsGrid.jsx";
import PerformanceSection from "../components/dashboard/PerformanceSection.jsx";
import GoalsSection from "../components/dashboard/GoalsSection.jsx";
import AchievementsSection from "../components/dashboard/AchievementsSection.jsx";

import { dashboardData } from "../data/dashboardData.js";
import { generateInsight } from "../utils/aiInsights.js";

function DashboardPage() {
  const { user } = useUser();
  const insight = generateInsight(dashboardData);

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      <div className="p-6 space-y-6">
        <WelcomeSection user={user} />
        <InsightCard text={insight} />
        <StatsGrid stats={dashboardData.stats} trends={dashboardData.trends} />
        <PerformanceSection data={dashboardData} />
        <GoalsSection goals={dashboardData.goals} />
        <AchievementsSection />
      </div>
    </div>
  );
}

export default DashboardPage;
