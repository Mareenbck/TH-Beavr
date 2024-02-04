import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe( {
// 		whitelist: true,
// 		}
// 	));
	app.enableCors({
	});
	app.get(PrismaService);
  await app.listen(8080);
}
bootstrap();
