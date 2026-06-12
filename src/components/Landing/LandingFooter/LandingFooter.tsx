import { useTranslation } from "react-i18next";
import logo from "@assets/logo.svg";
import Reveal from "@components/Landing/Reveal.tsx";
import styles from "./LandingFooter.module.css";

export default function LandingFooter() {
  const { t } = useTranslation();

  const productLinks = [
    { label: t("features_nav", "Features"), href: "#features" },
    { label: t("how_it_works_nav", "How It Works"), href: "#how-it-works" },
    { label: "Pricing", href: "#" },
  ];

  const resourceLinks = [
    { label: t("faq_nav", "FAQ"), href: "#faq" },
    { label: t("help_center", "Help Center"), href: "#" },
    { label: t("documentation", "Documentation"), href: "#" },
  ];

  const legalLinks = [
    { label: t("privacy_policy", "Privacy Policy"), href: "#" },
    { label: t("terms_of_service", "Terms of Service"), href: "#" },
  ];

  return (
    <footer className={styles.footer}>
      <Reveal as="div" className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={logo} alt="Nota logo" className={styles.logo} />
            <span className={styles.brandName}>Nota</span>
          </div>
          <p className={styles.tagline}>
            {t("footer_tagline", "AI-Powered Note-Taking for Modern Teams")}
          </p>
        </div>

        <div className={styles.linkCol}>
          <span className={styles.colTitle}>{t("product", "Product")}</span>
          {productLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.footerLink}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.linkCol}>
          <span className={styles.colTitle}>{t("resources", "Resources")}</span>
          {resourceLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.footerLink}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.linkCol}>
          <span className={styles.colTitle}>{t("legal", "Legal")}</span>
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.footerLink}>
              {link.label}
            </a>
          ))}
        </div>
      </Reveal>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Nota. {t("all_rights_reserved", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
}
