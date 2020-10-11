import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from '@programmer/config';
import { Category, Link } from '@programmer/models';
import { TypegooseModule } from 'nestjs-typegoose';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';

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
