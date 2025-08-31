import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import { useUnit } from 'effector-react';

import { $room } from '../model/store';

const UserList = () => {
	const { users } = useUnit($room);

	return (
		<Space
			direction='vertical'
			size='small'>
			{users.map(user => (
				<Card
					key={user.id}
					size='small'
					style={{
						borderColor: user.role === 'host' ? 'gold' : undefined,
						borderWidth: '2px'
					}}>
					<Typography>
						{user.role === 'host' ? (
							<StarFilled style={{ marginRight: '5px' }} />
						) : (
							<UserOutlined style={{ marginRight: '5px' }} />
						)}
						{user.nickname}
					</Typography>
				</Card>
			))}
		</Space>
	);
};

export default UserList;
