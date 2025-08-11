import {
	DeleteOutlined,
	EditFilled,
	LeftCircleTwoTone,
	RightCircleTwoTone
} from '@ant-design/icons';
import { Button, Col, Row, Slider, Typography, Space, Flex } from 'antd';
import { useUnit } from 'effector-react';

import {
	$color,
	$size,
	$tool,
	changeColor,
	changeSize,
	changeTool
} from '@/features/drawing/model';

import { COLORS } from '../constants/colors';

const { Text } = Typography;

export const ToolBar = () => {
	const [color, size, tool] = useUnit([$color, $size, $tool]);

	const onChangeTool = useUnit(changeTool);
	const onChangeColor = useUnit(changeColor);
	const onChangeSize = useUnit(changeSize);

	return (
		<Flex
			vertical
			style={{
				height: '100%',
				width: 220,
				padding: 16,
				borderRight: '1px solid #000',
				background: '#fff',
				overflowX: 'auto'
			}}
			gap={20}>
			<Row
				gutter={8}
				wrap>
				<Col xs={12}>
					<Button
						type={tool === 'brush' ? 'primary' : 'default'}
						icon={<EditFilled />}
						block
						onClick={() => onChangeTool('brush')}>
						Brush
					</Button>
				</Col>
				<Col xs={12}>
					<Button
						type={tool === 'eraser' ? 'primary' : 'default'}
						icon={<DeleteOutlined />}
						block
						onClick={() => onChangeTool('eraser')}>
						Eraser
					</Button>
				</Col>
			</Row>
			<Row wrap>
				<Col xs={12}>
					<Button
						block
						icon={<LeftCircleTwoTone />}
					/>
				</Col>
				<Col xs={12}>
					<Button
						block
						icon={<RightCircleTwoTone />}
					/>
				</Col>
			</Row>
			<Space
				direction='vertical'
				style={{ width: '100%' }}>
				<Text strong>Brush Size: {size}</Text>
				<Slider
					min={1}
					max={20}
					step={1}
					value={size}
					onChange={onChangeSize}
				/>
			</Space>

			<Space
				direction='vertical'
				style={{ width: '100%' }}>
				<Text strong>Colors</Text>
				<Row gutter={[10, 10]}>
					{COLORS.map(c => (
						<Col key={c}>
							<button
								onClick={() => onChangeColor(c)}
								style={{
									width: '35px',
									aspectRatio: '1 / 1',
									borderRadius: 5,
									backgroundColor: c,
									border: c === color ? '3px solid black' : '1px solid gray',
									cursor: 'pointer'
								}}
							/>
						</Col>
					))}
				</Row>
				<input
					type='color'
					onChange={e => onChangeColor(e.target.value)}
					value={color}
					style={{
						width: '100%',
						height: 50,
						borderRadius: 4,
						border: '1px solid black',
						cursor: 'pointer'
					}}
				/>
			</Space>
		</Flex>
	);
};
