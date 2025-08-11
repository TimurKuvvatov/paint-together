import { Layout } from 'antd';

import { Canvas } from '@/features/drawing';
import { ToolBar } from '@/features/toolbar/ui/ToolBar';

export const PaintPage = () => (
	<Layout
		style={{
			height: '100vh',
			width: '100vw',
			backgroundColor: '#8c00ffff',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
		<Layout
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				background: 'none',
				width: '100%',
				padding: '10px 100px'
			}}>
			<ToolBar />
			<Canvas />
		</Layout>
	</Layout>
);
