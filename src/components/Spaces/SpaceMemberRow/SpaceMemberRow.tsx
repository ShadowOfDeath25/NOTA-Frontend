import styles from './SpaceMemberRow.module.css';
import type { SpaceMember, SpaceRole } from '@customTypes/Space';
import SpaceMemberAvatar from '@components/Spaces/SpaceMemberAvatar/SpaceMemberAvatar';
import SpaceBadge from '@components/Spaces/SpaceBadge/SpaceBadge';
import DotsIcon from "@assets/icons/dots.svg?react";
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import DotsMenu from '../DotsMenu/DotsMenu.tsx';

interface SpaceMemberRowProps {
  member: SpaceMember;
  viewerIsAdmin?: boolean;
  onRemove?: (memberId: string) => void;
  onOpenChangeRole?: (memberId: string, memberName: string, currentRole: SpaceRole) => void;
}

export default function SpaceMemberRow({
  member,
  viewerIsAdmin = false,
  onRemove,
  onOpenChangeRole
}: SpaceMemberRowProps) {

  const { t } = useTranslation();

  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const showRemoveBtn =
    viewerIsAdmin &&
    !member.isCurrentUser;

  useEffect(() => {

    function handleClickOutside(
      e: MouseEvent
    ) {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        setShowMenu(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (

    <article className={styles.card}>

      <div className={styles.inner}>

        {/* LEFT */}

        <div className={styles.memberInfo}>

          <SpaceMemberAvatar
            initials={member.initials}
            gradient={member.avatarGradient}
            isOnline={member.isOnline}
          />

          <div className={styles.textGroup}>

            <div className={styles.nameRow}>

              <span
                className={`${styles.name} bodyText`}
              >
                {member.name}
              </span>

              {member.isCurrentUser && (
                <span
                  className={`${styles.youBadge} caption`}
                >
                  {t('space.you','You')}
                </span>
              )}

              {member.isOnline && (
                <span
                  className={styles.onlineDotInline}
                
                />
              )}

            </div>

            <span
              className={`${styles.email} bodyTextSm`}
            >
              {member.email}
            </span>

            <span
              className={`${styles.joined} caption`}
            >
              {t(
                'space.joined_date',
                'Joined {{date}}',
                { date: member.joinedDate }
              )}
            </span>

          </div>

        </div>

        {/* RIGHT */}

     <div className={styles.actions}>

  <SpaceBadge role={member.role} />

  {showRemoveBtn && (

    <div
      ref={menuRef}
      className={styles.menuWrapper}
    >

      <button
        className={styles.removeBtn}
        onClick={(e)=>{

          e.stopPropagation();

          setShowMenu(
            prev => !prev
          );

        }}
      >

        <span className={styles.dotsIcon}>
          <DotsIcon/>
        </span>

      </button>

      {showMenu && (

        <DotsMenu

          type="member"

          onChangeRole={()=>{

            onOpenChangeRole?.(
              member.id,
              member.name,
              member.role
            );

            setShowMenu(false);

          }}

          onDelete={()=>{

            onRemove?.(
              member.id
            );

            setShowMenu(false);

          }}

        />

      )}

    </div>

  )}

</div>

      </div>

    </article>

  );
}