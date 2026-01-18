function ProgressBar({ label, value, total }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}/{total}</span>
      </div>
      <progress className="progress progress-primary" value={value} max={total} />
    </div>
  );
}

export default function GoalsSection({ goals }) {
  return (
    <div className="bg-base-100 p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">Monthly Goals</h2>
      <ProgressBar label="Study Hours" value={goals.studyHours[0]} total={goals.studyHours[1]} />
      <ProgressBar label="Lessons Completed" value={goals.lessons[0]} total={goals.lessons[1]} />
      <ProgressBar label="Quizzes Passed" value={goals.quizzes[0]} total={goals.quizzes[1]} />
      <ProgressBar label="Assignments" value={goals.assignments[0]} total={goals.assignments[1]} />
    </div>
  );
}
