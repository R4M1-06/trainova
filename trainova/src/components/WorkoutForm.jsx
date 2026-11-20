import { useState } from "react";
import Field from "./Field.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

// "auto" means: let the list work the status out from the previous session of the same exercise.
const statusOptions = ["auto", "progress", "plateau", "deload"];

function dateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export default function WorkoutForm({ workout, muscles, onSave, onCancel }) {
  const { t, tx } = useLang();
  const [form, setForm] = useState({
    exercise: workout?.exercise ?? "",
    date: workout?.date ?? dateInputValue(),
    muscle: workout?.muscle ?? muscles[0],
    weight: String(workout?.weight ?? ""),
    sets: workout?.sets.join(", ") ?? "",
    status: workout?.status ?? "auto",
  });
  // Errors are stored as translation keys so they follow the language toggle.
  const [errors, setErrors] = useState({});
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const errors = {};
    const weight = Number(form.weight);
    const sets = form.sets.split(",").map((value) => Number(value.trim()));
    if (!form.exercise.trim()) errors.exercise = "err.exercise";
    if (!isValidDate(form.date)) errors.date = "err.date";
    if (!form.weight.trim() || !Number.isFinite(weight) || weight < 0) errors.weight = "err.weight";
    if (!/^\s*\d+\s*(,\s*\d+\s*)*$/.test(form.sets) || sets.some((reps) => !Number.isSafeInteger(reps) || reps < 1)) {
      errors.sets = "err.sets";
    }
    const estimate = weight * (1 + sets.reduce((best, reps) => Math.max(best, reps), 0) / 30);
    if (!errors.weight && !errors.sets && !Number.isFinite(estimate)) errors.weight = "err.weightBig";
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
      <h2 id="workout-form-title">{workout ? t("form.editTitle") : t("form.addTitle")}</h2>
      <form onSubmit={submit} noValidate>
        <Field label={t("form.exercise")} name="exercise" value={form.exercise} onChange={change} error={errors.exercise} />
        <div className="controls">
          <Field label={t("form.date")} name="date" type="date" value={form.date} onChange={change} error={errors.date} />
          <label className="field">{t("form.muscle")}
            <select name="muscle" value={form.muscle} onChange={change}>
              {muscles.map((muscle) => <option key={muscle} value={muscle}>{tx("muscle", muscle)}</option>)}
            </select>
          </label>
          <Field label={t("form.weight")} name="weight" type="number" min="0" step="any" value={form.weight} onChange={change} error={errors.weight} />
          <label className="field">{t("form.status")}
            <select name="status" value={form.status} onChange={change}>
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status === "auto" ? t("form.statusAuto") : tx("status", status)}</option>
              ))}
            </select>
          </label>
        </div>
        <Field label={t("form.sets")} name="sets" value={form.sets} onChange={change} error={errors.sets} />
        <div className="actions">
          <button className="btn" type="submit">{t("form.save")}</button>
          <button className="btn secondary" type="button" onClick={onCancel}>{t("form.cancel")}</button>
        </div>
      </form>
    </section>
  );
}
