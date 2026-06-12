import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "../../../hooks/useInView";
import styles from "./FinalCTASection.module.css";

export default function FinalCTASection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.card}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.96 }
          }
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
