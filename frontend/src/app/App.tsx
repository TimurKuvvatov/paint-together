import 'antd/dist/reset.css';
import '../features/room/model/init';
import '../features/room/model/socket';
import { Routing } from './routes';

const App = () => <Routing />;

export default App;
