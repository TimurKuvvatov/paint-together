import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';
import { useUnit } from 'effector-react';

import { $room } from '../model/store';

const UserList = () => {
	const { users } = useUnit($room);

	return (
		<Flex
			style={{
				width: '200px',
				background: '#fff',
				flexDirection: 'column',
				alignSelf: 'start',
				gap: '10px',
				padding: '5px',
				borderRadius: '10px',
				maxHeight: '90%',
				overflowY: 'auto'
			}}>
			<Typography.Title
				level={2}
				style={{ textAlign: 'center', margin: 0 }}>
				Artists
			</Typography.Title>
			{users.map(user => (
				<Card
					key={user.id}
					size='small'
					style={{
						borderColor: user.role === 'host' ? 'gold' : '#bcbcbc',
						borderWidth: '2px'
					}}>
					<Flex
						gap={5}
						align='center'
						style={{ alignItems: 'center' }}>
						<span
							style={{
								width: '18px',
								height: '18px',
								border: '1px solid #bcbcbc',
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: '50%'
							}}>
							{user.role === 'host' ? (
								<StarFilled style={{ color: 'gold' }} />
							) : (
								<UserOutlined style={{ color: '#bcbcbc' }} />
							)}
						</span>
						<Typography.Text>{user.nickname}</Typography.Text>
					</Flex>
				</Card>
			))}
		</Flex>
	);
};

export default UserList;
