import { useState } from "react";
import { exercises, splits, weekdays } from "../data/planner.js";
import { useLang } from "../i18n/LanguageContext.jsx";

function MuscleList({ name }) {
  const { tx } = useLang();
  return (
    <div className="muscle">
      <h4>{tx("muscle", name)}</h4>
      <ul>{exercises[name].map((exercise) => <li key={exercise}>{tx("exercise", exercise)}</li>)}</ul>
    </div>
  );
}

export default function WorkoutPlanner() {
  const { t, tx } = useLang();
  const [split, setSplit] = useState("");
  const [day, setDay] = useState("");
  const [library, setLibrary] = useState("all");

  const plan = split && day ? splits[split][day] : null;
  const libraryMuscles = library === "all" ? Object.keys(exercises) : [library];

  return (
    <section className="card planner" aria-labelledby="planner-title">
      <h2 id="planner-title">{t("planner.title")}</h2>
      <div className="controls">
        <label className="field">{t("planner.split")}
          <select value={split} onChange={(event) => setSplit(event.target.value)}>
            <option value="">{t("planner.selectSplit")}</option>
            {Object.keys(splits).map((name) => <option key={name} value={name}>{tx("split", name)}</option>)}
          </select>
        </label>
        {split && (
          <label className="field">{t("planner.weekday")}
            <select value={day} onChange={(event) => setDay(event.target.value)}>
              <option value="">{t("planner.selectDay")}</option>
              {weekdays.map((name) => <option key={name} value={name}>{tx("day", name)}</option>)}
            </select>
          </label>
        )}
      </div>

      <div aria-live="polite">
        {plan && (plan.muscles.length === 0 ? (
          <p className="rest-day">{t("planner.rest")}</p>
        ) : (
          <>
            <h3>{tx("day", day)} - {tx("plan", plan.title)}</h3>
            <div className="muscle-lists">
              {plan.muscles.map((name) => <MuscleList key={name} name={name} />)}
            </div>
          </>
        ))}
      </div>

      <h3 className="library-title">{t("planner.library")}</h3>
      <label className="field library-filter">{t("planner.muscle")}
        <select value={library} onChange={(event) => setLibrary(event.target.value)}>
          <option value="all">{t("list.all")}</option>
          {Object.keys(exercises).map((name) => <option key={name} value={name}>{tx("muscle", name)}</option>)}
        </select>
      </label>
      <div className="muscle-lists">
        {libraryMuscles.map((name) => <MuscleList key={name} name={name} />)}
      </div>
    </section>
  );
}
