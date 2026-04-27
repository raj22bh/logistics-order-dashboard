import { useState, useCallback } from "react";
import FormField from "../FormField";
import styles from "./ShipmentDetails.module.css";

/**
 * Shipment details section — Order ID, date, and delivery type.
 *
 * @param {Object} props
 * @param {Object} props.data - { orderId, shipmentDate, deliveryType }
 * @param {Function} props.onChange - (field, value) => void
 */
export default function ShipmentDetails({ data, onChange }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(data.orderId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [data.orderId]);

  return (
    <section className={styles.section} aria-label="Shipment Details">
      <div className={styles.header}>
        <span className={styles.icon}>📋</span>
        <h2 className={styles.title}>Shipment Details</h2>
      </div>

      <div className={styles.fields}>
        <div>
          <FormField
            label="Order ID"
            type="text"
            value={data.orderId}
            readOnly
            id="order-id"
          />
        </div>

        <div>
          <FormField
            label="Shipment Date"
            type="date"
            value={data.shipmentDate}
            onChange={(val) => onChange("shipmentDate", val)}
            id="shipment-date"
          />
        </div>

        <div>
          <div className={styles.field}>
            <label className={styles.deliveryLabel}>
              Delivery Type
            </label>
            <div className={styles.deliveryToggle}>
              <button
                type="button"
                className={`${styles.toggleOption} ${
                  data.deliveryType === "standard" ? styles.toggleOptionActive : ""
                }`}
                onClick={() => onChange("deliveryType", "standard")}
                aria-pressed={data.deliveryType === "standard"}
              >
                Standard
              </button>
              <button
                type="button"
                className={`${styles.toggleOption} ${
                  data.deliveryType === "express" ? styles.toggleOptionExpress : ""
                }`}
                onClick={() => onChange("deliveryType", "express")}
                aria-pressed={data.deliveryType === "express"}
              >
                ⚡ Express
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
