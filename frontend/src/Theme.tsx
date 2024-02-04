import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { SubTheme, Theme, Question } from './interface';


const ThemeSelected = () => {
	const { id } = useParams();
	const [theme, setTheme] = useState<Theme | undefined>(undefined);
	const [subThemes, setSubThemes] = useState<SubTheme[]>([]);
	const [selectedSubTheme, setSelectedSubTheme] = useState<SubTheme | null>(null);
	const [allQuestions, setAllQuestions] = useState<Question[]>([]);
	const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>(''); // Nouvel état pour le terme de recherche

	useEffect(() => {
		const fetchData = async () => {
			try {
				const themeResponse = await fetch(`http://localhost:8080/themes/${id}`);
				if (themeResponse.ok) {
					const themeData = await themeResponse.json();
					setTheme(themeData);
				}
				const subThemesResponse = await fetch(`http://localhost:8080/themes/${id}/subthemes`);
				if (subThemesResponse.ok) {
					const subThemesData = await subThemesResponse.json();
					setSubThemes(subThemesData);
				}
				if (id) {
					await fetchQuestionsByThemeId(id);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		if (selectedSubTheme) {
			const filtered = allQuestions.filter((question) => question.subtheme.id === selectedSubTheme.id);
			setFilteredQuestions(filtered);
		} else {
			setFilteredQuestions(allQuestions);
		}
	}, [selectedSubTheme, allQuestions]);

	useEffect(() => {
		if (searchTerm) {
			const filtered = allQuestions.filter((question) =>
				question.guideline.indicator.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredQuestions(filtered);
		} else {
			setFilteredQuestions(allQuestions);
		}
	}, [searchTerm, allQuestions]);

	const fetchQuestionsByThemeId = async (themeId: string) => {
		try {
			const response = await fetch(`http://localhost:8080/themes/${themeId}/questions`);
			if (response.ok) {
				const data = await response.json();
				setAllQuestions(data);
			}
		} catch (error) {
			console.error('Error fetching questions by themeId:', error);
		}
	};

	const handleSubThemeChange = async (selectedSubTheme: SubTheme | null) => {
		setSelectedSubTheme(selectedSubTheme);
	};

	const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className='container'>
			<Button component={Link} to="/" variant="contained" color="secondary">
				{"< Back"}
			</Button>
			{theme && <h1>{theme.title}</h1>}
			<Autocomplete
				options={subThemes}
				getOptionLabel={(subTheme) => subTheme.title}
				style={{ width: 300 }}
				onChange={(event, value) => handleSubThemeChange(value)}
				renderInput={(params) => (
					<TextField {...params} label="Choose a sub-theme" variant="outlined" />
				)}
			/>
			<TextField
				label="Search by keyword"
				variant="outlined"
				value={searchTerm}
				onChange={handleSearchTermChange}
			/>
			<ul>
				{filteredQuestions.map((question: Question) => (
					<li key={question.id}>
						{question.guideline.indicator} : {question.result?.value}
					</li>
				))}
			</ul>
		</div>
	)
}

export default ThemeSelected;
