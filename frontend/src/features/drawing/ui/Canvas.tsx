import { useEffect, useRef, type MouseEvent } from 'react';

import { Box } from '@mui/material';
import { useUnit } from 'effector-react';

import { drawEnd } from '@/features/drawing/lib/canvas/draw-end';
import { drawMove } from '@/features/drawing/lib/canvas/draw-move';
import { drawStart } from '@/features/drawing/lib/canvas/draw-start';
import { getCoords } from '@/features/drawing/lib/canvas/get-coords';
import { initCanvas } from '@/features/drawing/lib/canvas/init-canvas';
import { $color, $isDrawing, $size, $tool } from '@/features/drawing/model';

export const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const [isDrawing, color, size, tool] = useUnit([
		$isDrawing,
		$color,
		$size,
		$tool
	]);

	const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const coords = getCoords({ e, canvas });
		if (!coords) return;
		const { x, y } = coords;

		drawStart({ color, size, tool, x, y, ctx });
	};

	const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const coords = getCoords({ e, canvas });
		if (!coords) return;
		const { x, y } = coords;

		drawMove({ ctx, x, y });
	};

	const handleMouseUp = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		drawEnd(ctx);
	};

	useEffect(() => {
		if (canvasRef.current && containerRef.current) {
			initCanvas({
				canvas: canvasRef.current,
				container: containerRef.current
			});
		}
	}, []);

	return (
		<Box
			ref={containerRef}
			sx={{
				width: '90%',
				offset: '3/4',
				border: '1px solid #000',
				display: 'flex',
				justifyContent: 'center'
			}}>
			<canvas
				style={{ width: '100%', height: '100%' }}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				ref={canvasRef}
			/>
		</Box>
	);
};
