import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { dashboardApi } from "../api/dashboard";

export const useDashboard = () => {
  const result = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getDashboardData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return result;
};

export const useUpdateStats = () => {
  const queryClient = useQueryClient();
  
  const result = useMutation({
    mutationKey: ["updateStats"],
    mutationFn: dashboardApi.updateStats,
    onSuccess: () => {
      toast.success("Stats updated!");
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to update stats"),
  });

  return result;
};

export const useAddActivity = () => {
  const queryClient = useQueryClient();
  
  const result = useMutation({
    mutationKey: ["addActivity"],
    mutationFn: ({ action, target, icon }) => dashboardApi.addActivity(action, target, icon),
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to add activity"),
  });

  return result;
};

export const useUpdateGoals = () => {
  const queryClient = useQueryClient();
  
  const result = useMutation({
    mutationKey: ["updateGoals"],
    mutationFn: dashboardApi.updateGoals,
    onSuccess: () => {
      toast.success("Goals updated!");
      queryClient.invalidateQueries(["dashboard"]);
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to update goals"),
  });

  return result;
};