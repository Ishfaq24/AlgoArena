import React from "react";

const nodes = [
  {
    id: 1,
    title: "Entry Layer",
    description: "Cross-Device Sync",
    items: ["Global Identity", "Secure Auth"],
  },
  {
    id: 2,
    title: "Domain Logic",
    description: "Path Evaluation",
    items: ["Grade 6-12 Map", "Exam Blueprints"],
  },
  {
    id: 3,
    title: "Resource Engine",
    description: "Multi-Format Fetch",
    items: ["Videos/PDFs", "Live Feed"],
  },
  {
    id: 4,
    title: "Polymath AI",
    description: "Domain Intelligence",
    items: ["Step-by-Step RAG", "Fact Verification"],
  },
  {
    id: 5,
    title: "Enforcement",
    description: "Quality Gate",
    items: ["Topic Accuracy", "Safe Response"],
  },
  {
    id: 6,
    title: "Global Insights",
    description: "Universal Analytics",
    items: ["Skill Clumping", "Predictive Scoring"],
  },
];

const ArchitectureViz = () => {
  return (
    <div className="bg-base-200 rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />

      {/* Header */}
      <div className="mb-8 relative z-10 flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-white">
            Unified Learning Workflow
          </h3>
          <p className="text-sm text-white/40 mt-1">
            Tracing how we deliver personalized content across 12+ domains.
          </p>
        </div>

        <div className="hidden sm:block text-right">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest">
            Active nodes: 14
          </p>
          <p className="text-[10px] text-white/20 uppercase font-black">
            Cluster: GLOBAL_ASIA_01
          </p>
        </div>
      </div>

      {/* Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 relative z-10">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="relative p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 transition-all group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-10 h-10 bg-primary/10 rounded-bl-2xl flex items-center justify-center font-black text-primary text-xs group-hover:bg-primary group-hover:text-base-100 transition-all">
              {node.id}
            </div>

            <h4 className="font-bold text-sm text-white mb-2 group-hover:text-primary transition-colors">
              {node.title}
            </h4>

            <p className="text-[11px] text-white/50 mb-4 leading-relaxed">
              {node.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {node.items.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-bold uppercase tracking-wider bg-white/10 border border-white/5 px-2 py-1 rounded-md text-white/40 group-hover:text-primary/70 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-6 items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 12}`}
                alt="User"
                className="w-10 h-10 rounded-full border-4 border-base-200"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-base-200 bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary">
              +2k
            </div>
          </div>
          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
            Studying Now
          </span>
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-2xl">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </div>
          <span className="text-xs font-black text-primary uppercase tracking-widest">
            Omni-System: ONLINE
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureViz;
