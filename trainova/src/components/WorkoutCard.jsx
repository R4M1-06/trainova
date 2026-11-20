import { useLang } from "../i18n/LanguageContext.jsx";

export default function WorkoutCard({ workout, onEdit, onDelete }) {
  const { t, tx } = useLang();
  const { exercise, date, muscle, weight, sets, e1rm, status } = workout;
  const name = tx("exercise", exercise);
  return (
    <article className="card workout">
      <div className="workout-top">
        <h3>{name}</h3>
        <span className={`badge ${status}`}>{tx("status", status)}</span>
      </div>
      <p className="muted"><bdi dir="ltr">{date}</bdi> · {tx("muscle", muscle)}</p>
      <p>{weight} {t("card.kg")} × <bdi dir="ltr">{sets.join(" / ")}</bdi> {t("card.reps")}</p>
      <p className="muted">{t("card.e1rm")}: <strong>{e1rm} {t("card.kg")}</strong></p>
      <div className="actions">
        <button className="btn secondary" type="button" onClick={() => onEdit(workout)} aria-label={t("card.editAria", { exercise: name, date })}>{t("card.edit")}</button>
        <button className="btn secondary" type="button" onClick={() => onDelete(workout)} aria-label={t("card.deleteAria", { exercise: name, date })}>{t("card.delete")}</button>
      </div>
    </article>
  );
}
