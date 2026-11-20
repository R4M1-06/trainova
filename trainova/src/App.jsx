import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import WorkoutList from "./pages/WorkoutList.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import { currentSession, sessionKey } from "./data/localAuth.js";
import { LanguageProvider, useLang } from "./i18n/LanguageContext.jsx";

function NotFound() {
  const { t } = useLang();
  return (
    <section className="card narrow">
      <p>{t("nf.text")}</p>
      <Link className="btn" to="/">{t("nf.back")}</Link>
    </section>
  );
}

function AppShell() {
  const [session, setSession] = useState(currentSession);

  useEffect(() => {
    const syncSession = () => setSession(currentSession());
    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  function signIn(email) {
    const normalizedEmail = email.trim().toLowerCase();
    localStorage.setItem(sessionKey, normalizedEmail);
    setSession(normalizedEmail);
  }

  function signOut() {
    localStorage.removeItem(sessionKey);
    setSession(null);
  }

  return (
    <>
      <Navbar signedIn={!!session} onLogout={signOut} />
      <main className="page">
        {session ? (
          <Routes>
            <Route path="/" element={<WorkoutList key={session} account={session} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onSuccess={signIn} />} />
            <Route path="/register" element={<Register onSuccess={signIn} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}
