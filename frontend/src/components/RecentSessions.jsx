
import React from 'react';

const getActivityColor = (action) => {
  if (action?.includes('Mastered') || action?.includes('Completed')) {
    return 'bg-green-500/20 text-green-400';
  }
  if (action?.includes('Notes') || action?.includes('Generated')) {
    return 'bg-blue-500/20 text-blue-400';
  }
  if (action?.includes('AI') || action?.includes('Session')) {
    return 'bg-purple-500/20 text-purple-400';
  }
  return 'bg-primary/20 text-primary';
};

const formatTimeAgo = (date) => {
  if (!date) return 'Just now';
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return past.toLocaleDateString();
};

const RecentSessions = ({ activities: propActivities, isLoading }) => {
  const defaultActivities = [
    { id: 1, action: 'Mastered Topic', target: 'Binary Search Trees', time: new Date(Date.now() - 3600000), icon: '🌲', color: 'bg-green-500/20 text-green-400' },
    { id: 2, action: 'Generated Notes', target: 'Graph Algorithms', time: new Date(Date.now() - 86400000), icon: '📝', color: 'bg-blue-500/20 text-blue-400' },
    { id: 3, action: 'AI Session Review', target: 'Space Complexity', time: new Date(Date.now() - 172800000), icon: '🧠', color: 'bg-purple-500/20 text-purple-400' },
  ];

  const activities = propActivities || defaultActivities;

  if (isLoading) {
    return (
      <div className="bg-base-200 rounded-3xl p-8 border border-white/5 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-8">Pulse Feed</h3>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-5 items-start animate-pulse">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex"></div>
              <div className="flex-1 border-b border-white/5 pb-6">
                <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
                <div className="h-3 w-32 bg-white/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-3xl p-8 border border-white/5 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-8">Pulse Feed</h3>
      <div className="space-y-8">
        {activities.map((activity, idx) => (
          <div key={activity._id || idx} className="flex gap-5 items-start group">
            <div className={`w-12 h-12 shrink-0 rounded-2xl ${activity.color || getActivityColor(activity.action)} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {activity.icon || '📌'}
            </div>
            <div className="flex-1 border-b border-white/5 pb-6 group-last:border-0 group-last:pb-0">
              <div className="flex justify-between items-start">
                <p className="text-base font-bold text-white group-hover:text-primary transition-colors">{activity.action}</p>
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{activity.time ? formatTimeAgo(activity.time) : 'Just now'}</span>
              </div>
              <p className="text-sm text-white/50 mt-1 font-medium">{activity.target}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-4 mt-10 text-xs font-black uppercase tracking-widest text-white/40 hover:text-primary hover:bg-white/5 border border-white/5 rounded-2xl transition-all">
        Full Activity Archive
      </button>
    </div>
  );
};

export default RecentSessions;
