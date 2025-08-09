import { startDrawing } from '../../model';
import type { DrawStartProps } from '../../types';

export const drawStart = ({ color, size, tool, x, y, ctx }: DrawStartProps) => {
	ctx.strokeStyle = tool === 'brush' ? color : '#ffffff';
	ctx.lineWidth = size;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(x, y);
	startDrawing();
};
