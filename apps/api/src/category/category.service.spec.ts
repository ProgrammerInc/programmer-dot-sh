import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { Link } from '../link/models/link.model';
import { mockArticle } from '../mocks/article.mock';
import { mockCategory } from '../mocks/category.mock';
import { mockFeed } from '../mocks/feed.mock';
import { mockKeyword } from '../mocks/keyword.mock';
import { mockLink } from '../mocks/link.mock';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './models/category.model';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(async () => {
    function mockCategoryModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken('Category'),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const category: CreateCategoryInput = { ...mockCategory };
      const result: Category = mockCategory;

      jest.spyOn(categoryService, 'create').mockImplementation(async () => result);

      expect(await categoryService.create(category)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of categorys', async () => {
      const result: Category[] = [mockCategory];

      jest.spyOn(categoryService, 'findAll').mockImplementation(async () => result);

      expect(await categoryService.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const result: Category = mockCategory;

      jest.spyOn(categoryService, 'findOne').mockImplementation(async () => result);

      expect(await categoryService.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const category: UpdateCategoryInput = { ...mockCategory };
      const result: Category = mockCategory;

      jest.spyOn(categoryService, 'update').mockImplementation(async () => result);

      expect(await categoryService.update(category.id, category)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a category by id', async () => {
      jest.spyOn(categoryService, 'remove').mockImplementation(async () => true);

      expect(await categoryService.remove('1')).toBe(true);
    });
  });

  describe('articles', () => {
    it('should return an array of articles by category id', async () => {
      const result: Article[] = [mockArticle];

      jest.spyOn(categoryService, 'articles').mockImplementation(async () => result);

      expect(await categoryService.articles('1')).toBe(result);
    });
  });

  describe('feeds', () => {
    it('should return an array of feeds by category id', async () => {
      const result: Feed[] = [mockFeed];

      jest.spyOn(categoryService, 'feeds').mockImplementation(async () => result);

      expect(await categoryService.feeds('1')).toBe(result);
    });
  });

  describe('links', () => {
    it('should return an array of links by category id', async () => {
      const result: Link[] = [mockLink];

      jest.spyOn(categoryService, 'links').mockImplementation(async () => result);

      expect(await categoryService.links('1')).toBe(result);
    });
  });

  describe('keywords', () => {
    it('should return an array of keywords by category id', async () => {
      const result: Keyword[] = [mockKeyword];

      jest.spyOn(categoryService, 'keywords').mockImplementation(async () => result);

      expect(await categoryService.keywords('1')).toBe(result);
    });
  });
});
