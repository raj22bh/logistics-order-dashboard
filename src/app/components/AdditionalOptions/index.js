import styles from "./AdditionalOptions.module.css";

/**
 * Additional options section — Fragile and Insurance checkboxes.
 *
 * @param {Object} props
 * @param {Object} props.data - { fragile, insurance }
 * @param {Function} props.onChange - (field, value) => void
 */
export default function AdditionalOptions({ data, onChange }) {
  return (
    <section className={styles.section} aria-label="Additional Options">
      <div className={styles.header}>
        <span className={styles.icon}>⚙️</span>
        <h2 className={styles.title}>Additional Options</h2>
      </div>

      <div className={styles.options}>
        <label
          className={`${styles.option} ${styles.optionFragile} ${
            data.fragile ? styles.optionActive : ""
          }`}
          htmlFor="fragile-checkbox"
        >
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="fragile-checkbox"
              className={styles.checkboxInput}
              checked={data.fragile}
              onChange={(e) => onChange("fragile", e.target.checked)}
            />
            <span className={styles.checkboxVisual}>✓</span>
          </div>
          <span className={styles.optionIcon}>⚠️</span>
          <div className={styles.optionContent}>
            <span className={styles.optionLabel}>Fragile</span>
            <span className={styles.optionDesc}>Handle with extra care</span>
          </div>
        </label>

        <label
          className={`${styles.option} ${styles.optionInsurance} ${
            data.insurance ? styles.optionActive : ""
          }`}
          htmlFor="insurance-checkbox"
        >
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="insurance-checkbox"
              className={styles.checkboxInput}
              checked={data.insurance}
              onChange={(e) => onChange("insurance", e.target.checked)}
            />
            <span className={styles.checkboxVisual}>✓</span>
          </div>
          <span className={styles.optionIcon}>🛡️</span>
          <div className={styles.optionContent}>
            <span className={styles.optionLabel}>Insurance</span>
            <span className={styles.optionDesc}>Protect against damage or loss</span>
          </div>
        </label>
      </div>
    </section>
  );
}
