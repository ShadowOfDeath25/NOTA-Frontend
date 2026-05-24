import styles from './SpaceNoteRow.module.css';
import ClockIcon from '@assets/icons/clock.svg?react';
import StarIcon from '@assets/icons/star.svg?react';
import StarFilledIcon from '@assets/icons/star-filled.svg?react';
import DotsIcon from '@assets/icons/dots.svg?react';
import DotsMenu from '../DotsMenu/DotsMenu.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { NoteData } from '@customTypes/NoteData';

interface SpaceNoteRowProps extends NoteData {
  tags?: string[];
}

export default function SpaceNoteRow({ id, title, summary, date, starred, tags = [] }: SpaceNoteRowProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(starred);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => navigate(`/notes/${id}`);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred((prev) => !prev);
  };
  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev)

   
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={t('open_note', 'Open note: {{title}}', { title })}
    >
      <div className={styles.body}>
        {/* Title row */}
        <div className={styles.row}>
        <div className={styles.titleRow}>
          

          <h3 className={`${styles.title} bodyText`}>{title}</h3>
          <button
            className={styles.starBtn}
            onClick={handleStarClick}
            aria-label={isStarred ? t('unstar_note', 'Unstar note') : t('star_note', 'Star note')}
            >
           {isStarred?<span className={styles.icon} ><StarFilledIcon/></span  >:<span className={styles.starIcon}><StarIcon/></span>}
          </button>
           
            </div>
          <div>
             <button
             onClick={handleDotsClick}
              className={styles.removeBtn}
            >
              {/* vertical dots / more options icon */}
              <span className={styles.dotsIcon}>
                <DotsIcon/>
              </span>
             
            </button>
              {showMenu && (
               <DotsMenu
                  date={date}
                 
                  onDelete={()=>{
                      console.log("delete note");
                      setShowMenu(false);
                  }}
                />
              )}
          </div>

        </div>

        {/* Excerpt */}
        {summary && (
          <p className={`${styles.excerpt} bodyTextSm`}>{summary}</p>
        )}

        {/* Footer: date + tags */}
        <div className={styles.footer}>
          <div className={styles.dateGroup}>
         <div className={styles.clockIcon}>
          <ClockIcon/>
         </div>
            <span className={`${styles.date} caption`}>{date}</span>
          </div>

          {tags.length > 0 && (
            <>
              <span className={styles.dot} aria-hidden="true">•</span>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={`${styles.tag} caption`}>{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
