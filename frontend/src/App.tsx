import './App.css';
import { Route, Routes } from 'react-router-dom';
import Theme from './Theme';
import Home from './Home';

function App() {
	return (
		<>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path={`/themes/:id`} element={<Theme />} />
		</Routes>
		</>
	);
}

export default App;
