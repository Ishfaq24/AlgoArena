import React from "react";
import AlgoArena from "../assets/AlgoArenaPerfectIntro.mp4";

const DashboardVideo = () => {
  return (
    <div style={styles.card}>
      <video
        style={styles.video}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={AlgoArena} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const styles = {
  card: {
    width: "100%",
    height: "400px",
    background: "#000",
    borderRadius: "18px",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};

export default DashboardVideo;
