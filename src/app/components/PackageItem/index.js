import { useState } from "react";
import FormField from "../FormField";
import styles from "./PackageItem.module.css";

/**
 * Single package card — collapsible, with all package fields.
 *
 * @param {Object} props
 * @param {number} props.index - Package index (0-based)
 * @param {Object} props.data - { name, weight, length, width, height, declaredValue }
 * @param {Function} props.onChange - (index, field, value) => void
 * @param {Function} props.onRemove - (index) => void
 * @param {boolean} props.canRemove - Whether this package can be removed
 */
export default function PackageItem({ index, data, onChange, onRemove, canRemove }) {
  const [isOpen, setIsOpen] = useState(true);

  const displayName = data.name || `Package ${index + 1}`;

  return (
    <div className={`${styles.package} ${!isOpen ? styles.packageCollapsed : ""}`}>
      <div
        className={styles.packageHeader}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`Toggle ${displayName} details`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className={styles.headerLeft}>
          <span className={styles.badge}>{index + 1}</span>
          <span className={styles.packageLabel}>{displayName}</span>
        </div>

        <div className={styles.headerRight}>
          <button
            type="button"
            className={styles.removeButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            disabled={!canRemove}
            aria-label={`Remove ${displayName}`}
            title={canRemove ? "Remove package" : "At least one package is required"}
          >
            ✕
          </button>
          <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>
            ▾
          </span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.packageBody}>
          <FormField
            label="Package Name"
            type="text"
            value={data.name}
            onChange={(val) => onChange(index, "name", val)}
            placeholder="e.g., Electronics Box"
            id={`pkg-${index}-name`}
          />

          <FormField
            label="Weight"
            type="number"
            value={data.weight}
            onChange={(val) => onChange(index, "weight", val)}
            placeholder="0.00"
            suffix="kg"
            min="0"
            step="0.01"
            id={`pkg-${index}-weight`}
          />

          <FormField
            label="Declared Value"
            type="number"
            value={data.declaredValue}
            onChange={(val) => onChange(index, "declaredValue", val)}
            placeholder="0"
            suffix="₹"
            min="0"
            step="1"
            id={`pkg-${index}-value`}
          />

          <span className={styles.dimLabel}>Dimensions</span>
          <div className={styles.dimFields}>
            <FormField
              label="Length"
              type="number"
              value={data.length}
              onChange={(val) => onChange(index, "length", val)}
              placeholder="0"
              suffix="cm"
              min="0"
              step="0.1"
              id={`pkg-${index}-length`}
            />

            <FormField
              label="Width"
              type="number"
              value={data.width}
              onChange={(val) => onChange(index, "width", val)}
              placeholder="0"
              suffix="cm"
              min="0"
              step="0.1"
              id={`pkg-${index}-width`}
            />

            <FormField
              label="Height"
              type="number"
              value={data.height}
              onChange={(val) => onChange(index, "height", val)}
              placeholder="0"
              suffix="cm"
              min="0"
              step="0.1"
              id={`pkg-${index}-height`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
