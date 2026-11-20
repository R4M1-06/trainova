import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field.jsx";
import { verifyLogin } from "../data/localAuth.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Login({ onSuccess }) {
  const { t } = useLang();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (pending) return;
    // Errors are translation keys so they follow the language toggle.
    const err = {};
    if (!form.identifier.trim()) err.identifier = "err.identifier";
    if (!form.password) err.password = "err.password";
    setErrors(err);
    if (Object.keys(err).length) return;

    setPending(true);
    try {
      const email = await verifyLogin(form.identifier, form.password);
      if (email) onSuccess(email);
      else setErrors({ form: "err.badLogin" });
    } catch {
      setErrors({ form: "err.loginFailed" });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="card narrow auth-card">
      <h1>{t("login.title")}</h1>
      <form onSubmit={submit} noValidate>
        <Field label={t("login.identifier")} name="identifier" autoComplete="username" value={form.identifier} onChange={change} error={errors.identifier} />
        <Field label={t("login.password")} name="password" type="password" autoComplete="current-password" value={form.password} onChange={change} error={errors.password} />
        {errors.form && <p className="error" role="alert">{t(errors.form)}</p>}
        <button className="btn" disabled={pending}>{t("login.submit")}</button>
      </form>
      <p>{t("login.noAccount")} <Link to="/register">{t("login.create")}</Link></p>
    </section>
  );
}
