import { Logger, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { KeywordService } from './keyword.service';
import { Keyword } from './models/keyword.model';

@Resolver(() => Keyword)
export class KeywordResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly logger = new Logger(KeywordResolver.name);

  constructor(private readonly keywordService: KeywordService) {}

  @Mutation(() => Keyword)
  createKeyword(
    @Args('keyword', new ValidationPipe()) createKeywordInput: CreateKeywordInput,
  ): Promise<Keyword> {
    this.logger.verbose(`Creating Keyword with Input: ${JSON.stringify(createKeywordInput)}`);

    return this.keywordService.create(createKeywordInput);
  }

  @Query(() => [Keyword], { name: 'keywords' })
  findAll(): Promise<Keyword[]> {
    this.logger.verbose(`Finding All Keywords with Input: ${JSON.stringify({})}`);

    return this.keywordService.findAll();
  }

  @Query(() => Keyword, { name: 'keyword' })
  findOne(@Args('id') id: string): Promise<Keyword> {
    this.logger.verbose(`Finding Keyword by ID: ${id}`);

    return this.keywordService.findOne(id);
  }

  @Mutation(() => Keyword)
  updateKeyword(
    @Args('keyword', new ValidationPipe()) updateKeywordInput: UpdateKeywordInput,
  ): Promise<Keyword> {
    this.logger.verbose(`Updating Keyword with Input: ${JSON.stringify(updateKeywordInput)}`);

    return this.keywordService.update(updateKeywordInput.id, updateKeywordInput);
  }

  @Mutation(() => Keyword)
  removeKeyword(@Args('id') id: string): Promise<any> {
    this.logger.verbose(`Deleting Keyword by ID: ${id}`);

    return this.keywordService.remove(id);
  }
}
