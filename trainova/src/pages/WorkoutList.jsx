import { useEffect, useMemo, useRef, useState } from "react";
import { workouts as mockWorkouts } from "../data/mockWorkouts.js";
import WorkoutCard from "../components/WorkoutCard.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";
import WorkoutPlanner from "../components/WorkoutPlanner.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

const statuses = ["all", "progress", "plateau", "deload"];
const sortOptions = ["date-desc", "date-asc", "weight-desc", "weight-asc", "e1rm-desc", "e1rm-asc"];
const formMuscles = [...new Set(mockWorkouts.map((workout) => workout.muscle))];

function loadWorkouts(storageKey) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    return Array.isArray(saved) ? saved : mockWorkouts;
  } catch {
    return mockWorkouts;
  }
}

// Used when the form status is "auto": compare with the latest earlier session of the same exercise.
// first time -> progress, higher est. 1RM -> progress, weight dropped 5%+ -> deload, otherwise plateau.
function deriveStatus(values, workouts, ignoreId) {
  const name = values.exercise.trim().toLowerCase();
  const previous = workouts
    .filter((w) => w.id !== ignoreId && w.exercise.trim().toLowerCase() === name && w.date <= values.date)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!previous) return "progress";
  if (values.e1rm > previous.e1rm) return "progress";
  if (previous.weight > 0 && values.weight <= previous.weight * 0.95) return "deload";
  return "plateau";
}

const scrollBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

export default function WorkoutList({ account }) {
  const { t, tx } = useLang();
  const storageKey = `trainova.workouts.v1.${account}`;

  // --- state: data
  const [workouts, setWorkouts] = useState(() => loadWorkouts(storageKey));

  // --- state: add/edit/delete panels and feedback (message and saveError are translation keys)
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  // --- state: search, filters, sort
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("date-desc");

  // --- refs used to bring panels into view
  const formRef = useRef(null);
  const deleteRef = useRef(null);
  const messageRef = useRef(null);

  // --- derived data
  const muscles = ["all", ...new Set(workouts.map((w) => w.muscle))];
  // If the selected muscle no longer exists (its last workout was deleted), fall back to "all".
  const activeMuscle = muscles.includes(muscle) ? muscle : "all";

  // Filter, then search, then sort. All three work together.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = workouts.filter(
      (w) =>
        (activeMuscle === "all" || w.muscle === activeMuscle) &&
        (status === "all" || w.status === status) &&
        // search matches the stored name and the name shown in the current language
        [w.exercise, tx("exercise", w.exercise)].some((name) => name.toLowerCase().includes(q))
    );
    const [key, dir] = sort.split("-");
    return [...list].sort((a, b) => {
      const r = key === "date" ? a.date.localeCompare(b.date) : a[key] - b[key];
      return dir === "asc" ? r : -r;
    });
  }, [workouts, query, activeMuscle, status, sort, tx]);

  // --- effects: show the form / delete confirmation / feedback when they appear
  useEffect(() => {
    if (!showForm || !formRef.current) return;
    formRef.current.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
    formRef.current.querySelector("input")?.focus({ preventScroll: true });
  }, [showForm, editing]);

  useEffect(() => {
    if (!deleting || !deleteRef.current) return;
    deleteRef.current.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
    deleteRef.current.querySelector(".secondary")?.focus({ preventScroll: true });
  }, [deleting]);

  useEffect(() => {
    if (message) messageRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
  }, [message]);

  // --- handlers
  function persist(next, success) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setWorkouts(next);
      setMessage(success);
      setSaveError("");
      return true;
    } catch {
      setSaveError("msg.saveError");
      return false;
    }
  }

  function startAdd() {
    setEditing(null); setShowForm(true); setDeleting(null); setMessage(""); setSaveError("");
  }

  function startEdit(workout) {
    setEditing(workout); setShowForm(true); setDeleting(null); setMessage(""); setSaveError("");
  }

  function startDelete(workout) {
    setDeleting(workout); setShowForm(false); setEditing(null); setMessage(""); setSaveError("");
  }

  function cancelForm() {
    setShowForm(false); setEditing(null); setSaveError("");
  }

  function saveWorkout(values) {
    const record = {
      ...values,
      status: values.status === "auto" ? deriveStatus(values, workouts, editing?.id) : values.status,
    };
    const next = editing
      ? workouts.map((workout) => workout.id === editing.id ? { ...record, id: editing.id } : workout)
      : [...workouts, { ...record, id: crypto.randomUUID() }];
    if (persist(next, editing ? "msg.updated" : "msg.added")) cancelForm();
  }

  function confirmDelete() {
    if (persist(workouts.filter((workout) => workout.id !== deleting.id), "msg.deleted")) setDeleting(null);
  }

  function clearFilters() {
    setQuery(""); setMuscle("all"); setStatus("all"); setSort("date-desc");
  }

  return (
    <section>
      <h1>{t("list.title")}</h1>
      <WorkoutPlanner />
      <button className="btn add-workout" type="button" onClick={startAdd}>{t("list.add")}</button>
      {message && <p role="status" ref={messageRef}>{t(message)}</p>}
      {saveError && <p className="error" role="alert">{t(saveError)}</p>}
      {showForm && (
        <div ref={formRef} className="scroll-target">
          <WorkoutForm
            key={editing?.id ?? "new"}
            workout={editing}
            muscles={formMuscles}
            onSave={saveWorkout}
            onCancel={cancelForm}
          />
        </div>
      )}
      {deleting && (
        <section ref={deleteRef} className="card delete-confirm scroll-target" aria-label={t("list.confirmBtn")}>
          <p>{t("list.confirmDelete", { exercise: tx("exercise", deleting.exercise), date: deleting.date })}</p>
          <div className="actions">
            <button className="btn" type="button" onClick={confirmDelete}>{t("list.confirmBtn")}</button>
            <button className="btn secondary" type="button" onClick={() => { setDeleting(null); setSaveError(""); }}>{t("list.cancel")}</button>
          </div>
        </section>
      )}
      <div className="controls">
        <label className="field">{t("list.search")}
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("list.searchPh")} />
        </label>
        <label className="field">{t("list.muscle")}
          <select value={activeMuscle} onChange={(e) => setMuscle(e.target.value)}>
            {muscles.map((m) => <option key={m} value={m}>{m === "all" ? t("list.all") : tx("muscle", m)}</option>)}
          </select>
        </label>
        <label className="field">{t("list.status")}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => <option key={s} value={s}>{s === "all" ? t("list.all") : tx("status", s)}</option>)}
          </select>
        </label>
        <label className="field">{t("list.sort")}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((option) => <option key={option} value={option}>{t(`sort.${option}`)}</option>)}
          </select>
        </label>
      </div>

      <p className="muted">{t("list.count", { n: results.length, total: workouts.length })}</p>

      {results.length === 0 ? (
        <div className="card empty">
          <p>{t("list.empty")}</p>
          <button className="btn" onClick={clearFilters}>{t("list.clear")}</button>
        </div>
      ) : (
        <div className="grid">
          {results.map((w) => <WorkoutCard key={w.id} workout={w} onEdit={startEdit} onDelete={startDelete} />)}
        </div>
      )}
    </section>
  );
}
