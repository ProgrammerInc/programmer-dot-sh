import { Logger, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Article } from '../article/models/article.model';
import { Category } from '../category/models/category.model';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';

@Resolver(() => Feed)
export class FeedResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly logger = new Logger(FeedResolver.name);

  constructor(private readonly feedService: FeedService) {}

  @Mutation(() => Feed)
  createFeed(@Args('feed', new ValidationPipe()) createFeedInput: CreateFeedInput): Promise<Feed> {
    this.logger.verbose(`Creating Feed with Input: ${JSON.stringify(createFeedInput)}`);

    return this.feedService.create(createFeedInput);
  }

  @Query(() => [Feed], { name: 'feeds' })
  findAll(): Promise<Feed[]> {
    this.logger.verbose(`Finding All Feeds with Input: ${JSON.stringify({})}`);

    return this.feedService.findAll();
  }

  @Query(() => Feed, { name: 'feed' })
  findOne(@Args('id') id: string): Promise<Feed> {
    this.logger.verbose(`Finding Feed by ID: ${id}`);

    return this.feedService.findOne(id);
  }

  @Mutation(() => Feed)
  updateFeed(@Args('feed', new ValidationPipe()) updateFeedInput: UpdateFeedInput): Promise<Feed> {
    this.logger.verbose(`Updating Feed with Input: ${JSON.stringify(updateFeedInput)}`);

    return this.feedService.update(updateFeedInput.id, updateFeedInput);
  }

  @Mutation(() => Boolean)
  removeFeed(@Args('id') id: string): Promise<boolean> {
    this.logger.verbose(`Deleting Feed by ID: ${id}`);

    return this.feedService.remove(id);
  }

  @ResolveField()
  async category(@Parent() feed: Feed): Promise<Ref<Category, ObjectId>> {
    const { id } = feed;

    this.logger.verbose(`Resolving Category for Feed by ID: ${id}`);

    return this.feedService.category(id);
  }

  @ResolveField()
  async articles(@Parent() feed: Feed): Promise<Ref<Article, ObjectId>[]> {
    const { id } = feed;

    this.logger.verbose(`Resolving Articles for Feed by ID: ${id}`);

    return this.feedService.articles(id);
  }
}
