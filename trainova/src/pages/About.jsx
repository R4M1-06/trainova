import { useLang } from "../i18n/LanguageContext.jsx";

export default function About() {
  const { t } = useLang();
  return (
    <section className="card narrow">
      <h1>{t("about.title")}</h1>
      <p>{t("about.p1")}</p>
      <p>{t("about.p2")}</p>
      <p className="muted">{t("about.builtBy")}</p>
      <p>{t("about.team")}</p>
    </section>
  );
}
