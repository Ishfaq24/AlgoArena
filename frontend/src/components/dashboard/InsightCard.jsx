function InsightCard({ text }) {
  return (
    <div className="bg-primary text-primary-content rounded-xl p-5 shadow">
      <h2 className="text-lg font-semibold mb-1">AI Insight</h2>
      <p className="opacity-90">{text}</p>
    </div>
  );
}

export default InsightCard;
