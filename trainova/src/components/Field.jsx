// Reusable labelled input with an error message underneath.
export default function Field({ label, name, type = "text", value, onChange, error }) {
  return (
    <label className="field">
      {label}
      <input name={name} type={type} value={value} onChange={onChange} aria-invalid={!!error} />
      {error && <span className="error" role="alert">{error}</span>}
    </label>
  );
}
