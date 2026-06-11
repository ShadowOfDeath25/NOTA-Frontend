export type NotificationType = 'summarize' | 'invitation' | 'system';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    actionUrl?: string;
    actor?: {
        name: string;
        initials: string;
        avatarGradient: string;
    };
}
