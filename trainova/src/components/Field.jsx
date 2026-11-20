import { useLang } from "../i18n/LanguageContext.jsx";

// Reusable labelled input with an error message underneath.
// `label` is already translated by the caller; `error` is a translation key, so a visible
// error switches language together with the rest of the page.
export default function Field({ label, name, type = "text", value, onChange, error, autoComplete, min, step }) {
  const { t } = useLang();
  return (
    <label className="field">
      {label}
      <input name={name} type={type} autoComplete={autoComplete} min={min} step={step} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <span id={`${name}-error`} className="error" role="alert">{t(error)}</span>}
    </label>
  );
}
