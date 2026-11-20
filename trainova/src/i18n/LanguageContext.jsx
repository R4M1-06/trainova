import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { displayNames, translations } from "./translations.js";

const storageKey = "trainova.lang.v1";
const LanguageContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "en" || saved === "ar") return saved;
  } catch {
    // storage unavailable: fall through to English
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const first = useRef(true);

  // Keeps <html lang dir>, the tab title and the saved choice in sync, then plays a short fade
  // so the switch feels continuous. No remount happens, so forms and filters keep their state.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = translations[lang]["app.title"];
    try { localStorage.setItem(storageKey, lang); } catch { /* ignore */ }

    if (first.current) { first.current = false; return; }
    root.classList.add("lang-fade");
    const timer = setTimeout(() => root.classList.remove("lang-fade"), 350);
    return () => clearTimeout(timer);
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang];
    const names = displayNames[lang];
    const lower = Object.fromEntries(Object.entries(names).map(([key, text]) => [key.toLowerCase(), text]));
    // t("key", { n: 3 }) replaces {n}. Unknown keys return the key itself.
    const t = (key, vars) => {
      const text = dict[key] ?? translations.en[key] ?? key;
      return vars ? text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "") : text;
    };
    // tx("muscle", "Chest") shows a stored English value in the current language.
    // The lookup ignores case and extra spaces, so a typed "bench press" is still recognised.
    const tx = (prefix, stored) => lower[`${prefix}.${String(stored).trim()}`.toLowerCase()] ?? stored;
    return { lang, setLang, t, tx };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
