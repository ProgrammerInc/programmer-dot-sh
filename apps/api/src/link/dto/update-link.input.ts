import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { DEFAULT_VALIDATIONS } from '../../config/validation.options';
import { CreateLinkInput } from './create-link.input';

@InputType()
export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsString()
  path?: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MinLength(DEFAULT_VALIDATIONS.URL_MIN_LENGTH)
  @MaxLength(DEFAULT_VALIDATIONS.URL_MAX_LENGTH)
  url?: string;

  @Field({ defaultValue: true })
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field({ nullable: true })
  @IsString()
  category?: string;

  urlCode?: string;
}
