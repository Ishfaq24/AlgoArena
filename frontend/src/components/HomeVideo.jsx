/* eslint-disable no-unused-vars */
import { useState } from "react";
import { generateVideo, getVideoUrl } from "../api";
import VideoPlayer from "./VideoPlayer";
import Loader from "./LoaderVideo";
import Hero from "./HeroVideo";
import Navbar from "./Navbar";

function HomeVideo() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setVideoUrl(null);

    try {
      const res = await generateVideo(topic.trim());
      if (res.status === "success") {
        setVideoUrl(getVideoUrl() + `?t=${Date.now()}`);
      } else {
        const detail =
          res.error_details || res.error || res.message || "Unknown error";
        alert("Video generation failed: " + detail);
      }
    } catch (err) {
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fixed Navbar */}
      <div
        className="fixed-nav-wrapper"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Navbar />
      </div>

      {/* Main Content */}
      <div
        className="app-root"
        style={{
          marginTop: "80px", // push content below navbar
        }}
      >
        <Hero />

        {/* Main Layout */}
        <main
          className="stacked-shell"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            padding: "40px 20px",
          }}
        >
          {/* Input Panel */}
          <section
            className="panel input-panel centered-panel"
            style={{
              width: "100%",
              maxWidth: "1000px",
              marginBottom: "10px",
            }}
          >
            <div className="panel-header">
              <span className="panel-badge">
                AlgoArena • Code Together
              </span>
              <h2>Generate an animated explainer</h2>
              <p>
                Describe any concept and we will craft a high-quality Manim
                video to help you or your students understand it faster.
              </p>
            </div>

            <div className="input-row">
              <input
                className="topic-input"
                type="text"
                placeholder="e.g. Binary Search, Basic Arm Anatomy"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
              />
              <button
                className="primary-button"
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}
              >
                {loading ? "Generating…" : "Generate Video"}
              </button>
            </div>

            {loading && (
              <div className="status-row">
                <Loader />
                <span className="status-text">
                  Rendering with Manim • This may take a minute
                </span>
              </div>
            )}
          </section>

          {/* Video Preview Panel */}
          <section
            className="panel preview-panel large-video-panel"
            style={{
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            <div className="panel-header text-center">
              <h2>Live preview</h2>
              <p>
                Your generated lecture will appear here automatically.
              </p>
            </div>

            <div
              className="video-container"
              style={{
                width: "100%",
                minHeight: "300px",
              }}
            >
              {videoUrl ? (
                <VideoPlayer videoUrl={videoUrl} />
              ) : (
                <div className="preview-placeholder">
                  <div className="preview-glow" />
                  <p>
                    Enter a topic and click{" "}
                    <span>Generate Video</span> to see your first animated
                    explanation.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default HomeVideo;