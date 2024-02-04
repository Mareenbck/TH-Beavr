import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';

@Module({
  	providers: [ThemeService],
  	imports: [PrismaModule],
	controllers: [ThemeController],
	exports: [ThemeService],
})
export class ThemeModule {}
