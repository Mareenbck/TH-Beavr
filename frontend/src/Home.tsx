import './App.css';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Theme } from './interface';


const Home = () => {
	const [themes, setThemes] = useState<Theme[]>([]);

	useEffect(() => {
		const fetchThemes = async () => {
			try {
				const response = await fetch('http://localhost:8080/themes');
				const data = await response.json();
				setThemes(data);
			} catch (error) {
				console.error('Error fetching themes:', error);
			}
		};

		fetchThemes();
	}, []);

	return (
		<div className='container'>
			<h2>Choose your Theme</h2>
			{themes.map((theme) => (
				<Button key={theme.id} component={Link} to={`/themes/${theme.id}`} variant="contained" color="primary">
					{theme.title}
				</Button>
			))}
		</div>
	)

}

export default Home;
