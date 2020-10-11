import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Category } from '../category/category.model';
import { Feed } from '../feed/feed.model';
import { Keyword } from '../keyword/keyword.model';

@ObjectType()
export class Article {
  @Field()
  public id: string;

  @Field()
  @prop({ required: true })
  public title: string;

  @Field({ nullable: true })
  @prop()
  public description?: string;

  @Field({ nullable: true })
  @prop()
  public content?: string;

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
  @prop({ required: true })
  public url: string;

  @Field({ nullable: true })
  @prop()
  public guid?: string;

  @Field({ nullable: true })
  @prop()
  public publisher?: string;

  @Field()
  @prop({ required: true })
  public published: boolean;

  @Field({ nullable: true })
  @prop()
  publishedAt?: Date;

  @Field(() => Category)
  @prop({ ref: () => Category, index: true })
  public category?: Ref<Category>;

  @Field(() => Feed)
  @prop({ ref: () => Feed, index: true })
  public feed?: Ref<Feed>;

  @Field(() => [Keyword])
  @prop({ ref: () => Keyword })
  public keywords?: Ref<Keyword>[];

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;

  constructor(article: any) {
    this.author = article.author;
    this.content = article.content;
    this.description = article.description;
    this.guid = article.guid;
    this.image = article.image;
    this.lang = article.lang;
    this.logo = article.logo;
    this.path = article.path;
    this.published = article.published;
    this.publishedAt = article.publishedAt;
    this.publisher = article.publisher;
    this.title = article.title;
    this.url = article.url;
    this.category = article.category ? new ObjectId(article.category) : null;
    this.feed = article.feed ? new ObjectId(article.feed) : null;
  }
}
