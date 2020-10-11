import { Logger, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateArticleInput, UpdateArticleInput } from '@programmer/dtos';
import { Article, Category, Feed, Keyword } from '@programmer/models';
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { ArticleService } from './article.service';

@Resolver(() => Article)
export class ArticleResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly logger = new Logger(ArticleResolver.name);

  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  createArticle(
    @Args('article', new ValidationPipe()) createArticleInput: CreateArticleInput,
  ): Promise<Article> {
    this.logger.verbose(`Creating Article with Input: ${JSON.stringify(createArticleInput)}`);

    return this.articleService.create(createArticleInput);
  }

  @Query(() => [Article], { name: 'articles' })
  findAll(): Promise<Article[]> {
    this.logger.verbose(`Finding All Articles with Input: ${JSON.stringify({})}`);

    return this.articleService.findAll();
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id') id: string): Promise<Article> {
    this.logger.verbose(`Finding Article by ID: ${id}`);

    return this.articleService.findOne(id);
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('article', new ValidationPipe()) updateArticleInput: UpdateArticleInput,
  ): Promise<Article> {
    this.logger.verbose(`Updating Article with Input: ${JSON.stringify(updateArticleInput)}`);

    return this.articleService.update(updateArticleInput.id, updateArticleInput);
  }

  @Mutation(() => Boolean)
  removeArticle(@Args('id') id: string): Promise<boolean> {
    this.logger.verbose(`Deleting Article by ID: ${id}`);

    return this.articleService.remove(id);
  }

  @ResolveField()
  async category(@Parent() article: Article): Promise<Ref<Category, ObjectId>> {
    const { id } = article;

    this.logger.verbose(`Resolving Category for Article by ID: ${id}`);

    return this.articleService.category(id);
  }

  @ResolveField()
  async feed(@Parent() article: Article): Promise<Ref<Feed, ObjectId>> {
    const { id } = article;

    this.logger.verbose(`Resolving Feed for Article by ID: ${id}`);

    return this.articleService.feed(id);
  }

  @ResolveField()
  async keywords(@Parent() article: Article): Promise<Ref<Keyword, ObjectId>[]> {
    const { id } = article;

    this.logger.verbose(`Resolving Keywords for Article by ID: ${id}`);

    return this.articleService.keywords(id);
  }
}
