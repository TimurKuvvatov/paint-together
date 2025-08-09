export type DrawStartProps = {
	color: string;
	size: number;
	tool: 'brush' | 'eraser';
	x: number;
	y: number;
	ctx: CanvasRenderingContext2D;
};

export type DrawMoveProps = {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
};
