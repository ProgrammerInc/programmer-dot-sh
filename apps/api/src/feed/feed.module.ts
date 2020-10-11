import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DATABASE_CONNECTION, redisOptions } from '@programmer/config';
import { Article, Category, Feed } from '@programmer/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';

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
