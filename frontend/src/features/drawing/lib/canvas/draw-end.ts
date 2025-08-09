import { stopDrawing } from '../../model';

export const drawEnd = (ctx: CanvasRenderingContext2D) => {
	ctx.closePath();
	stopDrawing();
};
