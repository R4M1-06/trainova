import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field.jsx";
import { registerAccount } from "../data/localAuth.js";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Register({ onSuccess }) {
  const { t } = useLang();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (pending) return;
    // Errors are translation keys so they follow the language toggle.
    const err = {};
    if (!form.username.trim() || form.username.includes("@")) err.username = "err.username";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) err.email = "err.email";
    if (form.password.length < 6) err.password = "err.passwordShort";
    if (form.confirm !== form.password) err.confirm = "err.confirm";
    setErrors(err);
    if (Object.keys(err).length) return;

    setPending(true);
    try {
      const errors = await registerAccount(form.username, form.email, form.password);
      if (Object.keys(errors).length) setErrors(errors);
      else onSuccess(form.email);
    } catch {
      setErrors({ form: "err.registerFailed" });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="card narrow auth-card">
      <h1>{t("reg.title")}</h1>
      <p className="muted">{t("reg.note")}</p>
      <form onSubmit={submit} noValidate>
        <Field label={t("reg.username")} name="username" autoComplete="username" value={form.username} onChange={change} error={errors.username} />
        <Field label={t("reg.email")} name="email" type="email" autoComplete="email" value={form.email} onChange={change} error={errors.email} />
        <Field label={t("reg.password")} name="password" type="password" autoComplete="new-password" value={form.password} onChange={change} error={errors.password} />
        <Field label={t("reg.confirm")} name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={change} error={errors.confirm} />
        {errors.form && <p className="error" role="alert">{t(errors.form)}</p>}
        <button className="btn" disabled={pending}>{t("reg.submit")}</button>
      </form>
      <p>{t("reg.haveAccount")} <Link to="/login">{t("reg.login")}</Link></p>
    </section>
  );
}
