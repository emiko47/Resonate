import { Link } from "react-router-dom";
import Icon from "./Icon";
export default function BackButton({
  to = "/",
  label = "Back",
  onClick,
  className = "",
}) {
  return onClick ? (
    <button
      type="button"
      className={`screen-back ${className}`}
      onClick={onClick}
    >
      <Icon name="left" size={16} />
      {label}
    </button>
  ) : (
    <Link to={to} className={`screen-back ${className}`}>
      <Icon name="left" size={16} />
      {label}
    </Link>
  );
}
