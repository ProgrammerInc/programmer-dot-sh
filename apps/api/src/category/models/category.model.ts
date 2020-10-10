import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { Article } from '../../article/models/article.model';
import { Feed } from '../../feed/models/feed.model';
import { Keyword } from '../../keyword/models/keyword.model';
import { Link } from '../../link/models/link.model';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';

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

  constructor(category: CreateCategoryInput | UpdateCategoryInput) {
    this.name = category.name;
    this.description = category.description;
    this.path = category.path;
    this.published = category.published;
  }
}
