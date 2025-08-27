import { setCurrentImage } from '@/features/room/model/events';
import { $room } from '@/features/room/model/store';

import { pushToUndo, redo, setRedoStack, setUndoStack, undo } from './event';
import { $redoStack, $undoStack } from './store';

export const pushCurrentStateToUndo = (canvas: HTMLCanvasElement) => {
	try {
		const dataUrl = canvas.toDataURL();
		const undoStack = $undoStack.getState();

		if (undoStack.length > 0 && undoStack.at(-1) === dataUrl) {
			return;
		}

		pushToUndo(dataUrl);
		setRedoStack([]);
	} catch (error) {
		console.log(error);
	}
};

export const unsubUndo = (canvas: HTMLCanvasElement) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	return undo.watch(() => {
		const undoStack = $undoStack.getState();
		if (undoStack.length === 0) return;

		const currentDataUrl = canvas.toDataURL();
		const lastDataUrl = undoStack.at(-1);
		if (!lastDataUrl) return;

		drawImageFromDataUrl(canvas, ctx, lastDataUrl);
		setUndoStack(undoStack.slice(0, -1));
		setRedoStack([...$redoStack.getState(), currentDataUrl]);
	});
};

export const unsubRedo = (canvas: HTMLCanvasElement) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	return redo.watch(() => {
		const redoStack = $redoStack.getState();
		if (redoStack.length === 0) return;

		const currentDataUrl = canvas.toDataURL();
		const lastDataUrl = redoStack.at(-1);
		if (!lastDataUrl) return;

		drawImageFromDataUrl(canvas, ctx, lastDataUrl);
		setRedoStack(redoStack.slice(0, -1));
		setUndoStack([...$undoStack.getState(), currentDataUrl]);
	});
};

const drawImageFromDataUrl = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	dataUrl: string
) => {
	const img = new Image();
	img.src = dataUrl;
	img.onload = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		const roomId = $room.getState().id;
		if (roomId) {
			setCurrentImage({ roomId, dataUrl });
		}
	};
};
