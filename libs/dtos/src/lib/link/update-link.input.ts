import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { DEFAULT_VALIDATIONS } from '@programmer/config';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateLinkInput } from './create-link.input';

@InputType()
export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  path?: string;

  @Field({ nullable: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MinLength(DEFAULT_VALIDATIONS.URL_MIN_LENGTH)
  @MaxLength(DEFAULT_VALIDATIONS.URL_MAX_LENGTH)
  url?: string;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  urlCode?: string;
}
