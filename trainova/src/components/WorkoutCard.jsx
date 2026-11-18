export default function WorkoutCard({ workout, onEdit, onDelete }) {
  const { exercise, date, muscle, weight, sets, e1rm, status } = workout;
  return (
    <article className="card workout">
      <div className="workout-top">
        <h3>{exercise}</h3>
        <span className={`badge ${status}`}>{status}</span>
      </div>
      <p className="muted">{date} · {muscle}</p>
      <p>{weight} kg × {sets.join(" / ")} reps</p>
      <p className="muted">Estimated 1RM: <strong>{e1rm} kg</strong></p>
      <div className="actions">
        <button className="btn secondary" type="button" onClick={() => onEdit(workout)} aria-label={`Edit ${exercise} on ${date}`}>Edit</button>
        <button className="btn secondary" type="button" onClick={() => onDelete(workout)} aria-label={`Delete ${exercise} on ${date}`}>Delete</button>
      </div>
    </article>
  );
}
