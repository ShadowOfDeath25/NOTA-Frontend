import EmptyTrash from "./EmptyTrash/EmptyTrash";
import styles from "./Trash.module.css";
import WarningIcon from "@assets/icons/warning.svg?react";
import TrashCard from "./TrashCard/TrashCard";
import { useTranslation } from "react-i18next";
import { useRead } from "@hooks/api/useRead.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Note } from "@customTypes/Note.ts";
import { AxiosClientV1 } from "../../axiosClient.ts";

export default function Trash() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { data: notes } = useRead<UseQueryResult<Note[]>>("notes/trashed");

    const restoreMutation = useMutation({
        mutationFn: (noteId: string) => AxiosClientV1.post(`/notes/${noteId}/restore`),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["notes/trashed"]}),
    });

    const forceDeleteMutation = useMutation({
        mutationFn: (noteId: string) => AxiosClientV1.delete(`/notes/${noteId}/force`),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["notes/trashed"]}),
    });
    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.header} `}>
                <h1 >{t("Trash.Trash", "Trash")}</h1>
                <div className={`${styles.description}`}>
                    <div className={`${styles.icon}`}>
                        <WarningIcon />
                    </div>  
                    <p className={`${styles.descriptionText} bodyTextSm`}>{t("Trash.Items_in_trash_are_automatically_deleted_after_30_days", "Items in trash are automatically deleted after 30 days")}</p>
                    
                </div>
            </div>
            <>
            <div className={`${styles.deletedNotesContainer}`}>
           {(notes?.data?.length ?? 0) === 0 ? <div className={`${styles.emptyTrashContainer}`}>
             <EmptyTrash />
             </div>
             : notes?.data?.map((note) => (
                <div className={styles.cardContainer} key={note.id}>
                <TrashCard title={note.title} deletedDate={note.deleted_at ?? note.created_at} onRestore={() => restoreMutation.mutate(note.id)} onPermanentDelete={() => forceDeleteMutation.mutate(note.id)} />
                </div>
            ))}
          
            </div>

            </>
        </div>
    );
}