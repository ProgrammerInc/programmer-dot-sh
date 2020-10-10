import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DEFAULT_VALIDATIONS } from '../../config/validation.options';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  content?: string;

  @Field({ nullable: true })
  @IsString()
  author?: string;

  @Field({ nullable: true })
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsString()
  logo?: string;

  @Field({ nullable: true })
  @IsString()
  lang?: string;

  @Field({ nullable: true })
  @IsString()
  path?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MinLength(DEFAULT_VALIDATIONS.URL_MIN_LENGTH)
  @MaxLength(DEFAULT_VALIDATIONS.URL_MAX_LENGTH)
  url: string;

  @Field({ nullable: true })
  @IsString()
  guid?: string;

  @Field({ nullable: true })
  @IsString()
  publisher?: string;

  @Field({ defaultValue: true })
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field({ nullable: true })
  @IsDate()
  publishedAt?: Date;

  @Field({ nullable: true })
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsString()
  feed?: string;
}
