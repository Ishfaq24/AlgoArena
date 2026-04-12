function HeroVideo() {
  return (
    <header className="hero">
      <div className="w-full max-w-7xl self-center rounded-[32px] border border-white/10 bg-slate-950/80 px-6 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-8 lg:px-10 lg:py-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="hero-pill">
            <span className="hero-pill-icon">⚡</span>
            <span>Real-time learning collaboration</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-accent">Learn Faster,</span>
            <br />
            Understand Better
          </h1>

          <p className="hero-subtitle mx-auto max-w-2xl lg:mx-0">
            Turn any topic into a cinematic explanation. Generate animated
            video lectures and AI-crafted notes aligned with your syllabus.
          </p>

          <div className="hero-tags justify-center lg:justify-start">
            <span className="tag tag-active">AI Notes Generator</span>
            <span className="tag">Animated Video Lectures</span>
            <span className="tag">Personalized Study Paths</span>
          </div>

          <div className="hero-metrics justify-center lg:justify-start">
            <div className="metric">
              <div className="metric-value">10K+</div>
              <div className="metric-label">Active Users</div>
            </div>
            <div className="metric">
              <div className="metric-value">50K+</div>
              <div className="metric-label">Sessions</div>
            </div>
            <div className="metric">
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroVideo;
