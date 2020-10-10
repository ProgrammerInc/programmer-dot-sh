import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';
import { Link } from './models/link.model';

@Module({
  imports: [
    TypegooseModule.forFeature(
      [
        { typegooseClass: Category, schemaOptions: { timestamps: true } },
        { typegooseClass: Link, schemaOptions: { timestamps: true } },
      ],
      DATABASE_CONNECTION,
    ),
  ],
  providers: [LinkResolver, LinkService],
})
export class LinkModule {}
