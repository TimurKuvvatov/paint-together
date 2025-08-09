type InitCanvasProps = {
	canvas: HTMLCanvasElement;
	container: HTMLDivElement;
};

export const initCanvas = ({ canvas, container }: InitCanvasProps) => {
	const dpr = window.devicePixelRatio || 1;
	const rect = container.getBoundingClientRect();

	canvas.width = rect.width * dpr;
	canvas.height = rect.height * dpr;
	canvas.style.width = `${rect.width}px`;
	canvas.style.height = `${rect.height}px`;

	const ctx = canvas.getContext('2d');
	if (ctx) {
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	}
};
