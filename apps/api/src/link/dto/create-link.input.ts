import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { DEFAULT_VALIDATIONS } from '../../config/validation.options';

@InputType()
export class CreateLinkInput {
  @Field()
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
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field({ nullable: true })
  @IsString()
  category?: string;

  urlCode?: string;
}
