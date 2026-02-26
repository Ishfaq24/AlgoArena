
import React from 'react';

const StatsCards = ({ path, stats: propStats, isLoading }) => {
  const isExamPath = ['JEE/NEET', 'UPSC/Civil Services', 'Job Exams (Banking/SSC)'].includes(path);
  
  const defaultStats = [
    { 
      label: isExamPath ? 'Exam Readiness' : 'Curriculum Progress', 
      value: isExamPath ? '72%' : '84%', 
      change: '+5%', 
      trend: 'up'
    },
    { label: 'Concept Clarity', value: '91%', change: '+2.1%', trend: 'up' },
    { label: 'Active Retention', value: '68%', change: '-1.5%', trend: 'down' },
    { label: 'AI Summaries', value: '428', change: '+12', trend: 'up' }
  ];

  const stats = propStats || defaultStats;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-base-200 p-6 rounded-3xl border border-white/5 animate-pulse">
            <div className="h-4 w-20 bg-white/10 rounded mb-4"></div>
            <div className="h-8 w-16 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-base-200 p-6 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.trend === 'up' ? 'text-primary bg-primary/10' : 'text-red-400 bg-red-400/10'}`}>
              {stat.change}
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
            <p className="text-sm text-white/40 font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
