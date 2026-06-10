import styles from './SpaceCard.module.css';
import type {Space} from '@customTypes/Space';
import SpaceBadge from '@components/Spaces/SpaceBadge/SpaceBadge';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import LockIcon from '@assets/icons/Lock.svg?react';
import WorldIcon from '@assets/icons/world.svg?react';
import {useTranslation} from 'react-i18next';

interface SpaceCardProps {
    space: Space;
    onClick?: (id: string) => void;
}

const GRADIENT_MAP: Record<Space['gradient'], string> = {
    'purple-pink': 'var(--gradient-purple-pink)',
    'blue-cyan': 'var(--gradient-blue-cyan)',
    'green': 'var(--gradient-green)',
};

export default function SpaceCard({space, onClick}: SpaceCardProps) {
    const {t} = useTranslation();

    return (
        <article
            className={styles.card}
            onClick={() => onClick?.(space.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.(space.id)}
            aria-label={t('open_space', 'Open space: {{name}}', {name: space.name})}
        >
            {/* Top row: gradient icon + title + menu */}
            <div className={styles.topRow}>
                <div
                    className={styles.iconWrapper}
                    style={{backgroundImage: GRADIENT_MAP[space.gradient ?? 'blue-cyan']}}
                    aria-hidden="true"
                >
                    <div className={styles.iconCollarate}>
                        <CollaborateIcon/>
                    </div>

                </div>

                <div className={styles.titleGroup}>
                    <div className={styles.titleRow}>
                        <h3 className={`${styles.title} bodyText`}>{space.name}</h3>
                        <span className={styles.icon}>
                {space.access == "private" ? <LockIcon/> : <WorldIcon/>}
              </span>
                    </div>

                    <p className={`${styles.description} bodyTextSm`}>{space.description}</p>

                    <SpaceBadge role={space.pivot.role}/>

                    <div className={styles.meta}>
            <span className={`${styles.metaText} caption`}>
              {t('space.member_count', '{{count}} members', {count: space.users_count})}
            </span>
                        <span className={styles.dot} aria-hidden="true">•</span>
                        <span className={`${styles.metaText} caption`}>
              {t('space.note_count', '{{count}} notes', {count: space.notes_count})}
            </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
