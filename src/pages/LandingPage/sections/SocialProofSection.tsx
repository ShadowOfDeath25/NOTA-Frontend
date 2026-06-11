import { useTranslation } from "react-i18next";
import styles from "./SocialProofSection.module.css";

const metrics = [
  { value: "10K+", key: "users", label: "users" },
  { value: "50K+", key: "notes_created", label: "Notes Created" },
  { value: "4.9", key: "rating", label: "Average Rating" },
  { value: "99%", key: "uptime", label: "Uptime" },
];

export default function SocialProofSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {metrics.map((m) => (
            <div key={m.key} className={styles.metric}>
              <span className={styles.value}>{m.value}</span>
              <span className={styles.label}>{t(m.key, m.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
