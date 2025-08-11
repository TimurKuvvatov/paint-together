type InitCanvasProps = {
	canvas: HTMLCanvasElement;
	container: HTMLDivElement;
	width?: number;
	height?: number;
};

export const initCanvas = ({
	canvas,
	container,
	width = 1600,
	height = 900
}: InitCanvasProps) => {
	if (!canvas.dataset.initiated) {
		canvas.width = width;
		canvas.height = height;
		canvas.dataset.initiated = 'true';
	}

	canvas.style.width = `${container.clientWidth}px`;
	canvas.style.height = `${container.clientHeight}px`;
};
