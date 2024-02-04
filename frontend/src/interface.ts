
export interface SubTheme {
	id: number,
	title: string,
	question?: Question[]
}

export interface Theme {
	id: number;
	title: string;
	question?: Question[];
}

export interface Guideline {
	id: number,
	indicator: string,
	description?: string
}

export interface Question {
	id: number,
	theme: Theme,
	subtheme: SubTheme,
	guideline: Guideline,
	result?: {
		value: string
		unit: string
	}
}
