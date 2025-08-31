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
	changeTool,
	redo,
	undo
} from '@/features/drawing/model';
import { $redoStack, $undoStack } from '@/features/drawing/model/store';

import { COLORS } from '../constants/colors';

const { Text } = Typography;

export const ToolBar = () => {
	const [color, size, tool] = useUnit([$color, $size, $tool]);
	const [onChangeTool, onChangeColor, onChangeSize] = useUnit([
		changeTool,
		changeColor,
		changeSize
	]);

	const [onUndo, onRedo] = useUnit([undo, redo]);

	const [undoStack, redoStack] = useUnit([$undoStack, $redoStack]);

	return (
		<Flex
			style={{
				width: '200px',
				maxWidth: '200px',
				flexDirection: 'column',
				padding: 16,
				background: '#fff',
				borderRadius: '10px',
				overflowY: 'auto',
				alignSelf: 'start'
			}}>
			<Space direction='vertical'>
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
				<Row
					gutter={8}
					wrap>
					<Col xs={12}>
						<Button
							block
							disabled={undoStack.length === 0}
							icon={<LeftCircleTwoTone />}
							onClick={() => onUndo()}
						/>
					</Col>
					<Col xs={12}>
						<Button
							block
							disabled={redoStack.length === 0}
							icon={<RightCircleTwoTone />}
							onClick={() => onRedo()}
						/>
					</Col>
				</Row>
			</Space>
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

			<Flex
				style={{
					width: '100%',
					height: '100%',
					flexDirection: 'column',
					gap: '10px'
				}}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, 40px)',
						justifyContent: 'center',
						gap: '10px'
					}}>
					{COLORS.map(c => (
						<button
							key={c}
							onClick={() => onChangeColor(c)}
							style={{
								width: '40px',
								aspectRatio: '1 / 1',
								borderRadius: '50%',
								backgroundColor: c,
								border: c === color ? '3px solid black' : '1px solid gray',
								cursor: 'pointer'
							}}
						/>
					))}
				</div>
			</Flex>
		</Flex>
	);
};
