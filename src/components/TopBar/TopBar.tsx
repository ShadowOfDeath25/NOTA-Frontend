import styles from './styles.module.css';
import logo from '@assets/logo.svg';
import MenuIcon from '@assets/icons/menu.svg?react';
import CloseIcon from '@assets/icons/close.svg?react';

interface TopBarProps {
    onMenuClick: () => void;
    isSidebarOpen: boolean;
}

export default function TopBar({ onMenuClick, isSidebarOpen }: TopBarProps) {
    return (
        <header className={styles.topBar}>
            <button
                className={styles.menuButton}
                onClick={onMenuClick}
               
            >
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <div className={styles.brand}>
                <img src={logo} alt="Nota logo" className={styles.logo} />
                <span className={styles.appName}>Nota</span>
            </div>
        </header>
    );
}
