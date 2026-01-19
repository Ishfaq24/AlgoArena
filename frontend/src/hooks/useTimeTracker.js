import { useEffect, useRef } from "react";
import axios from "../api/axios";

export default function useTimeTracker(pageName) {
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const sendTime = async () => {
      if (!startTimeRef.current) return;

      const timeSpent = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );

      if (timeSpent < 1) return; // 🔥 critical

      try {
        await axios.post("/usage/track", {
          page: pageName,
          timeSpent,
        });
      } catch (err) {
        console.error("Time tracking failed", err);
      }

      startTimeRef.current = Date.now(); // reset
    };

    const handleVisibility = () => {
      if (document.hidden) {
        sendTime();
      } else {
        startTimeRef.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", sendTime);

    return () => {
      sendTime();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", sendTime);
    };
  }, [pageName]);
}
