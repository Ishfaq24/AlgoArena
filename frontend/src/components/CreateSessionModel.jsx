import React from 'react';

const CreateSessionModal = ({ isOpen, onClose, userPath }) => {
  if (!isOpen) return null;

  const topics = {
    'JEE/NEET': [
      'Physics: Optics',
      'Organic Chemistry',
      'Biology: Genetics',
      'Math: Calculus',
    ],
    'UPSC/Civil Services': [
      'History: Freedom Struggle',
      'Polity: Fundamental Rights',
      'Ethics & Integrity',
      'Current Affairs',
    ],
    'K-12 (Middle)': [
      'Class 6 Math',
      'Class 7 Science',
      'Civics Basics',
      'English Literature',
    ],
    'K-12 (Senior)': [
      'Physics: Electromagnetism',
      'Accountancy',
      'Macroeconomics',
      'English Writing',
    ],
    'Job Exams (Banking/SSC)': [
      'Quantitative Aptitude',
      'Reasoning Ability',
      'General Awareness',
      'English Vocab',
    ],
    'Professional/Tech': [
      'System Design',
      'ML Algorithms',
      'DevOps',
      'Cloud Architecture',
    ],
  }[userPath] || ['General Knowledge', 'Mental Ability', 'English'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-base-200 rounded-[2.5rem] w-full max-w-xl shadow-2xl border border-white/5 overflow-hidden animate-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white">
              Start New Session
            </h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1">
              {userPath} Curriculum
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-white/30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-10">
          {/* Session Types */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                id: 'course',
                label: 'Interactive Course',
                icon: '📖',
                desc: 'Step-by-step concepts',
              },
              {
                id: 'mcq',
                label: 'Topic Practice',
                icon: '🎯',
                desc: 'Practice for mastery',
              },
              {
                id: 'mock',
                label: 'Simulated Exam',
                icon: '🏆',
                desc: 'Full-length testing',
              },
              {
                id: 'notes',
                label: 'Smart Revision',
                icon: '⚡',
                desc: 'AI-generated cards',
              },
            ].map(type => (
              <button
                key={type.id}
                className="p-5 rounded-3xl border border-white/5 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                  {type.icon}
                </span>
                <span className="text-base font-bold block text-white">
                  {type.label}
                </span>
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
                  {type.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Recommended Topics */}
          <div>
            <label className="block text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-4">
              Recommended for {userPath}
            </label>
            <div className="flex flex-wrap gap-2.5">
              {topics.map(topic => (
                <button
                  key={topic}
                  className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-white/60 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white/5 border-t border-white/5">
          <button className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-base-100 font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all">
            Begin Personalized Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSessionModal;
