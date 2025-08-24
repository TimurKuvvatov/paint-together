import { useEffect, useState } from 'react';

import {
	Button,
	Col,
	Input,
	Layout,
	Row,
	Space,
	Typography,
	message
} from 'antd';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router';

import {
	createRoom,
	joinRoom,
	setNickname
} from '@/features/room/model/events';
import { $me, $room } from '@/features/room/model/store';

export const HomePage = () => {
	const [roomLink, setRoomLink] = useState('');
	const [nickname, room] = useUnit([$me, $room]);
	const navigate = useNavigate();

	useEffect(() => {
		if (room.id && nickname) {
			navigate(`/room/${room.id}?nickname=${encodeURIComponent(nickname)}`);
		}
	}, [room.id, nickname]);

	const handleCreate = () => {
		if (!nickname.trim()) return;
		createRoom(nickname);
	};

	const handleJoin = () => {
		if (!nickname.trim()) return message.error('Введите никнейм');
		const roomId = roomLink.split('/').pop() || roomLink;
		joinRoom({ roomId, nickname });
	};

	return (
		<Layout.Content
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				minHeight: '100vh',
				padding: '20px'
			}}>
			<Row
				justify='center'
				style={{ width: '100%' }}>
				<Col
					xs={22}
					sm={16}
					md={12}
					lg={8}>
					<Typography.Title>Paint Together</Typography.Title>
					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}>
						<Input
							size='large'
							placeholder='Ваш ник'
							value={nickname}
							onChange={e => setNickname(e.target.value)}
						/>
						<Button
							size='large'
							type='primary'
							onClick={handleCreate}
							block>
							Создать комнату
						</Button>

						<Input
							size='large'
							placeholder='Ссылка или ID комнаты'
							value={roomLink}
							onChange={e => setRoomLink(e.target.value)}
						/>
						<Button
							size='large'
							onClick={handleJoin}
							block>
							Подключиться к комнате
						</Button>
					</Space>
				</Col>
			</Row>
		</Layout.Content>
	);
};
