import { useEffect, useRef } from 'react';

import { Layout } from 'antd';
import { useUnit } from 'effector-react';

import { $room } from '@/features/room/model/store';

import { initCanvas } from '../lib/canvas/init-canvas';
import { setupCanvasListenersFx } from '../model/effects';

export const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const innerContainerRef = useRef<HTMLDivElement | null>(null);

	const room = useUnit($room);
	const currentImage = room.currentImage;

	useEffect(() => {
		if (currentImage && canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d');
			const img = new Image();
			img.src = currentImage;
			img.onload = () => {
				ctx?.clearRect(
					0,
					0,
					canvasRef.current!.width,
					canvasRef.current!.height
				);
				ctx?.drawImage(img, 0, 0);
			};
		}
	}, [currentImage]);

	useEffect(() => {
		if (!canvasRef.current) return;

		const abortController = new AbortController();
		const { signal } = abortController;

		setupCanvasListenersFx({ canvas: canvasRef.current, signal });

		return () => {
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		if (!canvasRef.current || !innerContainerRef.current) return;

		const resizeCanvas = () => {
			initCanvas({
				canvas: canvasRef.current!,
				container: innerContainerRef.current!
			});
		};

		resizeCanvas();

		const resizeObserver = new ResizeObserver(() => {
			resizeCanvas();
		});

		resizeObserver.observe(innerContainerRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<Layout.Content
			style={{
				position: 'relative',
				flex: '1',
				maxWidth: '100%',
				maxHeight: '100%'
			}}>
			<div
				ref={innerContainerRef}
				style={{
					position: 'relative',
					maxHeight: '100%',
					maxWidth: '100%',
					aspectRatio: '16 / 9'
				}}>
				<canvas
					ref={canvasRef}
					style={{
						border: '1px solid #000',
						backgroundColor: '#fff',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%'
					}}
					width={1600}
					height={900}
				/>
			</div>
		</Layout.Content>
	);
};
