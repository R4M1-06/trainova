import { NavLink } from "react-router-dom";

const links = [
  ["/", "Workouts"],
  ["/login", "Login"],
  ["/register", "Register"],
  ["/about", "About"],
];

export default function Navbar() {
  return (
    <header className="nav">
      <span className="brand">Trainova</span>
      <nav>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
