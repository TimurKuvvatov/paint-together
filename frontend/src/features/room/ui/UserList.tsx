import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';

import type { User } from '../types/entities';

type UserListProps = {
	users: User[];
};

const UserList = ({ users }: UserListProps) => (
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

export default UserList;
