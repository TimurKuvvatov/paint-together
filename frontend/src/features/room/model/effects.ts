import { createEffect } from 'effector';

import { socket } from '@/shared/api/socket';

import type { Room } from '../types/entities';

export const createRoomFx = createEffect<string, Room>(
	nickname =>
		new Promise((resolve, reject) => {
			socket.emit(
				'room:create',
				nickname,
				(res: { ok: true; roomId: string }) => {
					if (res.ok) {
						resolve({ id: res.roomId, users: [], currentImage: null });
					} else {
						reject(new Error('Room creation failed'));
					}
				}
			);
		})
);

export const joinRoomFx = createEffect<
	{ roomId: string; nickname: string },
	Room
>(
	({ roomId, nickname }) =>
		new Promise((resolve, reject) => {
			socket.emit('room:join', { roomId, nickname }, (res: { ok: boolean }) => {
				if (res.ok) {
					resolve({ id: roomId, users: [], currentImage: null });
				} else {
					reject(new Error('Room join failed'));
				}
			});
		})
);

export const setCurrentImageFx = createEffect<
	{ roomId: string; dataUrl: string },
	void
>(({ roomId, dataUrl }) => {
	socket.emit('paint:draw', { roomId, dataUrl });
});
