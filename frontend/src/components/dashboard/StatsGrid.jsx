function StatCard({ label, value, trend }) {
  return (
    <div className="bg-base-100 p-4 rounded-xl shadow">
      <p className="text-sm opacity-70">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      {trend !== undefined && (
        <p className={`text-sm ${trend >= 0 ? "text-success" : "text-error"}`}>
          {trend >= 0 ? "⬆" : "⬇"} {Math.abs(trend)}%
        </p>
      )}
    </div>
  );
}

export default function StatsGrid({ stats, trends }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Study Hours" value={`${stats.studyHours}h`} trend={trends.studyChange} />
      <StatCard label="Day Streak" value={stats.streak} />
      <StatCard label="Goals Met" value={`${stats.goalsMet}%`} />
      <StatCard label="Achievements" value={stats.achievements} />
    </div>
  );
}
