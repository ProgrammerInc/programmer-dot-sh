import { Injectable, Logger } from '@nestjs/common';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { nanoid } from 'nanoid';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { Link } from './models/link.model';

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);

  constructor(@InjectModel(Link) private readonly linkModel: ReturnModelType<typeof Link>) {}

  async create(createLinkInput: CreateLinkInput): Promise<Link> {
    this.logger.verbose(`Creating Link with Input: ${JSON.stringify(createLinkInput)}`);

    const link = new this.linkModel({ ...createLinkInput, urlCode: nanoid(10) });
    const createdLink = await link.save();

    return createdLink;
  }

  async findAll(): Promise<Link[]> {
    this.logger.verbose(`Finding All Links with Input: ${JSON.stringify({})}`);

    return this.linkModel.find().exec();
  }

  async findOne(id: string): Promise<Link> {
    this.logger.verbose(`Finding Link by ID: ${id}`);

    const link = await this.linkModel.findById(id).exec();

    return link;
  }

  async update(id: string, updateLinkInput: UpdateLinkInput): Promise<Link> {
    this.logger.verbose(`Updating Link with Input: ${JSON.stringify(updateLinkInput)}`);

    const link = new this.linkModel(updateLinkInput);
    const updatedLink = await this.linkModel.findByIdAndUpdate(id, link, {
      new: true,
    });

    return updatedLink;
  }

  async remove(id: string): Promise<boolean> {
    this.logger.verbose(`Deleting Link by ID: ${id}`);

    const deletedLink = await this.linkModel.findByIdAndRemove(id);

    return deletedLink ? true : false;
  }

  async category(id: string): Promise<Ref<Category, ObjectId>> {
    this.logger.verbose(`Populating Category for Link by ID: ${id}`);

    const link = await this.linkModel.findById(id).populate('category');

    return link.category;
  }
}
