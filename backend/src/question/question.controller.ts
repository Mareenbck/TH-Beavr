import { Controller, Get, Query } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
	constructor(private questionService: QuestionService) { }

	@Get('/')
	async getAllQuestions() {
		const getAllQuestions = await this.questionService.getQuestions();
		return getAllQuestions;
	}
}
