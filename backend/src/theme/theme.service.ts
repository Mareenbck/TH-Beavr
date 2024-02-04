import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThemeService {
	constructor(private readonly prisma: PrismaService) { }
	async getThemes() {
		try {
			const allThemes = await this.prisma.theme.findMany({});
			return allThemes;
		} catch (error) {
			throw new BadRequestException('getThemes error : ' + error);
		}
	}

	async getThemeById(id: number) {
		const theme = await this.prisma.theme.findUnique({
			where: {
				id: id,
			},
		});
		return theme;
	}

	async getSubThemesByThemeId(themeId: number) {
		const subThemes = await this.prisma.subTheme.findMany({
			where: {
				question: {
					some: {
						themeId: themeId,
					},
				},
			},
		});
		return subThemes;
	}

	async getQuestionsByThemeId(themeId: number) {
		try {
			const questions = await this.prisma.question.findMany({
				where: {
					themeId: themeId,
				},
				include: {
					theme: true,
					subtheme: true,
					guideline: true,
				},
			});
			return questions;
		} catch (error) {
			console.error('Error fetching questions by themeId:', error);
			throw error;
		}
	}
}
