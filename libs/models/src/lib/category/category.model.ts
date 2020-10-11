import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { Article } from '../article/article.model';
import { Feed } from '../feed/feed.model';
import { Keyword } from '../keyword/keyword.model';
import { Link } from '../link/link.model';

@ObjectType()
export class Category {
  @Field()
  public id: string;

  @Field()
  @prop({ required: true })
  public name: string;

  @Field({ nullable: true })
  @prop()
  public description?: string;

  @Field({ nullable: true })
  @prop()
  public path?: string;

  @Field()
  @prop({ required: true })
  public published: boolean;

  @Field(() => [Article])
  @prop({ ref: () => Article })
  public articles?: Ref<Article>[];

  @Field(() => [Feed])
  @prop({ ref: () => Feed })
  public feeds?: Ref<Feed>[];

  @Field(() => [Keyword])
  @prop({ ref: () => Keyword })
  public keywords?: Ref<Keyword>[];

  @Field(() => [Link])
  @prop({ ref: () => Link })
  public links?: Ref<Link>[];

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;

  constructor(category: any) {
    this.name = category.name;
    this.description = category.description;
    this.path = category.path;
    this.published = category.published;
  }
}
