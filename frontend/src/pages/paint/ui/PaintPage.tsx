import { Stack } from '@mui/material';

import { Canvas } from '@/features/drawing';

export const PaintPage = () => (
	<Stack
		alignItems='center'
		justifyContent='center'
		width='100vw'
		height='100vh'>
		<Canvas />
	</Stack>
);
