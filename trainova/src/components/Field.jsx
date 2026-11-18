// Reusable labelled input with an error message underneath.
export default function Field({ label, name, type = "text", value, onChange, error, autoComplete, min, step }) {
  return (
    <label className="field">
      {label}
      <input name={name} type={type} autoComplete={autoComplete} min={min} step={step} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <span id={`${name}-error`} className="error" role="alert">{error}</span>}
    </label>
  );
}
