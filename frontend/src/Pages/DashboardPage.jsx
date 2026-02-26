
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import WelcomeSection from '../components/WelcomeSection';
import StatsCards from '../components/StatsCards';
import ActiveSessions from '../components/ActiveSession';
import RecentSessions from '../components/RecentSessions';
import CreateSessionModal from '../components/CreateSessionModel';
import DashboardVideo from '../components/DashboardVideo';
import ArchitectureViz from '../components/ArchitectureViz';
import AITutorFab from '../components/AITutorFab';
import { useDashboard } from '../hooks/useDashboard';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: dashboardData, isLoading, error } = useDashboard();
  
  const [activeUser, setActiveUser] = useState({
    id: 'usr_24',
    name: dashboardData?.user?.username || 'Ishfaq33',
    role: 'Student',
    path: 'JEE/NEET',
    targetExam: 'JEE Mains 2025',
    avatar: dashboardData?.user?.profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishfaq'
  });

  const handlePathChange = (newPath) => {
    setActiveUser(prev => ({ ...prev, path: newPath }));
  };

  // Update user when dashboard data loads
  React.useEffect(() => {
    if (dashboardData?.user) {
      setActiveUser(prev => ({
        ...prev,
        id: dashboardData.user.id,
        name: dashboardData.user.username || prev.name,
        avatar: dashboardData.user.profileImage || prev.avatar
      }));
    }
  }, [dashboardData]);

  // Show error toast when dashboard fetch fails
  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load dashboard data');
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-base-100 font-sans text-base-content selection:bg-primary/20 selection:text-primary">
      <Navbar user={activeUser} onPathChange={handlePathChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24">
        <WelcomeSection onCreateSession={() => setIsModalOpen(true)} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {/* Stats Cards - transform backend stats to component format */}
            <StatsCards 
              path={activeUser.path} 
              stats={dashboardData?.stats ? [
                { label: 'Exam Readiness', value: `${dashboardData.stats.examReadiness || 0}%`, change: '+5%', trend: 'up' },
                { label: 'Concept Clarity', value: `${dashboardData.stats.conceptClarity || 0}%`, change: '+2.1%', trend: 'up' },
                { label: 'Active Retention', value: `${dashboardData.stats.activeRetention || 0}%`, change: '-1.5%', trend: 'down' },
                { label: 'AI Summaries', value: dashboardData.stats.aiSummaries || 0, change: '+12', trend: 'up' }
              ] : null}
              isLoading={isLoading}
            />
            <div className="rounded-3xl overflow-hidden border border-white/5 bg-base-200 shadow-2xl">
              <DashboardVideo />
            </div>
            <ArchitectureViz />
          </div>
          
          <div className="space-y-10">
            <ActiveSessions 
              sessions={dashboardData?.activeSessions?.map(s => ({
                id: s._id || s.id,
                title: s.problem,
                subject: s.difficulty,
                type: 'Session',
                progress: 50,
                lastActive: s.createdAt,
                status: s.status === 'active' ? 'active' : 'paused'
              })) || null}
              isLoading={isLoading}
            />
            <RecentSessions 
              activities={dashboardData?.activities || null}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <CreateSessionModal 
        isOpen={isModalOpen} 
        userPath={activeUser.path}
        onClose={() => setIsModalOpen(false)} 
      />

      <AITutorFab userPath={activeUser.path} />
    </div>
  );
};

export default DashboardPage;
