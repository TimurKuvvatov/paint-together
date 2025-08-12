import { createStore } from 'effector';

import {
	changeColor,
	changeSize,
	changeTool,
	pushToUndo,
	setRedoStack,
	setUndoStack,
	startDrawing,
	stopDrawing
} from './event';

export const $isDrawing = createStore(false)
	.on(startDrawing, () => true)
	.on(stopDrawing, () => false);

export const $tool = createStore<'brush' | 'eraser'>('brush').on(
	changeTool,
	(_, tool) => tool
);

export const $color = createStore<string>('#000000').on(
	changeColor,
	(_, color) => color
);

export const $size = createStore<number>(4).on(changeSize, (_, size) => size);

export const $undoStack = createStore<string[]>([])
	.on(pushToUndo, (state, snapshot) => [...state, snapshot])
	.on(setUndoStack, (_, newStack) => newStack);

export const $redoStack = createStore<string[]>([])
	.reset(pushToUndo)
	.on(setRedoStack, (_, newStack) => newStack);
