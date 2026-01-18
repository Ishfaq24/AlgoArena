function generateAIInsight(data) {
  if (data.rank.change > 0 && data.today.focusedTime > 90) {
    return "You’re climbing the leaderboard due to consistent focused study. Maintain this pace for 3 more days to enter top 15%.";
  }

  if (data.today.timeSpent > data.today.focusedTime) {
    return "You spent time studying today, but focus dropped. Try shorter sessions with breaks.";
  }

  return "Focus on revising weak areas today to improve test consistency.";
}
export { generateAIInsight };