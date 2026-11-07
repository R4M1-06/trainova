import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../components/Field.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters.";
    if (form.confirm !== form.password) err.confirm = "Passwords don’t match.";
    setErrors(err);
    if (Object.keys(err).length === 0) navigate("/login"); // Milestone 1: no real account yet
  };

  return (
    <section className="card narrow">
      <h1>Create account</h1>
      <form onSubmit={submit} noValidate>
        <Field label="Name" name="name" value={form.name} onChange={change} error={errors.name} />
        <Field label="Email" name="email" type="email" value={form.email} onChange={change} error={errors.email} />
        <Field label="Password" name="password" type="password" value={form.password} onChange={change} error={errors.password} />
        <Field label="Confirm password" name="confirm" type="password" value={form.confirm} onChange={change} error={errors.confirm} />
        <button className="btn" type="submit">Create account</button>
      </form>
    </section>
  );
}
