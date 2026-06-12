import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroEntrance, HeroItem } from "@components/Landing/HeroEntrance.tsx";
import styles from "./HeroSection.module.css";

function HeroIllustration() {
  return (
    <motion.div
      className={styles.illustrationWrapper}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.svg
        className={styles.illustration}
        viewBox="0 0 560 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Nota dashboard preview"
      >
        <defs>
          <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#59168B" />
            <stop offset="50%" stopColor="#6E11B0" />
            <stop offset="100%" stopColor="#A3004C" />
          </linearGradient>
          <linearGradient id="hero-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101828" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0F1420" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="hero-purple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ad46ff" />
            <stop offset="100%" stopColor="#f6339a" />
          </linearGradient>
          <linearGradient id="hero-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2b7fff" />
            <stop offset="100%" stopColor="#00b8db" />
          </linearGradient>
          <linearGradient id="hero-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00c950" />
            <stop offset="100%" stopColor="#00bc7d" />
          </linearGradient>
          <filter id="hero-glow">
            <feGaussianBlur stdDeviation="40" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background gradient shape */}
        <rect x="70" y="30" width="420" height="360" rx="18" fill="url(#hero-bg)" opacity="0.3" />

        {/* Floating glow */}
        <circle cx="280" cy="210" r="140" fill="#9810fa" opacity="0.12" />

        {/* Main editor card */}
        <rect x="100" y="60" width="360" height="300" rx="14" fill="url(#hero-card)" stroke="#4F8BFF26" strokeWidth="1" />

        {/* Editor top bar */}
        <rect x="100" y="60" width="360" height="46" rx="14" fill="#101828" />
        <rect x="100" y="92" width="360" height="14" fill="#101828" />
        <rect x="100" y="60" width="360" height="46" rx="14" fill="#101828" />
        <rect x="100" y="88" width="360" height="18" fill="#101828" />

        {/* Toolbar dots */}
        <circle cx="124" cy="83" r="5" fill="#d4183d" />
        <circle cx="142" cy="83" r="5" fill="#ff8904" />
        <circle cx="160" cy="83" r="5" fill="#00c950" />

        {/* Title line */}
        <rect x="116" y="112" width="180" height="8" rx="4" fill="#4f8bff" opacity="0.3" />

        {/* Content lines */}
        <rect x="116" y="136" width="280" height="6" rx="3" fill="#4f8bff" opacity="0.15" />
        <rect x="116" y="152" width="240" height="6" rx="3" fill="#4f8bff" opacity="0.15" />
        <rect x="116" y="168" width="300" height="6" rx="3" fill="#4f8bff" opacity="0.15" />
        <rect x="116" y="184" width="200" height="6" rx="3" fill="#4f8bff" opacity="0.15" />

        {/* Feature cards row */}
        <rect x="116" y="216" width="104" height="64" rx="10" fill="#0F1420" stroke="#4F8BFF26" strokeWidth="1" />
        <rect x="228" y="216" width="104" height="64" rx="10" fill="#0F1420" stroke="#4F8BFF26" strokeWidth="1" />
        <rect x="340" y="216" width="104" height="64" rx="10" fill="#0F1420" stroke="#4F8BFF26" strokeWidth="1" />

        {/* Card icons */}
        <rect x="126" y="226" width="20" height="20" rx="6" fill="url(#hero-purple)" />
        <rect x="238" y="226" width="20" height="20" rx="6" fill="url(#hero-blue)" />
        <rect x="350" y="226" width="20" height="20" rx="6" fill="url(#hero-green)" />

        {/* Card lines */}
        <rect x="152" y="228" width="56" height="5" rx="2.5" fill="#4f8bff" opacity="0.2" />
        <rect x="152" y="238" width="40" height="4" rx="2" fill="#4f8bff" opacity="0.12" />
        <rect x="264" y="228" width="56" height="5" rx="2.5" fill="#4f8bff" opacity="0.2" />
        <rect x="264" y="238" width="40" height="4" rx="2" fill="#4f8bff" opacity="0.12" />
        <rect x="376" y="228" width="56" height="5" rx="2.5" fill="#4f8bff" opacity="0.2" />
        <rect x="376" y="238" width="40" height="4" rx="2" fill="#4f8bff" opacity="0.12" />

        {/* AI badge */}
        <rect x="116" y="296" width="80" height="24" rx="12" fill="#9810fa" opacity="0.15" />
        <text x="156" y="312" textAnchor="middle" fill="#9810fa" fontSize="11" fontWeight="600">AI</text>

        {/* Status */}
        <rect x="360" y="300" width="80" height="16" rx="8" fill="#00c950" opacity="0.12" />
        <circle cx="372" cy="308" r="3" fill="#00c950" />
        <text x="380" y="312" fill="#00c950" fontSize="10" opacity="0.8">Live Sync</text>

        {/* Gradient accent blobs */}
        <motion.circle
          cx="80" cy="180" r="60" fill="url(#hero-purple)" opacity="0.08"
          filter="url(#hero-glow)"
          animate={{ x: [0, 15, 0, -10, 0], y: [0, -10, 5, 10, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="480" cy="320" r="50" fill="url(#hero-blue)" opacity="0.06"
          filter="url(#hero-glow)"
          animate={{ x: [0, -12, 5, 10, 0], y: [0, 8, -5, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <HeroEntrance className={styles.content}>
          <HeroItem>
            <h1 className={styles.heading}>
              {t("hero_title", "Think. Write. Collaborate.\nAll in One Place.")}
            </h1>
          </HeroItem>
          <HeroItem distance={16}>
            <p className={styles.subtitle}>
              {t(
                "hero_subtitle",
                "Nota is an AI-powered note-taking platform that helps you capture ideas, organize knowledge, and collaborate with your team in real time."
              )}
            </p>
          </HeroItem>
          <HeroItem distance={12} duration={0.5}>
            <div className={styles.actions}>
              <button className="btn btnPrimary" onClick={() => navigate("/signup")}>
                {t("get_started_free", "Get Started Free")}
              </button>
              <button className="btn btnSecondary" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                {t("learn_more", "Learn More")}
              </button>
            </div>
          </HeroItem>
        </HeroEntrance>
        <HeroIllustration />
      </div>
    </section>
  );
}
