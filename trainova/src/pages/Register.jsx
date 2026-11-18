import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field.jsx";
import { registerAccount } from "../data/localAuth.js";

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (pending) return;
    const err = {};
    if (!form.username.trim() || form.username.includes("@")) err.username = "Enter a username without @.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) err.email = "Enter a valid email address.";
    if (form.password.length < 6) err.password = "Use at least 6 characters.";
    if (form.confirm !== form.password) err.confirm = "Passwords don’t match.";
    setErrors(err);
    if (Object.keys(err).length) return;

    setPending(true);
    try {
      const errors = await registerAccount(form.username, form.email, form.password);
      if (Object.keys(errors).length) setErrors(errors);
      else onSuccess(form.email);
    } catch {
      setErrors({ form: "Could not save your browser account. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="card narrow auth-card">
      <h1>Create account</h1>
      <p className="muted">This demo account is saved in this browser.</p>
      <form onSubmit={submit} noValidate>
        <Field label="Username" name="username" autoComplete="username" value={form.username} onChange={change} error={errors.username} />
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={change} error={errors.email} />
        <Field label="Password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={change} error={errors.password} />
        <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={change} error={errors.confirm} />
        {errors.form && <p className="error" role="alert">{errors.form}</p>}
        <button className="btn" disabled={pending}>Create account</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </section>
  );
}
