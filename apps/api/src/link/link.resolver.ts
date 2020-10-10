import { Logger, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Category } from '../category/models/category.model';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { LinkService } from './link.service';
import { Link } from './models/link.model';

@Resolver(() => Link)
export class LinkResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly logger = new Logger(LinkResolver.name);

  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => Link)
  createLink(@Args('link', new ValidationPipe()) createLinkInput: CreateLinkInput): Promise<Link> {
    this.logger.verbose(`Creating Link with Input: ${JSON.stringify(createLinkInput)}`);

    return this.linkService.create(createLinkInput);
  }

  @Query(() => [Link], { name: 'links' })
  findAll(): Promise<Link[]> {
    this.logger.verbose(`Finding All Links with Input: ${JSON.stringify({})}`);

    return this.linkService.findAll();
  }

  @Query(() => Link, { name: 'link' })
  findOne(@Args('id') id: string): Promise<Link> {
    this.logger.verbose(`Finding Link by ID: ${id}`);

    return this.linkService.findOne(id);
  }

  @Mutation(() => Link)
  updateLink(@Args('link', new ValidationPipe()) updateLinkInput: UpdateLinkInput): Promise<Link> {
    this.logger.verbose(`Updating Link with Input: ${JSON.stringify(updateLinkInput)}`);

    return this.linkService.update(updateLinkInput.id, updateLinkInput);
  }

  @Mutation(() => Link)
  removeLink(@Args('id') id: string): Promise<boolean> {
    this.logger.verbose(`Deleting Link by ID: ${id}`);

    return this.linkService.remove(id);
  }

  @ResolveField()
  async category(@Parent() link: Link): Promise<Ref<Category, ObjectId>> {
    const { id } = link;

    this.logger.verbose(`Resolving Category for Link by ID: ${id}`);

    return this.linkService.category(id);
  }
}
