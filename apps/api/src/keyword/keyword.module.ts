import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from '@programmer/config';
import { Category, Keyword } from '@programmer/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { KeywordResolver } from './keyword.resolver';
import { KeywordService } from './keyword.service';

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
