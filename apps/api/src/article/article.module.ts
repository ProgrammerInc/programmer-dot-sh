import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DATABASE_CONNECTION, redisOptions } from '@programmer/config';
import { Article, Category, Feed, Keyword } from '@programmer/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

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
