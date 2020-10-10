import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from '../article/article.module';
import { CategoryModule } from '../category/category.module';
import { configOptions } from '../config/config.options';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { graphqlOptions } from '../config/graphql.options';
import { mongooseOptions } from '../config/mongoose.options';
import { staticOptions } from '../config/static.options';
import { FeedModule } from '../feed/feed.module';
import { HealthModule } from '../health/health.module';
import { KeywordModule } from '../keyword/keyword.module';
import { LinkModule } from '../link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypegooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        ...mongooseOptions,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot(graphqlOptions),
    HealthModule,
    ServeStaticModule.forRoot(staticOptions),
    TerminusModule,
    ArticleModule,
    CategoryModule,
    KeywordModule,
    FeedModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
