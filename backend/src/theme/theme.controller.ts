import { Controller, Get, Param } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller('themes')
export class ThemeController {
	constructor(private themeService: ThemeService) { }

	@Get('/')
	async getAllThemes() {
		const allThemes = await this.themeService.getThemes();
		return allThemes;
	}

	@Get('/:id')
	async getOneTheme(@Param('id') id: string) {
		const theme = await this.themeService.getThemeById(parseInt(id));
		return theme;
	}

	@Get('/:id/subthemes')
	async getSubThemesByTheme(@Param('id') id: string) {
		const subThemes = await this.themeService.getSubThemesByThemeId(parseInt(id));
		return subThemes;
	}

	@Get(':id/questions')
	async getQuestionsByThemeId(@Param('id') themeId: string) {
		try {
			const questions = await this.themeService.getQuestionsByThemeId(parseInt(themeId));
			return questions;
		} catch (error) {
			console.error('Error fetching questions by themeId:', error);
			throw error;
		}
	}
}
