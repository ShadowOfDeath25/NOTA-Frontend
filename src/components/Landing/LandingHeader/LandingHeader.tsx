import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.svg";
import styles from "./LandingHeader.module.css";

export default function LandingHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t("features_nav", "Features"), href: "#features" },
    { label: t("how_it_works_nav", "How It Works"), href: "#how-it-works" },
    { label: t("testimonials_nav", "Testimonials"), href: "#testimonials" },
    { label: t("faq_nav", "FAQ"), href: "#faq" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logo} alt="Nota logo" className={styles.logo} />
          <span className={styles.brandName}>Nota</span>
        </div>

        <nav className={styles.desktopNav} aria-label={t("main_navigation", "Main navigation")}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            className={`btn btnSecondary ${styles.desktopOnly}`}
            onClick={() => navigate("/login")}
          >
            {t("sign_in", "Sign In")}
          </button>
          <button
            className={`btn btnPrimary`}
            onClick={() => navigate("/signup")}
          >
            {t("get_started", "Get Started")}
          </button>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t("close_menu", "Close menu") : t("open_menu", "Open menu")}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label={t("mobile_navigation", "Mobile navigation")}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className={styles.mobileDivider} />
            <button
              className={`btn btnSecondary ${styles.mobileAction}`}
              onClick={() => { setMenuOpen(false); navigate("/login"); }}
            >
              {t("sign_in", "Sign In")}
            </button>
            <button
              className={`btn btnPrimary ${styles.mobileAction}`}
              onClick={() => { setMenuOpen(false); navigate("/signup"); }}
            >
              {t("get_started", "Get Started")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
