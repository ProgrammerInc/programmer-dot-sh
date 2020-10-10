import { Injectable, Logger } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { Keyword } from './models/keyword.model';

@Injectable()
export class KeywordService {
  private readonly logger = new Logger(KeywordService.name);

  constructor(
    @InjectModel(Keyword) private readonly keywordModel: ReturnModelType<typeof Keyword>,
  ) {}

  async create(createKeywordInput: CreateKeywordInput): Promise<Keyword> {
    this.logger.verbose(`Creating Keyword with Input: ${JSON.stringify(createKeywordInput)}`);

    const keyword = new this.keywordModel(createKeywordInput);
    const createdKeyword = await keyword.save();

    return createdKeyword;
  }

  async findAll(): Promise<Keyword[]> {
    this.logger.verbose(`Finding All Keywords with Input: ${JSON.stringify({})}`);

    return this.keywordModel.find().exec();
  }

  async findOne(id: string): Promise<Keyword> {
    this.logger.verbose(`Finding Keyword by ID: ${id}`);

    const keyword = await this.keywordModel.findById(id).exec();

    return keyword;
  }

  async update(id: string, updateKeywordInput: UpdateKeywordInput): Promise<Keyword> {
    this.logger.verbose(`Updating Keyword with Input: ${JSON.stringify(updateKeywordInput)}`);

    const keyword = new this.keywordModel(updateKeywordInput);
    const updatedKeyword = await this.keywordModel.findByIdAndUpdate(id, keyword, {
      new: true,
    });

    return updatedKeyword;
  }

  async remove(id: string): Promise<any> {
    this.logger.verbose(`Deleting Keyword by ID: ${id}`);

    const deletedKeyword = await this.keywordModel.findByIdAndRemove(id);

    return deletedKeyword;
  }
}
