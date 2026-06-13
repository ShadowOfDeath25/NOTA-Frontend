import { useState } from 'react';
import styles from './SpaceSettingsGeneralSection.module.css';
import { useTranslation } from 'react-i18next';

interface SpaceSettingsGeneralSectionProps {
  initialName: string;
  initialDescription: string;
  readOnly?: boolean;
  onSave?: (data: { name: string; description: string }) => void;
}

export default function SpaceSettingsGeneralSection({
  initialName,
  initialDescription,
  readOnly = false,
  onSave,
}: SpaceSettingsGeneralSectionProps) {
  const { t } = useTranslation();

  const [name, setName]               = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const isDirty =
    name !== initialName ||
    description !== initialDescription;

  const handleSave = () => {
    if (!name.trim()) return;
    onSave?.({ name: name.trim(), description: description.trim() });
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
