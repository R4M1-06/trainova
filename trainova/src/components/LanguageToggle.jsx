import { useLang } from "../i18n/LanguageContext.jsx";

// Glass segmented switch. It keeps a fixed EN | عربي order (direction: ltr in CSS)
// so the sliding highlight behaves the same in both languages.
export default function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={t("lang.label")} data-lang={lang}>
      <button type="button" lang="en" className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      <button type="button" lang="ar" className={lang === "ar" ? "on" : ""} aria-pressed={lang === "ar"} onClick={() => setLang("ar")}>عربي</button>
    </div>
  );
}
