import { Field, InputType } from '@nestjs/graphql';
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

@InputType()
export class CreateLinkInput {
  @Field()
  @IsOptional()
  @IsString()
  path?: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MinLength(DEFAULT_VALIDATIONS.URL_MIN_LENGTH)
  @MaxLength(DEFAULT_VALIDATIONS.URL_MAX_LENGTH)
  url: string;

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
