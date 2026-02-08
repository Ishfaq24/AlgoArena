
import React from 'react';

const sessions = [
  { id: 's1', title: 'Organic Chemistry: Hydrocarbons', subject: 'Science', type: 'Course', progress: 65, lastActive: '12m ago', status: 'active' },
  { id: 's2', title: 'UPSC Mock: Indian Polity', subject: 'Civics', type: 'Mock Test', progress: 15, lastActive: '1h ago', status: 'paused' },
  { id: 's3', title: 'CBSE 10th: Quadratic Equations', subject: 'Math', type: 'MCQ', progress: 88, lastActive: 'Yesterday', status: 'paused' },
];

const ActiveSessions= () => {
  return (
    <div className="bg-base-200 rounded-3xl p-8 border border-white/5 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white">Active Learning</h3>
        <button className="text-xs text-primary font-bold uppercase tracking-widest hover:opacity-80">Timeline</button>
      </div>
      <div className="space-y-6">
        {sessions.map((session) => (
          <div key={session.id} className="p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary/70">{session.subject} • {session.type}</span>
                <h4 className="font-bold text-base text-white group-hover:text-primary transition-colors leading-tight">{session.title}</h4>
              </div>
              <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${session.status === 'active' ? 'bg-primary' : 'bg-white/20'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${session.status === 'active' ? 'bg-primary' : 'bg-white/20'}`}></span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs font-semibold text-white/40 mb-2">
                <span>{session.progress}% Complete</span>
                <span>{session.lastActive}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ease-out ${session.status === 'active' ? 'bg-primary shadow-[0_0_12px_rgba(34,197,94,0.4)]' : 'bg-white/20'}`} 
                  style={{ width: `${session.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSessions;
