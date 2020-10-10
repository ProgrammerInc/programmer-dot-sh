import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { KeywordResolver } from './keyword.resolver';
import { KeywordService } from './keyword.service';
import { Keyword } from './models/keyword.model';

@Module({
  imports: [
    TypegooseModule.forFeature(
      [
        { typegooseClass: Category, schemaOptions: { timestamps: true } },
        { typegooseClass: Keyword },
      ],
      DATABASE_CONNECTION,
    ),
  ],
  providers: [KeywordResolver, KeywordService],
})
export class KeywordModule {}
