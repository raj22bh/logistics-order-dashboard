import PackageItem from "../PackageItem";
import styles from "./PackageList.module.css";

/**
 * Manages the list of packages — add, remove, and edit.
 *
 * @param {Object} props
 * @param {Array} props.packages - Array of package objects
 * @param {Function} props.onPackageChange - (index, field, value) => void
 * @param {Function} props.onAddPackage - () => void
 * @param {Function} props.onRemovePackage - (index) => void
 */
export default function PackageList({
  packages,
  onPackageChange,
  onAddPackage,
  onRemovePackage,
}) {
  const canRemove = packages.length > 1;

  return (
    <section className={styles.section} aria-label="Package Information">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>📦</span>
          <h2 className={styles.title}>
            Packages
            <span className={styles.count}>({packages.length})</span>
          </h2>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={onAddPackage}
          id="add-package-btn"
        >
          <span className={styles.addIcon}>+</span>
          Add Package
        </button>
      </div>

      <div className={styles.packages}>
        {packages.map((pkg, index) => (
          <PackageItem
            key={pkg.id}
            index={index}
            data={pkg}
            onChange={onPackageChange}
            onRemove={onRemovePackage}
            canRemove={canRemove}
          />
        ))}
      </div>
    </section>
  );
}
