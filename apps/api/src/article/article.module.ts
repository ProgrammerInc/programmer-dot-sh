import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { redisOptions } from '../config/redis.options';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';

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
        { typegooseClass: Keyword },
      ],
      DATABASE_CONNECTION,
    ),
  ],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
