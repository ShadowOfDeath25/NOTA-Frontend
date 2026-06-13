export interface UserSettings {
    language: "english" | "arabic";
    theme: "dark" | "light";
    email_notifications: boolean;
    push_notifications: boolean;
    "2FA": boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    settings?: UserSettings;
    roles: Record<string, "admin" | "owner" | "viewer">;
}
