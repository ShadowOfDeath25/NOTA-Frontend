import type { SpaceGradient } from '@customTypes/Space';

const GRADIENTS: SpaceGradient[] = ['blue-cyan', 'green', 'purple-pink'];

export function getGradient(gradient: SpaceGradient | null | undefined, spaceId: string): SpaceGradient {
    if (gradient) return gradient;
    const sum = spaceId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return GRADIENTS[sum % GRADIENTS.length];
}
