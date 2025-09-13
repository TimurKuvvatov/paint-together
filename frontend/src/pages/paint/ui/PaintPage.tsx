import { Layout } from 'antd';

import { Canvas } from '@/features/drawing';
import UserList from '@/features/room/ui/UserList';
import { ToolBar } from '@/features/toolbar/ui/ToolBar';

export const PaintPage = () => (
	<Layout
		style={{
			height: '100vh',
			width: '100vw',
			backgroundColor: '#ffffffff',
			display: 'flex',
			justifyContent: 'center',
			padding: '10px 100px',
			alignItems: 'center'
		}}>
		<Layout
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				background: '#e6e6e6ff',
				padding: '10px',
				width: '100%',
				borderRadius: '10px',
				gap: '20px',
				minHeight: 'auto',
				flex: '0'
			}}>
			<UserList />
			<Canvas />
			<ToolBar />
		</Layout>
	</Layout>
);
