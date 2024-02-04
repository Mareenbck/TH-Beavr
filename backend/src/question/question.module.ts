import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
	providers: [QuestionService],
	imports: [PrismaModule],
	controllers: [QuestionController],
	exports: [QuestionService],
})
export class QuestionModule { }
