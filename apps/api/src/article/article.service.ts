import { Injectable, Logger } from '@nestjs/common';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(
    @InjectModel(Article) private readonly articleModel: ReturnModelType<typeof Article>,
    @InjectModel(Feed) private readonly feedModel: ReturnModelType<typeof Feed>,
  ) {}

  async create(createArticleInput: CreateArticleInput): Promise<Article> {
    this.logger.verbose(`Creating Article with Input: ${JSON.stringify(createArticleInput)}`);

    const article = new Article(createArticleInput);
    const newArticle = new this.articleModel(article);
    const createdArticle = await newArticle.save();

    await this.feedModel.findByIdAndUpdate(article.feed, {
      $push: {
        articles: createdArticle.id,
      },
    });

    return createdArticle;
  }

  async findAll(): Promise<Article[]> {
    this.logger.verbose(`Finding All Articles with Input: ${JSON.stringify({})}`);

    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    this.logger.verbose(`Finding Article by ID: ${id}`);

    const article = await this.articleModel.findById(id).exec();

    return article;
  }

  async update(id: string, updateArticleInput: UpdateArticleInput): Promise<Article> {
    this.logger.verbose(`Updating Article with Input: ${JSON.stringify(updateArticleInput)}`);

    const article = new Article(updateArticleInput);
    const updatedArticle = await this.articleModel.findByIdAndUpdate(id, article, { new: true });

    return updatedArticle;
  }

  async remove(id: string): Promise<boolean> {
    this.logger.verbose(`Deleting Article by ID: ${id}`);

    const deletedArticle = await this.articleModel.findByIdAndRemove(id);

    return deletedArticle ? true : false;
  }

  async category(id: string): Promise<Ref<Category, ObjectId>> {
    this.logger.verbose(`Populating Category for Article by ID: ${id}`);

    const article = await this.articleModel.findById(id).populate('category');

    return article.category;
  }

  async feed(id: string): Promise<Ref<Feed, ObjectId>> {
    this.logger.verbose(`Populating Feed for Article by ID: ${id}`);

    const article = await this.articleModel.findById(id).populate('feed');

    return article.feed;
  }

  async keywords(id: string): Promise<Ref<Keyword, ObjectId>[]> {
    this.logger.verbose(`Populating Keywords for Article by ID: ${id}`);

    const article = await this.articleModel.findById(id).populate('keywords');

    return article.keywords;
  }
}
