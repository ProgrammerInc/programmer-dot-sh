import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { Category } from '../category/models/category.model';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { redisOptions } from '../config/redis.options';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_FEED_WORKER',
        transport: Transport.REDIS,
        options: redisOptions,
      },
    ]),
    TypegooseModule.forFeature(
      [
        { typegooseClass: Article, schemaOptions: { timestamps: true } },
        { typegooseClass: Category, schemaOptions: { timestamps: true } },
        { typegooseClass: Feed, schemaOptions: { timestamps: true } },
      ],
      DATABASE_CONNECTION,
    ),
  ],
  providers: [FeedResolver, FeedService],
})
export class FeedModule {}
