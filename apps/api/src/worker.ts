import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { WorkerModule } from './worker/worker.module';

dotenv.config();

const logger = new Logger('NewsMicroservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerModule,
    {
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
    },
  );

  app.listen(() =>
    logger.log('Programmer News Feed microservice is listening'),
  );
}
bootstrap();
