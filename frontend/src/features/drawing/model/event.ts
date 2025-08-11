import { createEvent } from 'effector';

export const startDrawing = createEvent();
export const stopDrawing = createEvent();

export const changeTool = createEvent<'brush' | 'eraser'>();
export const changeColor = createEvent<string>();
export const changeSize = createEvent<number>();
