import { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/Field.jsx";
import { verifyLogin } from "../data/localAuth.js";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (pending) return;
    const err = {};
    if (!form.identifier.trim()) err.identifier = "Enter your username or email.";
    if (!form.password) err.password = "Enter your password.";
    setErrors(err);
    if (Object.keys(err).length) return;

    setPending(true);
    try {
      const email = await verifyLogin(form.identifier, form.password);
      if (email) onSuccess(email);
      else setErrors({ form: "Incorrect username, email or password." });
    } catch {
      setErrors({ form: "Could not access your browser account. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="card narrow auth-card">
      <h1>Log in</h1>
      <form onSubmit={submit} noValidate>
        <Field label="Username or email" name="identifier" autoComplete="username" value={form.identifier} onChange={change} error={errors.identifier} />
        <Field label="Password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={change} error={errors.password} />
        {errors.form && <p className="error" role="alert">{errors.form}</p>}
        <button className="btn" disabled={pending}>Log in</button>
      </form>
      <p>Don’t have an account? <Link to="/register">Create an account</Link></p>
    </section>
  );
}
