import styles from './SpaceNoteRow.module.css';
import ClockIcon from '@assets/icons/clock.svg?react';
import StarIcon from '@assets/icons/star.svg?react';
import StarFilledIcon from '@assets/icons/star-filled.svg?react';
import DotsIcon from '@assets/icons/dots.svg?react';
import DotsMenu from '../DotsMenu/DotsMenu.tsx';
import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCreate} from "@hooks/api/useCreate.ts";
import {AxiosClientV1} from "../../../axiosClient.ts";
import { useDelete } from "@hooks/api/useDelete.ts";
import { type UseMutationResult, useQueryClient } from "@tanstack/react-query";
import type {NoteData} from '@customTypes/NoteData';

interface SpaceNoteRowProps extends NoteData {
    tags?: string[];
}

export default function SpaceNoteRow({id, title, preview, date, starred, tags = []}: SpaceNoteRowProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isStarred, setIsStarred] = useState(starred);
    const [showMenu, setShowMenu] = useState(false);
    const queryClient = useQueryClient();
    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ["notes"]}).then();
        queryClient.invalidateQueries({queryKey: ["notes/favorites"]}).then();
        queryClient.invalidateQueries({queryKey: ["spaces"]}).then();
    };
    const createMutation = useCreate<UseMutationResult>(`notes/${id}/favorites`, {
        onSuccess
    });

    const deleteNoteMutation = useDelete('notes', {
        onSuccess,
    });
    
    function handleNoteClick() {

        navigate(`/notes/${id}`, {state: {note_title: title}});
    }

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsStarred(!isStarred);

          if (!isStarred) {
                    createMutation.mutate({});
                } else {
                    AxiosClientV1.delete(`notes/${id}/favorites`).then(onSuccess);
                }
    };
    const handleDotsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMenu((prev) => !prev)


    };
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
        <article
            className={styles.card}
            onClick={handleNoteClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNoteClick()}

        >
            <div className={styles.body}>
                {/* Title row */}
                <div className={styles.row}>
                    <div className={styles.titleRow}>


                        <h3 className={`${styles.title} bodyText`}>{title}</h3>
                        <button
                            className={styles.starBtn}
                            onClick={handleStarClick}

                        >
                            {isStarred ? <span className={styles.icon}><StarFilledIcon/></span> :
                                <span className={styles.starIcon}><StarIcon/></span>}
                        </button>

                    </div>

                    <div ref={menuRef} className={styles.dotsContainer}>
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
                                type="note"
                                date={date}

                                onDelete={() => {
                                    deleteNoteMutation.mutate(id);
                                    setShowMenu(false);
                                }}
                            />
                        )}
                    </div>

                </div>

                {/* Excerpt */}
                {preview && (
                    <p className={`${styles.excerpt} bodyTextSm`}>{preview}</p>
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
