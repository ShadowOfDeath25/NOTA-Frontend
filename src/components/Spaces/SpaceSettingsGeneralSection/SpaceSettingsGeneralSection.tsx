import { useState } from 'react';
import styles from './SpaceSettingsGeneralSection.module.css';
import LockIcon from '@assets/icons/Lock.svg?react';
import WorldIcon from '@assets/icons/world.svg?react';
import { useTranslation } from 'react-i18next';
import type { SpaceAccess } from '@customTypes/Space';

interface SpaceSettingsGeneralSectionProps {
  initialName: string;
  initialDescription: string;
  initialPrivacy: SpaceAccess;
  readOnly?: boolean;
  onSave?: (data: { name: string; description: string; privacy: SpaceAccess }) => void;
}

export default function SpaceSettingsGeneralSection({
  initialName,
  initialDescription,
  initialPrivacy,
  readOnly = false,
  onSave,
}: SpaceSettingsGeneralSectionProps) {
  const { t } = useTranslation();

  const [name, setName]               = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [privacy, setPrivacy]         = useState<SpaceAccess>(initialPrivacy);

  const isDirty =
    name !== initialName ||
    description !== initialDescription ||
    privacy !== initialPrivacy;

  const handleSave = () => {
    if (!name.trim()) return;
    onSave?.({ name: name.trim(), description: description.trim(), privacy });
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.sectionTitle} bodyText`}>  
        {t('space.general', 'General')}
      </h2>

      <div className={styles.card}>

        {/* Space Name */}
        <div className={`${styles.field} ${readOnly ? styles.readOnlyField : ''}`}>
          <label htmlFor="settings-name" className={`${styles.fieldLabel} bodyTextSm`}>
            {t('space.space_name', 'Space Name')}
          </label>
          <input
            id="settings-name"
            type="text"
            className={`${styles.input} bodyTextSm`}
            value={name}
            onChange={(e) => !readOnly && setName(e.target.value)}
            readOnly={readOnly}
            maxLength={100}
          />
        </div>

        {/* Description */}
        <div className={`${styles.field} ${readOnly ? styles.readOnlyField : ''}`}>
          <label htmlFor="settings-desc" className={`${styles.fieldLabel} bodyTextSm`}>
            {t('space.description', 'Description')}
          </label>
          <input
            id="settings-desc"
            type="text"
            className={`${styles.input} bodyTextSm`}
            value={description}
            onChange={(e) => !readOnly && setDescription(e.target.value)}
            readOnly={readOnly}
            maxLength={200}
          />
        </div>

        {/* Privacy */}
        <div className={`${styles.field} ${readOnly ? styles.readOnlyField : ''}`}>
          <span className={`${styles.fieldLabel} bodyTextSm`}>
            {t('space.privacy', 'Privacy')}
          </span>
          <div className={styles.privacyOptions}>

            <button
              type="button"
              className={`${styles.privacyCard} ${privacy === 'private' ? styles.privacySelected : ''}`}
              onClick={() => !readOnly && setPrivacy('private')}
              aria-pressed={privacy === 'private'}
              disabled={readOnly}
            >
              <div className={styles.privacyIcon}><LockIcon /></div>
              <div className={styles.privacyText}>
                <span className={`${styles.privacyTitle} bodyText`}>{t('private', 'Private')}</span>
                <span className={`${styles.privacyDesc} caption`}>{t('private_desc', 'Only invited members can access')}</span>
              </div>
              <div className={`${styles.radio} ${privacy === 'private' ? styles.radioSelected : ''}`}>
                {privacy === 'private' && <div className={styles.radioDot} />}
              </div>
            </button>

            <button
              type="button"
              className={`${styles.privacyCard} ${privacy === 'public' ? styles.privacySelected : ''}`}
              onClick={() => !readOnly && setPrivacy('public')}
              aria-pressed={privacy === 'public'}
              disabled={readOnly}
            >
              <div className={styles.privacyIcon}><WorldIcon /></div>
              <div className={styles.privacyText}>
                <span className={`${styles.privacyTitle} bodyText`}>{t('public', 'Public')}</span>
                <span className={`${styles.privacyDesc} caption`}>{t('public_desc', 'Anyone can join')}</span>
              </div>
              <div className={`${styles.radio} ${privacy === 'public' ? styles.radioSelected : ''}`}>
                {privacy === 'public' && <div className={styles.radioDot} />}
              </div>
            </button>

          </div>
        </div>

        {/* Save button — hidden in readOnly mode */}
        {!readOnly && (
          <div className={styles.footer}>
            <button
              type="button"
              className={`btn btnPrimary ${styles.saveBtn} bodyTextSm`}
              onClick={handleSave}
              disabled={!isDirty || !name.trim()}
              aria-disabled={!isDirty || !name.trim()}
            >
              {t('space.save_changes', 'Save Changes')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
