import { useState } from "react";
import Field from "./Field.jsx";

export default function WorkoutForm({ workout, muscles, onSave, onCancel }) {
  const [form, setForm] = useState({
    exercise: workout?.exercise ?? "",
    date: workout?.date ?? new Date().toLocaleDateString("en-CA"),
    muscle: workout?.muscle ?? muscles[0],
    weight: String(workout?.weight ?? ""),
    sets: workout?.sets.join(", ") ?? "",
    status: workout?.status ?? "progress",
  });
  const [errors, setErrors] = useState({});
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const errors = {};
    const weight = Number(form.weight);
    const sets = form.sets.split(",").map((value) => Number(value.trim()));
    if (!form.exercise.trim()) errors.exercise = "Enter an exercise name.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date) || !Number.isFinite(Date.parse(form.date))) errors.date = "Choose a valid date.";
    if (!form.weight.trim() || !Number.isFinite(weight) || weight < 0) errors.weight = "Enter a weight of 0 kg or more.";
    if (!/^\s*\d+\s*(,\s*\d+\s*)*$/.test(form.sets) || sets.some((reps) => !Number.isSafeInteger(reps) || reps < 1)) {
      errors.sets = "Enter positive whole-number reps separated by commas, e.g. 8, 8, 6.";
    }
    const estimate = weight * (1 + sets.reduce((best, reps) => Math.max(best, reps), 0) / 30);
    if (!errors.weight && !errors.sets && !Number.isFinite(estimate)) errors.weight = "Enter a smaller weight.";
    setErrors(errors);
    if (Object.keys(errors).length) return;
    onSave({
      exercise: form.exercise.trim(), date: form.date, muscle: form.muscle,
      weight, sets, status: form.status,
      e1rm: Number(estimate.toFixed(1)),
    });
  }

  return (
    <section className="card workout-form" aria-labelledby="workout-form-title">
      <h2 id="workout-form-title">{workout ? "Edit workout" : "Add workout"}</h2>
      <form onSubmit={submit} noValidate>
        <Field label="Exercise" name="exercise" value={form.exercise} onChange={change} error={errors.exercise} />
        <div className="controls">
          <Field label="Date" name="date" type="date" value={form.date} onChange={change} error={errors.date} />
          <label className="field">Muscle
            <select name="muscle" value={form.muscle} onChange={change}>
              {muscles.map((muscle) => <option key={muscle}>{muscle}</option>)}
            </select>
          </label>
          <Field label="Weight (kg; use 0 for bodyweight)" name="weight" type="number" min="0" step="any" value={form.weight} onChange={change} error={errors.weight} />
          <label className="field">Status
            <select name="status" value={form.status} onChange={change}>
              {["progress", "plateau", "deload"].map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>
        <Field label="Reps per set (e.g. 8, 8, 6)" name="sets" value={form.sets} onChange={change} error={errors.sets} />
        <div className="actions">
          <button className="btn" type="submit">Save workout</button>
          <button className="btn secondary" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </section>
  );
}
