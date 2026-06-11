import styles from './SpacesList.module.css';
import type {Space} from '@customTypes/Space';
import SpaceCard from '@components/Spaces/SpaceCard/SpaceCard';
import {useTranslation} from 'react-i18next';

interface SpacesListProps {
    spaces: Space[] | undefined;
    onSpaceClick?: (id: string) => void;
}

export default function SpacesList({spaces, onSpaceClick}: SpacesListProps) {
    const {t} = useTranslation();

    return (
        <section className={styles.section}>
            <h2 className={`${styles.sectionTitle} bodyText`}>
                {t('space.my_spaces', 'My Spaces')}
            </h2>
            <div className={styles.grid}>
                {spaces?.map((space) => (
                    <SpaceCard
                        key={space.id}
                        space={space}
                        onClick={onSpaceClick}
                    />
                ))}
            </div>
        </section>
    );
}
