import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { Link } from '../link/models/link.model';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Module({
  imports: [
    TypegooseModule.forFeature(
      [
        { typegooseClass: Article, schemaOptions: { timestamps: true } },
        { typegooseClass: Category, schemaOptions: { timestamps: true } },
        { typegooseClass: Feed, schemaOptions: { timestamps: true } },
        { typegooseClass: Link, schemaOptions: { timestamps: true } },
        { typegooseClass: Keyword },
      ],
      DATABASE_CONNECTION,
    ),
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
