import { createEvent } from 'effector';

export const startDrawing = createEvent();
export const stopDrawing = createEvent();

export const changeTool = createEvent<'brush' | 'eraser'>();
export const changeColor = createEvent<string>();
export const changeSize = createEvent<number>();

export const undo = createEvent();
export const redo = createEvent();

export const pushToUndo = createEvent<string>();
export const setUndoStack = createEvent<string[]>();
export const setRedoStack = createEvent<string[]>();
