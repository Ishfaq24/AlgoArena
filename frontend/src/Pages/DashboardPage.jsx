
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

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState({
    id: 'usr_24',
    name: 'Ishfaq33',
    role: 'Student',
    path: 'JEE/NEET',
    targetExam: 'JEE Mains 2025',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishfaq'
  });

  const handlePathChange = (newPath) => {
    setActiveUser(prev => ({ ...prev, path: newPath }));
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans text-base-content selection:bg-primary/20 selection:text-primary">
      <Navbar user={activeUser} onPathChange={handlePathChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24">
        <WelcomeSection onCreateSession={() => setIsModalOpen(true)} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <StatsCards path={activeUser.path} />
            <div className="rounded-3xl overflow-hidden border border-white/5 bg-base-200 shadow-2xl">
              <DashboardVideo />
            </div>
            <ArchitectureViz />
          </div>
          
          <div className="space-y-10">
            <ActiveSessions />
            <RecentSessions />
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
