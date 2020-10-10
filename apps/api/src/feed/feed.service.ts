import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { Category } from '../category/models/category.model';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { Feed } from './models/feed.model';

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    @Inject('NEWS_FEED_WORKER') private workerClient: ClientProxy,
    @InjectModel(Feed) private readonly feedModel: ReturnModelType<typeof Feed>,
  ) {}

  async create(createFeedInput: CreateFeedInput): Promise<Feed> {
    this.logger.verbose(`Creating Feed with Input: ${JSON.stringify(createFeedInput)}`);

    const feed = new this.feedModel(createFeedInput);
    const createdFeed = await feed.save();

    this.workerClient.emit<number>('feed_created', createdFeed);

    return createdFeed;
  }

  async findAll(): Promise<Feed[]> {
    this.logger.verbose(`Finding All Feeds with Input: ${JSON.stringify({})}`);

    return this.feedModel.find().exec();
  }

  async findOne(id: string): Promise<Feed> {
    this.logger.verbose(`Finding Feed by ID: ${id}`);

    const feed = await this.feedModel.findById(id).exec();

    return feed;
  }

  async update(id: string, updateFeedInput: UpdateFeedInput): Promise<Feed> {
    this.logger.verbose(`Updating Feed with Input: ${JSON.stringify(updateFeedInput)}`);

    const feed = new this.feedModel(updateFeedInput);
    const updatedFeed = await this.feedModel.findByIdAndUpdate(id, feed, {
      new: true,
    });

    return updatedFeed;
  }

  async remove(id: string): Promise<boolean> {
    this.logger.verbose(`Deleting Feed by ID: ${id}`);

    const deletedFeed = await this.feedModel.findByIdAndRemove(id);

    return deletedFeed ? true : false;
  }

  async category(id: string): Promise<Ref<Category, ObjectId>> {
    this.logger.verbose(`Populating Category for Feed by ID: ${id}`);

    const feed = await this.feedModel.findById(id).populate('category');

    return feed.category;
  }

  async articles(id: string): Promise<Ref<Article, ObjectId>[]> {
    this.logger.verbose(`Populating Articles for Feed by ID: ${id}`);

    const feed = await this.feedModel.findById(id).populate('articles');

    return feed.articles;
  }
}
