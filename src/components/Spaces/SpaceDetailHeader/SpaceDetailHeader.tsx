import styles from './SpaceDetailHeader.module.css';
import type {Space} from '@customTypes/Space';
import SpaceBadge from '@components/Spaces/SpaceBadge/SpaceBadge';
import FilesIcon from '@assets/icons/files.svg?react';
import SettingsIcon from '@assets/icons/settings.svg?react';
import FileIcon from '@assets/icons/file.svg?react';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import BackIcon from '@assets/icons/back.svg?react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {getGradient} from '@utils/space';

interface SpaceDetailHeaderProps {
    space: Space;
}

const GRADIENT_MAP: Record<Space['gradient'], string> = {
    'purple-pink': 'var(--gradient-purple-pink)',
    'blue-cyan': 'var(--gradient-blue-cyan)',
    'green': 'var(--gradient-green)',
};

export default function SpaceDetailHeader({space}: SpaceDetailHeaderProps) {
    const {t} = useTranslation();
    const navigate = useNavigate();


    return (
        <div className={styles.container}>
            {/* Top row: back + icon + title + settings */}
            <div className={styles.topRow}>
                <button
                    className={styles.backBtn}
                    onClick={() => navigate('/spaces')}

                >
                    <div className={styles.backIcon}>
                        <BackIcon/>
                    </div>
                </button>

                <div
                    className={styles.spaceIcon}
                    style={{backgroundImage: GRADIENT_MAP[getGradient(space.gradient, space.id)]}}
                    aria-hidden="true"
                >
                    <div className={styles.spaceIconImg}>
                        <FilesIcon/>
                    </div>

                </div>

                <div className={styles.titleGroup}>
                    <h1 className={`${styles.title} h3`}>{space.name}</h1>
                    <p className={`${styles.description} bodyText`}>{space.description}</p>
                </div>

                <button
                    className={`${styles.settingsBtn} bodyTextSm`}
                    onClick={() => navigate(`/spaces/${space.id}/settings`, {state: {space}})}
                >
                    <div className={styles.settingsBtnIcon}>
                        <SettingsIcon/>
                    </div>
                    <span>{t('settings', 'Settings')}</span>
                </button>
            </div>

            {/* Meta row: note count + member count + role badge */}
            <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                    <div className={styles.metaIcon}>
                        <FileIcon/>
                    </div>
                    <span className={`${styles.metaText} bodyTextSm`}>
            {t('space.note_count', '{{count}} notes', {count: space.notes_count})}
          </span>
                </div>
                <div className={styles.metaItem}>
                    <div className={styles.metaIcon}>
                        <CollaborateIcon/>
                    </div>
                    <span className={`${styles.metaText} bodyTextSm`}>
            {t('space.member_count', '{{count}} members', {count: space.users_count})}
          </span>
                </div>
                <SpaceBadge role={space.role}/>
            </div>
        </div>
    );
}
