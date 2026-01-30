import Navbar from "../components/Navbar.jsx";
import WelcomeSection from "../components/WelcomeSection.jsx";
import StatsCards from "../components/StatsCard.jsx";
import ActiveSessions from "../components/ActiveSession.jsx";
import RecentSessions from "../components/RecentSessions.jsx";
import CreateSessionModal from "../components/CreateSessionModel.jsx";
import DashboardVideo from "../components/DashboardVideo.jsx";

function DashboardPage() {
  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection />
        <DashboardVideo />
      </div>
    </>
  );
}

export default DashboardPage;
