import { Logger, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateCategoryInput, UpdateCategoryInput } from '@programmer/dtos';
import { Article, Category, Feed, Keyword, Link } from '@programmer/models';
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly logger = new Logger(CategoryResolver.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('category', new ValidationPipe()) createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    this.logger.verbose(`Creating Category with Input: ${JSON.stringify(createCategoryInput)}`);

    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(): Promise<Category[]> {
    this.logger.verbose(`Finding All Categories with Input: ${JSON.stringify({})}`);

    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id') id: string): Promise<Category> {
    this.logger.verbose(`Finding Category by ID: ${id}`);

    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('category', new ValidationPipe()) updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    this.logger.verbose(`Updating Category with Input: ${JSON.stringify(updateCategoryInput)}`);

    return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation(() => Boolean)
  removeCategory(@Args('id') id: string): Promise<boolean> {
    this.logger.verbose(`Deleting Category by ID: ${id}`);

    return this.categoryService.remove(id);
  }

  @ResolveField()
  async articles(@Parent() category: Category): Promise<Ref<Article, ObjectId>[]> {
    const { id } = category;

    this.logger.verbose(`Resolving Articles for Category by ID: ${id}`);

    return this.categoryService.articles(id);
  }

  @ResolveField()
  async feeds(@Parent() category: Category): Promise<Ref<Feed, ObjectId>[]> {
    const { id } = category;

    this.logger.verbose(`Resolving Feeds for Category by ID: ${id}`);

    return this.categoryService.feeds(id);
  }

  @ResolveField()
  async keywords(@Parent() category: Category): Promise<Ref<Keyword, ObjectId>[]> {
    const { id } = category;

    this.logger.verbose(`Resolving Keywords for Category by ID: ${id}`);

    return this.categoryService.keywords(id);
  }

  @ResolveField()
  async links(@Parent() category: Category): Promise<Ref<Link, ObjectId>[]> {
    const { id } = category;

    this.logger.verbose(`Resolving Links for Category by ID: ${id}`);

    return this.categoryService.links(id);
  }
}
