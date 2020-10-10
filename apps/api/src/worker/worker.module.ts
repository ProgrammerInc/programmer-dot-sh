import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import { Article } from '../article/models/article.model';
import { configOptions } from '../config/config.options';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { typegooseOptions } from '../config/mongoose.options';
import { redisOptions } from '../config/redis.options';
import { FeedModule } from '../feed/feed.module';
import { FeedService } from '../feed/feed.service';
import { Feed } from '../feed/models/feed.model';
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
    TypegooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost/programmer-dot-sh',
      typegooseOptions,
    ),
    TypegooseModule.forFeature(
      [
        { typegooseClass: Article, schemaOptions: { timestamps: true } },
        { typegooseClass: Feed, schemaOptions: { timestamps: true } },
      ],
      DATABASE_CONNECTION,
    ),
    ArticleModule,
    FeedModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService, ArticleService, FeedService],
})
export class WorkerModule {}
