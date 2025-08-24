import { createEvent } from 'effector';

import type { Room, User } from '../types/entities';

export const setNickname = createEvent<string>();
export const createRoom = createEvent<string>();
export const joinRoom = createEvent<{ roomId: string; nickname: string }>();

export const roomJoined = createEvent<Room>();
export const imageUpdated = createEvent<string>();
export const usersUpdated = createEvent<User[]>();

export const setCurrentImage = createEvent<{
	roomId: string;
	dataUrl: string;
}>();
