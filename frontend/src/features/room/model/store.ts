import { createStore } from 'effector';

import type { Room } from '../types/entities';

import { imageUpdated, roomJoined, setNickname, usersUpdated } from './events';

export const $room = createStore<Room>({
	id: null,
	users: [],
	currentImage: null
});

export const $me = createStore<string>('');

$room
	.on(roomJoined, (_, payload) => ({
		id: payload.id,
		users: payload.users,
		currentImage: payload.currentImage
	}))
	.on(usersUpdated, (state, users) => ({
		...state,
		users
	}))
	.on(imageUpdated, (state, image) => ({
		...state,
		currentImage: image
	}));

$me.on(setNickname, (_, nickname) => nickname);
