import FormField from "../FormField";
import styles from "./PartyCard.module.css";

/**
 * Reusable party card for Consignor (Sender) and Consignee (Receiver).
 *
 * @param {Object} props
 * @param {"sender"|"receiver"} props.type - Party type
 * @param {Object} props.data - { name, address, city, pincode }
 * @param {Function} props.onChange - (field, value) => void
 */
export default function PartyCard({ type, data, onChange }) {
  const isSender = type === "sender";
  const title = isSender ? "Consignor" : "Consignee";
  const subtitle = isSender ? "(Sender)" : "(Receiver)";
  const icon = isSender ? "📤" : "📥";
  const iconClass = isSender ? styles.iconSender : styles.iconReceiver;

  return (
    <section className={styles.card} aria-label={`${title} Details`}>
      <div className={styles.header}>
        <span className={`${styles.icon} ${iconClass}`}>{icon}</span>
        <h2 className={styles.title}>
          {title}
          <span className={styles.subtitle}>{subtitle}</span>
        </h2>
      </div>

      <div className={styles.fields}>
        <div className={styles.fullWidth}>
          <FormField
            label="Full Name"
            type="text"
            value={data.name}
            onChange={(val) => onChange("name", val)}
            placeholder={`Enter ${isSender ? "sender" : "receiver"}'s name`}
            id={`${type}-name`}
          />
        </div>

        <div className={styles.fullWidth}>
          <FormField
            label="Address"
            type="textarea"
            value={data.address}
            onChange={(val) => onChange("address", val)}
            placeholder="Street address, area, landmark"
            id={`${type}-address`}
          />
        </div>

        <div>
          <FormField
            label="City"
            type="text"
            value={data.city}
            onChange={(val) => onChange("city", val)}
            placeholder="City name"
            id={`${type}-city`}
          />
        </div>

        <div>
          <FormField
            label="Pincode"
            type="text"
            value={data.pincode}
            onChange={(val) => onChange("pincode", val)}
            placeholder="6-digit pincode"
            id={`${type}-pincode`}
          />
        </div>
      </div>
    </section>
  );
}
