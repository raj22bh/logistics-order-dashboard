import styles from "./FormField.module.css";

/**
 * Reusable form field component.
 * Supports: text, number, date, select, textarea, and readonly inputs.
 *
 * @param {Object} props
 * @param {string} props.label - Field label text
 * @param {string} props.type - Input type (text, number, date, select, textarea)
 * @param {string} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.suffix] - Unit suffix (e.g., "kg", "cm", "₹")
 * @param {boolean} [props.readOnly] - Whether input is read-only
 * @param {Array} [props.options] - Options for select type [{value, label}]
 * @param {string} [props.id] - Custom ID for the input
 * @param {number} [props.min] - Minimum value for number inputs
 * @param {number} [props.step] - Step value for number inputs
 */
export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  suffix,
  readOnly = false,
  options = [],
  id,
  min,
  step,
}) {
  const fieldId = id || `field-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          id={fieldId}
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          id={fieldId}
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
        />
      );
    }

    return (
      <div className={`${styles.inputWrapper} ${suffix ? styles.hasSuffix : ""}`}>
        <input
          id={fieldId}
          type={type}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          min={min}
          step={step}
          aria-readonly={readOnly}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    );
  };

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
}
