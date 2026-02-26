import axiosInstance from "../lib/axios";

export const dashboardApi = {
  getDashboardData: async () => {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
  },

  updateStats: async (stats) => {
    const response = await axiosInstance.put("/dashboard/stats", { stats });
    return response.data;
  },

  addActivity: async (action, target, icon) => {
    const response = await axiosInstance.post("/dashboard/activity", {
      action,
      target,
      icon,
    });
    return response.data;
  },

  updateGoals: async (goals) => {
    const response = await axiosInstance.put("/dashboard/goals", { goals });
    return response.data;
  },
};