import styles from "./WelcomeHeader.module.css"
import CloudIcon from "@assets/icons/cloud.svg?react"
import BellIcon from "@assets/icons/bell.svg?react"
import {useTranslation} from "react-i18next"
import {useEffect, useState, useRef, useCallback} from "react";
import {useAuth} from "@hooks/api/useAuth.ts";
import {echo} from "../../../echo.ts";
import {v4 as uuidv4} from "uuid";
import NotificationsList from "@components/Notifications/NotificationsList";
import type {NoteSummarizedEvent} from "@customTypes/Note.ts";
import type {Notification, NotificationType} from "@customTypes/Notification";
import {useQueryClient} from "@tanstack/react-query";


const WelcomeHeader = () => {
    const {t} = useTranslation()
    const {user} = useAuth()
    const userId = user?.data?.id
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const panelRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient()
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const addNotification = useCallback(
        (type: NotificationType, title: string, message: string, actionUrl?: string) => {
            const notification: Notification = {
                id: uuidv4(),
                type,
                title,
                message,
                isRead: false,
                createdAt: new Date().toISOString(),
                actionUrl,
            };
            setNotifications((prev) => [notification, ...prev]);
        },
        [],
    );

    useEffect(() => {
        if (!userId) return

        const channel = echo.private(`App.Models.User.${userId}`)

        channel.listen(".note.summarized", (e: NoteSummarizedEvent) => {
            queryClient.invalidateQueries({queryKey: ["notes"]}).then();
            queryClient.invalidateQueries({queryKey: ["notes/favorites"]}).then();

            addNotification(
                'summarize',
                t('notifications.summary_ready', 'Summary Ready'),
                t('notifications.summary_ready_desc', 'AI summary generated for your note'),
                `/notes/${e.note_id}`,
            );
        })
        channel.listen(".note.summarization_failed", () => {

            addNotification(
                'system',
                t('notifications.summary_failed', 'Summarization Failed'),
                t('notifications.summary_failed_desc', 'Could not generate summary. Please try again.'),
            );
        })

        channel.listen(".pdf.extracted", (e: NoteSummarizedEvent) => {
            addNotification(
                'summarize',
                t('notifications.pdf_extracted', 'PDF Extracted'),
                t('notifications.pdf_extracted_desc', 'PDF content has been extracted successfully'),
                `/notes/${e.note_id}`,
            );
        })
        channel.listen(".pdf.extraction_failed", () => {
            addNotification(
                'system',
                t('notifications.pdf_extraction_failed', 'PDF Extraction Failed'),
                t('notifications.pdf_extraction_failed_desc', 'Could not extract PDF content. Please try again.'),
            );
        })

        channel.error((error: Error) => {
            console.error("Channel subscription error:", error)
        })

        return () => {
            echo.leave(`App.Models.User.${userId}`)
        }
    }, [userId, t, addNotification])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target as Node)
            ) {
                setShowNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMarkAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? {...n, isRead: true} : n)),
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({...n, isRead: true})),
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <h1>{t("welcome_back", "Welcome back!")}</h1>
                <div className={styles.synced}>
                    <div className={styles.cloudIcon}>
                        <CloudIcon/>
                    </div>
                    <p className={`bodyTextSm ${styles.smallText}`}> {t("all_changes_synced", "All changes synced")}</p>
                </div>
            </div>
            <div className={styles.bellWrapper} ref={panelRef}>
                <div
                    className={styles.notification}
                    onClick={() => setShowNotifications((prev) => !prev)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowNotifications((prev) => !prev)}
                    aria-label={t('notifications.notifications', 'Notifications')}
                    aria-expanded={showNotifications}
                >
                    <BellIcon/>
                    {unreadCount > 0 && (
                        <span className={styles.badge}>{unreadCount}</span>
                    )}
                </div>

                {showNotifications && (
                    <div className={styles.panel}>
                        <NotificationsList
                            notifications={notifications}
                            isLoading={false}
                            isError={false}
                            onMarkAsRead={handleMarkAsRead}
                            onMarkAllAsRead={handleMarkAllAsRead}
                            onClose={() => setShowNotifications(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default WelcomeHeader