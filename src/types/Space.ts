export type SpaceRole = 'admin' | 'editor' | 'viewer' | 'owner';

export type SpaceGradient = 'blue-cyan' | 'green' | 'purple-pink';

export type SpaceAccess = 'private' | 'public';

export interface Space {
    pivot: SpaceUserPivot;
    notes_count: number;
    id: string;
    name: string;
    description: string;
    role: SpaceRole;
    users_count: number;

    gradient: SpaceGradient;
    access: SpaceAccess;
}

export interface SpaceUserPivot {
    role: SpaceRole
    user_id: string
    space_id: string
    joined_at: string
}

export interface SpaceUser {
    id: string;
    name: string;
    email: string;
    pivot: SpaceUserPivot;
}

export interface SpaceMember {
    id: string;
    name: string;
    email: string;
    initials: string;
    avatarGradient: string;
    role: SpaceRole;
    joinedDate: string;
    isOnline: boolean;
    isCurrentUser?: boolean;
}
