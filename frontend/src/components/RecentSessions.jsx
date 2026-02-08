
import React from 'react';

const activities = [
  { id: 1, action: 'Mastered Topic', target: 'Binary Search Trees', time: '1h ago', icon: '🌲', color: 'bg-green-500/20 text-green-400' },
  { id: 2, action: 'Generated Notes', target: 'Graph Algorithms', time: 'Yesterday', icon: '📝', color: 'bg-blue-500/20 text-blue-400' },
  { id: 3, action: 'AI Session Review', target: 'Space Complexity', time: '2 days ago', icon: '🧠', color: 'bg-purple-500/20 text-purple-400' },
];

const RecentSessions= () => {
  return (
    <div className="bg-base-200 rounded-3xl p-8 border border-white/5 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-8">Pulse Feed</h3>
      <div className="space-y-8">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-5 items-start group">
            <div className={`w-12 h-12 shrink-0 rounded-2xl ${activity.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {activity.icon}
            </div>
            <div className="flex-1 border-b border-white/5 pb-6 group-last:border-0 group-last:pb-0">
              <div className="flex justify-between items-start">
                <p className="text-base font-bold text-white group-hover:text-primary transition-colors">{activity.action}</p>
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{activity.time}</span>
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
