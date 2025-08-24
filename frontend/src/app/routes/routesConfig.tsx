import { HomePage } from '@/pages/home/ui/HomePage';
import { PaintPage } from '@/pages/paint';

export const routes = [
	{ path: '/', element: <HomePage /> },
	{ path: '/room/:roomId', element: <PaintPage /> }
];
