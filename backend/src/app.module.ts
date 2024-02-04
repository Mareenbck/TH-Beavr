import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ThemeModule } from './theme/theme.module';
import { QuestionModule } from './question/question.module';

@Module({
	imports: [PrismaModule, ThemeModule, QuestionModule],
	providers: [ThemeModule, QuestionModule],
})
export class AppModule {}
