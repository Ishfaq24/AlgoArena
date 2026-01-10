import { Link } from "react-router-dom";

function LearnCard({ title, description, to, icon: Icon }) {
  return (
    <Link
      to={to}
      className="bg-base-100 border border-base-300 rounded-xl p-6
                 hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="size-6 text-primary" />}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      <p className="text-sm text-base-content/70">
        {description}
      </p>
    </Link>
  );
}

export default LearnCard;
