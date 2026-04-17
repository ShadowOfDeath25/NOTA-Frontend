import styles from "./HeaderAuthentication.module.css";
import worldIcon from "@assets/icons/world.svg";
import lightIcon from "@assets/icons/light.svg";
function HeaderAuthentication() {
    return (
        <div className={styles.header}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>Nota</h1>
          <p className={`${styles.logoDescription} bodyText`}>
            AI-Powered Note-Taking Platform
          </p>
        </div>
        <div className={styles.containerButtonIcon}>
          <button className={styles.iconButton}>
            <img className={styles.icon} src={worldIcon} alt="world icon" />
          </button>
          <button className={styles.iconButton}>
            <img className={styles.icon} src={lightIcon} alt="light icon" />
          </button>
        </div>
      </div>
    );
}
export default HeaderAuthentication;