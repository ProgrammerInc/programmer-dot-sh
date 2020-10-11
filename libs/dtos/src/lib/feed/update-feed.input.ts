import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DEFAULT_VALIDATIONS } from '@programmer/config';
import { FeedType } from '@programmer/enums';
import { CreateFeedInput } from './create-feed.input';

@InputType()
export class UpdateFeedInput extends PartialType(CreateFeedInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

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
  url?: string;

  @Field({ nullable: true })
  @IsString()
  feedUrl?: string;

  @Field(() => FeedType, { defaultValue: FeedType.NONE })
  @IsNotEmpty()
  @IsEnum(FeedType)
  feedType: FeedType;

  @Field({ nullable: true })
  @IsString()
  publisher?: string;

  @Field({ defaultValue: true })
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field({ nullable: true })
  @IsString()
  category?: string;
}
