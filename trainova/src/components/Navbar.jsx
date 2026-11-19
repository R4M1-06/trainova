import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["/", "Workouts"],
  ["/about", "About"],
];

export default function Navbar({ signedIn, onLogout }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!signedIn) {
      setOpen(false);
      setConfirming(false);
    }
  }, [signedIn]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      if (confirming) setConfirming(false);
      else setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirming]);

  function confirmLogout() {
    setConfirming(false);
    setOpen(false);
    onLogout();
  }

  return (
    <>
      <header className="nav">
        <div className="nav-bar">
          <span className="brand">Trainova</span>
          {signedIn && (
            <button
              type="button"
              className={`burger${open ? " open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="main-menu"
              onClick={() => setOpen(!open)}
            >
              <i /><i /><i />
            </button>
          )}
        </div>
        {signedIn && (
          <div id="main-menu" className={`menu${open ? " open" : ""}`}>
            <nav className="menu-inner" aria-label="Main">
              {links.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {label}
                </NavLink>
              ))}
              <button className="logout" type="button" onClick={() => setConfirming(true)}>
                Log out
              </button>
            </nav>
          </div>
        )}
      </header>

      {confirming && (
        <div className="modal-backdrop" onClick={() => setConfirming(false)}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="logout-title">Log out of Trainova?</h2>
            <p className="muted">You will need to sign in again to see your workouts.</p>
            <div className="actions">
              <button className="btn" type="button" onClick={confirmLogout}>Log out</button>
              <button
                className="btn secondary"
                type="button"
                autoFocus
                onClick={() => setConfirming(false)}
              >
                Stay signed in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
