import { randomUUID } from 'node:crypto';

export function generateUsername(prefix: string): string {
    return `${prefix}${randomUUID().replace(/-/g, '').slice(0, 8)}`;
}