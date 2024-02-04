import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
	constructor(private readonly prisma: PrismaService) { }
	async getQuestions() {
		try {
			const allThemes = await this.prisma.question.findMany({});
			return allThemes;
		} catch (error) {
			throw new BadRequestException('getThemes error : ' + error);
		}
	}

	async getQuestionByThemeId(themeId: number) {
		console.log(themeId)
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
	}


}
