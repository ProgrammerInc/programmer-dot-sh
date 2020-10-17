import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateKeywordInput } from './create-keyword.input';

@InputType()
export class UpdateKeywordInput extends PartialType(CreateKeywordInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field({ nullable: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tag?: string;
}
