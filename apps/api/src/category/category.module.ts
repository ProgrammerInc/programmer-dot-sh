import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from '@programmer/config';
import { Article, Category, Feed, Keyword, Link } from '@programmer/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

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
