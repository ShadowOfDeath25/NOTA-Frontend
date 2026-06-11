import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./FinalCTASection.module.css";

export default function FinalCTASection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            {t("cta_title", "Ready to Transform Your Note-Taking?")}
          </h2>
          <p className={styles.subtitle}>
            {t(
              "cta_subtitle",
              "Join thousands of productive teams and individuals who use Nota every day. It is free to get started."
            )}
          </p>
          <button className="btn btnPrimary" onClick={() => navigate("/signup")}>
            {t("get_started_free", "Get Started Free")}
          </button>
          <p className={styles.noCreditCard}>
            {t("no_credit_card", "No credit card required. Set up in seconds.")}
          </p>
        </div>
      </div>
    </section>
  );
}
