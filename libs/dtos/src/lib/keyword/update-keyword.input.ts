import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateKeywordInput } from './create-keyword.input';

@InputType()
export class UpdateKeywordInput extends PartialType(CreateKeywordInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  tag?: string;
}
