import { NavLink } from "react-router-dom";

const links = [
  ["/", "Workouts"],
  ["/about", "About"],
];

export default function Navbar({ signedIn, onLogout }) {
  return (
    <header className="nav">
      <span className="brand">Trainova</span>
      {signedIn && <nav>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
            {label}
          </NavLink>
        ))}
        <button className="logout" type="button" onClick={onLogout}>Log out</button>
      </nav>}
    </header>
  );
}
