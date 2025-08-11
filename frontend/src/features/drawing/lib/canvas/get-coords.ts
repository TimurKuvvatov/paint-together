type GetCoordsProps = {
	e: MouseEvent | TouchEvent;
	canvas: HTMLCanvasElement;
};

export const getCoords = ({ e, canvas }: GetCoordsProps) => {
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;

	let clientX: number;
	let clientY: number;

	if (e instanceof TouchEvent) {
		clientX = e.touches[0].clientX;
		clientY = e.touches[0].clientY;
	} else {
		clientX = e.clientX;
		clientY = e.clientY;
	}

	return {
		x: (clientX - rect.left) * scaleX,
		y: (clientY - rect.top) * scaleY
	};
};
