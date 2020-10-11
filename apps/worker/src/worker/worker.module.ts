import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  configOptions,
  DATABASE_CONNECTION,
  mongooseOptions,
  redisOptions,
} from '@programmer/config';
import { HealthModule } from '@programmer/health';
import { Article, Feed } from '@programmer/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_FEED_WORKER',
        transport: Transport.REDIS,
        options: redisOptions,
      },
    ]),
    ConfigModule.forRoot(configOptions),
    HealthModule,
    TypegooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        ...mongooseOptions,
      }),
      inject: [ConfigService],
    }),
    TypegooseModule.forFeature(
      [
        { typegooseClass: Article, schemaOptions: { timestamps: true } },
        { typegooseClass: Feed, schemaOptions: { timestamps: true } },
      ],
      DATABASE_CONNECTION,
    ),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
