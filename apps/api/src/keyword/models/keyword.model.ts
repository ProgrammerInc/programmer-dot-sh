import { Field, ObjectType } from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';
import { CreateKeywordInput } from '../dto/create-keyword.input';
import { UpdateKeywordInput } from '../dto/update-keyword.input';

@ObjectType()
export class Keyword {
  @Field()
  public id: string;

  @Field()
  @prop({ required: true, unique: true, index: true })
  public name: string;

  @Field({ nullable: true })
  @prop()
  public tag?: string;

  constructor(keyword: CreateKeywordInput | UpdateKeywordInput) {
    this.name = keyword.name;
    this.tag = keyword.tag;
  }
}
