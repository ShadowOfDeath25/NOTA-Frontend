export type SpaceRole = 'admin' | 'contributor' | 'viewer';

export type SpaceGradient =   'blue-cyan' | 'green' |'purple-pink';

export type SpaceAccess = 'private' | 'public';

export interface Space {
  id: string;
  name: string;
  description: string;
  role: SpaceRole;
  memberCount: number;
  noteCount: number;
  gradient: SpaceGradient;
  access: SpaceAccess;
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
