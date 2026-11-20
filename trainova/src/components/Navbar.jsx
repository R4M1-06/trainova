import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

const links = [
  ["/", "nav.workouts"],
  ["/about", "nav.about"],
];

export default function Navbar({ signedIn, onLogout }) {
  const { t } = useLang();
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
          <div className="nav-actions">
            <LanguageToggle />
            {signedIn && (
              <button
                type="button"
                className={`burger${open ? " open" : ""}`}
                aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
                aria-expanded={open}
                aria-controls="main-menu"
                onClick={() => setOpen(!open)}
              >
                <i /><i /><i />
              </button>
            )}
          </div>
        </div>
        {signedIn && (
          <div id="main-menu" className={`menu${open ? " open" : ""}`}>
            <nav className="menu-inner" aria-label={t("nav.main")}>
              {links.map(([to, key]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t(key)}
                </NavLink>
              ))}
              <button className="logout" type="button" onClick={() => setConfirming(true)}>
                {t("nav.logout")}
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
            <h2 id="logout-title">{t("nav.logoutTitle")}</h2>
            <p className="muted">{t("nav.logoutText")}</p>
            <div className="actions">
              <button className="btn" type="button" onClick={confirmLogout}>{t("nav.logout")}</button>
              <button
                className="btn secondary"
                type="button"
                autoFocus
                onClick={() => setConfirming(false)}
              >
                {t("nav.stay")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
