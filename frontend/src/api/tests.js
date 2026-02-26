import axiosInstance from "../lib/axios";

export const testApi = {
  generateTest: async (domain, topic, count = 10) => {
    const response = await axiosInstance.post("/tests/generate", {
      domain,
      topic,
      count,
    });
    return response.data;
  },
};