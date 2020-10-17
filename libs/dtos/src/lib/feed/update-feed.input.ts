import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { DEFAULT_VALIDATIONS } from '@programmer/config';
import { FeedType } from '@programmer/enums';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateFeedInput } from './create-feed.input';

@InputType()
export class UpdateFeedInput extends PartialType(CreateFeedInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  author?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  logo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lang?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  path?: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MinLength(DEFAULT_VALIDATIONS.URL_MIN_LENGTH)
  @MaxLength(DEFAULT_VALIDATIONS.URL_MAX_LENGTH)
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  feedUrl?: string;

  @Field(() => FeedType, { defaultValue: FeedType.NONE })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(FeedType)
  feedType: FeedType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  publisher?: string;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;
}
