import { useMemo } from "react";
import styles from "./ShipmentPreview.module.css";

/**
 * Live shipment preview panel — updates in real time as the form is filled.
 *
 * @param {Object} props
 * @param {Object} props.formData - Complete form state
 */
export default function ShipmentPreview({ formData }) {
  const {
    orderId,
    shipmentDate,
    deliveryType,
    consignor,
    consignee,
    packages,
    fragile,
    insurance,
  } = formData;

  // Computed values
  const totals = useMemo(() => {
    const totalPackages = packages.length;
    const totalWeight = packages.reduce(
      (sum, pkg) => sum + (parseFloat(pkg.weight) || 0),
      0
    );
    const totalValue = packages.reduce(
      (sum, pkg) => sum + (parseFloat(pkg.declaredValue) || 0),
      0
    );
    return { totalPackages, totalWeight, totalValue };
  }, [packages]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (value) => {
    if (!value && value !== 0) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const hasPartyData = (party) =>
    party.name || party.address || party.city || party.pincode;

  const renderPartyInfo = (party) => {
    if (!hasPartyData(party)) {
      return <span className={styles.routePartyEmpty}>Not specified yet</span>;
    }
    const parts = [];
    if (party.address) parts.push(party.address);
    if (party.city) parts.push(party.city);
    if (party.pincode) parts.push(party.pincode);

    return (
      <>
        <span className={styles.routePartyName}>
          {party.name || "Unnamed"}
        </span>
        {parts.length > 0 && (
          <span className={styles.routePartyAddress}>{parts.join(", ")}</span>
        )}
      </>
    );
  };

  return (
    <div className={styles.preview} aria-label="Shipment Preview">
      {/* ── Header ── */}
      <div className={styles.previewHeader}>
        <div className={styles.previewTitle}>
          <span className={styles.previewIcon}>🚀</span>
          <span className={styles.previewTitleText}>Shipment Summary</span>
        </div>
        <span className={styles.liveIndicator}>
          <span className={styles.liveDot} />
          Live
        </span>
      </div>

      {/* ── Order Info ── */}
      <div className={styles.orderInfo}>
        <div className={styles.orderInfoItem}>
          <span className={styles.orderInfoLabel}>Order ID</span>
          <span className={styles.orderInfoValue}>{orderId}</span>
        </div>
        <div className={styles.orderInfoItem}>
          <span className={styles.orderInfoLabel}>Shipment Date</span>
          <span className={styles.orderInfoValue}>
            {formatDate(shipmentDate)}
          </span>
        </div>
        <div className={styles.orderInfoItem}>
          <span className={styles.orderInfoLabel}>Delivery</span>
          <span
            className={`${styles.deliveryBadge} ${
              deliveryType === "express"
                ? styles.badgeExpress
                : styles.badgeStandard
            }`}
          >
            {deliveryType === "express" ? "⚡ " : ""}
            {deliveryType === "express" ? "Express" : "Standard"}
          </span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* ── Route: Sender → Receiver ── */}
      <div className={styles.routeSection}>
        <span className={styles.routeLabel}>Shipment Route</span>
        <div className={styles.route}>
          <div className={styles.routeParty}>
            <span
              className={`${styles.routePartyLabel} ${styles.routePartyLabelFrom}`}
            >
              From
            </span>
            {renderPartyInfo(consignor)}
          </div>

          <div className={styles.routeArrow}>
            <div className={styles.routeArrowLine}>
              <div className={styles.arrowDots}>
                <span className={styles.arrowDot} />
                <span className={styles.arrowDot} />
                <span className={styles.arrowDot} />
              </div>
              →
            </div>
          </div>

          <div className={styles.routeParty}>
            <span
              className={`${styles.routePartyLabel} ${styles.routePartyLabelTo}`}
            >
              To
            </span>
            {renderPartyInfo(consignee)}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* ── Packages ── */}
      <div className={styles.packagesSection}>
        <span className={styles.packagesSectionLabel}>
          Packages ({totals.totalPackages})
        </span>

        {packages.length === 0 ? (
          <div className={styles.emptyPackages}>No packages added yet</div>
        ) : (
          <div className={styles.packagesList}>
            {packages.map((pkg, i) => (
              <div key={pkg.id} className={styles.packageRow}>
                <span className={styles.packageRowNum}>{i + 1}</span>
                <span className={styles.packageRowName}>
                  {pkg.name || `Package ${i + 1}`}
                </span>
                <div className={styles.packageRowDetails}>
                  {pkg.weight && (
                    <span className={styles.packageRowDetail}>
                      ⚖ {pkg.weight} kg
                    </span>
                  )}
                  {(pkg.length || pkg.width || pkg.height) && (
                    <span className={styles.packageRowDetail}>
                      📐 {pkg.length || 0}×{pkg.width || 0}×{pkg.height || 0} cm
                    </span>
                  )}
                  {pkg.declaredValue && (
                    <span className={styles.packageRowDetail}>
                      {formatCurrency(pkg.declaredValue)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.divider} />

      {/* ── Totals ── */}
      <div className={styles.totals}>
        <div className={styles.totalCard}>
          <span className={styles.totalLabel}>Packages</span>
          <span className={styles.totalValue}>{totals.totalPackages}</span>
        </div>
        <div className={styles.totalCard}>
          <span className={styles.totalLabel}>Total Weight</span>
          <span className={styles.totalValue}>
            {totals.totalWeight.toFixed(2)}
            <span className={styles.totalUnit}> kg</span>
          </span>
        </div>
        <div className={styles.totalCard}>
          <span className={styles.totalLabel}>Total Value</span>
          <span className={styles.totalValue}>
            {formatCurrency(totals.totalValue)}
          </span>
        </div>
      </div>

      {/* ── Status Badges ── */}
      {(fragile || insurance) && (
        <>
          <div className={styles.divider} />
          <div className={styles.badges}>
            {fragile && (
              <span className={`${styles.statusBadge} ${styles.badgeFragile}`}>
                ⚠️ Fragile
              </span>
            )}
            {insurance && (
              <span className={`${styles.statusBadge} ${styles.badgeInsured}`}>
                🛡️ Insured
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
