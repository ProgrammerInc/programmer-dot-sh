import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { mockKeyword } from '../mocks/keyword.mock';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { KeywordResolver } from './keyword.resolver';
import { KeywordService } from './keyword.service';
import { Keyword } from './models/keyword.model';

describe('KeywordResolver', () => {
  let keywordResolver: KeywordResolver;

  beforeEach(async () => {
    function mockKeywordModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeywordResolver,
        KeywordService,
        {
          provide: getModelToken('Keyword'),
          useValue: mockKeywordModel,
        },
      ],
    }).compile();

    keywordResolver = module.get<KeywordResolver>(KeywordResolver);
  });

  it('should be defined', () => {
    expect(keywordResolver).toBeDefined();
  });

  describe('createKeyword', () => {
    it('should create a keyword', async () => {
      const keyword: CreateKeywordInput = { ...mockKeyword };
      const result: Keyword = mockKeyword;

      jest.spyOn(keywordResolver, 'createKeyword').mockImplementation(async () => result);

      expect(await keywordResolver.createKeyword(keyword)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of keywords', async () => {
      const result: Keyword[] = [mockKeyword];

      jest.spyOn(keywordResolver, 'findAll').mockImplementation(async () => result);

      expect(await keywordResolver.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a keyword by id', async () => {
      const result: Keyword = mockKeyword;

      jest.spyOn(keywordResolver, 'findOne').mockImplementation(async () => result);

      expect(await keywordResolver.findOne('1')).toBe(result);
    });
  });

  describe('updateKeyword', () => {
    it('should update a keyword', async () => {
      const keyword: UpdateKeywordInput = { ...mockKeyword };
      const result: Keyword = mockKeyword;

      jest.spyOn(keywordResolver, 'updateKeyword').mockImplementation(async () => result);

      expect(await keywordResolver.updateKeyword(keyword)).toBe(result);
    });
  });

  describe('removeKeyword', () => {
    it('should delete a keyword by id', async () => {
      jest.spyOn(keywordResolver, 'removeKeyword').mockImplementation(async () => true);

      expect(await keywordResolver.removeKeyword('1')).toBe(true);
    });
  });
});
