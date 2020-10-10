import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Article } from '../../article/models/article.model';
import { Category } from '../../category/models/category.model';
import { CreateFeedInput } from '../dto/create-feed.input';
import { UpdateFeedInput } from '../dto/update-feed.input';

@ObjectType()
export class Feed {
  @Field()
  public id: string;

  @Field({ nullable: true })
  @prop()
  public title?: string;

  @Field({ nullable: true })
  @prop()
  public description?: string;

  @Field({ nullable: true })
  @prop()
  public author?: string;

  @Field({ nullable: true })
  @prop()
  public image?: string;

  @Field({ nullable: true })
  @prop()
  public logo?: string;

  @Field({ nullable: true })
  @prop()
  public lang?: string;

  @Field({ nullable: true })
  @prop()
  public path?: string;

  @Field()
  @prop({ required: true, unique: true })
  public url: string;

  @Field({ nullable: true })
  @prop()
  public feedUrl?: string;

  @Field({ nullable: true })
  @prop()
  public feedType?: string;

  @Field({ nullable: true })
  @prop()
  public publisher?: string;

  @Field()
  @prop({ required: true })
  public published: boolean;

  @Field(() => Category)
  @prop({ ref: () => Category, index: true })
  public category?: Ref<Category>;

  @Field(() => [Article])
  @prop({ ref: () => Article })
  public articles?: Ref<Article>[];

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;

  constructor(feed: CreateFeedInput | UpdateFeedInput) {
    this.author = feed.author;
    this.description = feed.description;
    this.feedType = feed.feedType;
    this.feedUrl = feed.feedUrl;
    this.image = feed.image;
    this.lang = feed.lang;
    this.logo = feed.logo;
    this.path = feed.path;
    this.published = feed.published;
    this.publisher = feed.publisher;
    this.title = feed.title;
    this.url = feed.url;
    this.category = feed.category ? new ObjectId(feed.category) : null;
  }
}
