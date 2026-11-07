export default function WorkoutCard({ workout }) {
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
    </article>
  );
}
