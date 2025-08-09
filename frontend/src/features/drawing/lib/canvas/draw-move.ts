import type { DrawMoveProps } from '../../types';

export const drawMove = ({ ctx, x, y }: DrawMoveProps) => {
	ctx.lineTo(x, y);
	ctx.stroke();
};
