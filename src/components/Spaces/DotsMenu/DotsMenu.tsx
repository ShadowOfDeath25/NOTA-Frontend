import styles from "./DotsMenu.module.css";
import ClockIcon from "@assets/icons/clock.svg?react";
import TrashIcon from "@assets/icons/trash.svg?react";
import ContributorIcon from "@assets/icons/contributor.svg?react";
import { useTranslation } from "react-i18next";

interface DotsMenuProps {

  type: "note" | "member";

  date?: string;

  onDelete:()=>void;

  onChangeRole?:()=>void;
}

export default function DotsMenu({

  type,

  date,

  onDelete,

  onChangeRole

}:DotsMenuProps){
  const {t}=useTranslation();
  return (

    <div
      className={styles.menu}
      onClick={(e)=>e.stopPropagation()}
    >

      {/* NOTES */}

      {type==="note" && (

        <>
          <div className={styles.info}>
            <span className={styles.clockIcon}><ClockIcon/></span>
            {t("space.created","Created")} : {date}
          </div>

          <button
            className={`${styles.item} ${styles.danger}`}
            onClick={onDelete}
          >
            <span className={styles.trashIcon}><TrashIcon/></span>
            {t("space.delete_note","Delete Note")}
          </button>
        </>

      )}

      {/* MEMBERS */}

      {type==="member" && (

        <>
          <button
            className={styles.item}
            onClick={onChangeRole}
          >
            <span className={styles.contributorIcon}><ContributorIcon/></span>
            {t("space.change_role","Change Role")}
          </button>

          <button
            className={`${styles.item} ${styles.danger}`}
            onClick={onDelete}
          >
            <span className={styles.trashIcon}><TrashIcon/></span>
            {t("space.remove_member","Remove Member")}
          </button>
        </>

      )}

    </div>

  );
}