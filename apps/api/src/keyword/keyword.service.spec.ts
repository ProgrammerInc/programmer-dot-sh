import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { mockKeyword } from '../mocks/keyword.mock';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { KeywordService } from './keyword.service';
import { Keyword } from './models/keyword.model';

describe('KeywordService', () => {
  let keywordService: KeywordService;

  beforeEach(async () => {
    function mockKeywordModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeywordService,
        {
          provide: getModelToken('Keyword'),
          useValue: mockKeywordModel,
        },
      ],
    }).compile();

    keywordService = module.get<KeywordService>(KeywordService);
  });

  it('should be defined', () => {
    expect(keywordService).toBeDefined();
  });

  describe('create', () => {
    it('should create a keyword', async () => {
      const keyword: CreateKeywordInput = { ...mockKeyword };
      const result: Keyword = mockKeyword;

      jest.spyOn(keywordService, 'create').mockImplementation(async () => result);

      expect(await keywordService.create(keyword)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of keywords', async () => {
      const result: Keyword[] = [mockKeyword];

      jest.spyOn(keywordService, 'findAll').mockImplementation(async () => result);

      expect(await keywordService.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a keyword by id', async () => {
      const result: Keyword = mockKeyword;

      jest.spyOn(keywordService, 'findOne').mockImplementation(async () => result);

      expect(await keywordService.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an keyword', async () => {
      const keyword: UpdateKeywordInput = { ...mockKeyword };
      const result: Keyword = mockKeyword;

      jest.spyOn(keywordService, 'update').mockImplementation(async () => result);

      expect(await keywordService.update(keyword.id, keyword)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a keyword by id', async () => {
      jest.spyOn(keywordService, 'remove').mockImplementation(async () => true);

      expect(await keywordService.remove('1')).toBe(true);
    });
  });
});
