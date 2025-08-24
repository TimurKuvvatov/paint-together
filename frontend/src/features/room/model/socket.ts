import { socket } from '@/shared/api/socket';

import type { User } from '../types/entities';

import { imageUpdated, usersUpdated } from './events';

socket.on('users:update', (users: User[]) => {
	usersUpdated(users);
	console.log('users', users);
});

socket.on('paint:draw', (dataUrl: string) => {
	imageUpdated(dataUrl);
});
