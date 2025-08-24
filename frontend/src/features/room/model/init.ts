import { sample } from 'effector';

import { createRoomFx, joinRoomFx, setCurrentImageFx } from './effects';
import { createRoom, joinRoom, roomJoined, setCurrentImage } from './events';

sample({
	clock: createRoom,
	target: createRoomFx
});

sample({
	clock: joinRoom,
	target: joinRoomFx
});

sample({
	clock: [createRoomFx.doneData, joinRoomFx.doneData],
	target: roomJoined
});

sample({
	clock: setCurrentImage,
	target: setCurrentImageFx
});
