import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../components/Field.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters.";
    setErrors(err);
    if (Object.keys(err).length === 0) navigate("/"); // Milestone 1: no real auth yet
  };

  return (
    <section className="card narrow">
      <h1>Log in</h1>
      <form onSubmit={submit} noValidate>
        <Field label="Email" name="email" type="email" value={form.email} onChange={change} error={errors.email} />
        <Field label="Password" name="password" type="password" value={form.password} onChange={change} error={errors.password} />
        <button className="btn" type="submit">Log in</button>
      </form>
    </section>
  );
}
