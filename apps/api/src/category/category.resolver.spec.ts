import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryInput, UpdateCategoryInput } from '@programmer/dtos';
import { mockArticle, mockCategory, mockFeed, mockKeyword, mockLink } from '@programmer/mocks';
import { Article, Category, Feed, Keyword, Link } from '@programmer/models';
import { getModelToken } from 'nestjs-typegoose';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

describe('CategoryResolver', () => {
  let categoryResolver: CategoryResolver;

  beforeEach(async () => {
    function mockCategoryModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        CategoryService,
        {
          provide: getModelToken('Category'),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    categoryResolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('should be defined', () => {
    expect(categoryResolver).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a category', async () => {
      const category: CreateCategoryInput = { ...mockCategory };
      const result: Category = mockCategory;

      jest.spyOn(categoryResolver, 'createCategory').mockImplementation(async () => result);

      expect(await categoryResolver.createCategory(category)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of categorys', async () => {
      const result: Category[] = [mockCategory];

      jest.spyOn(categoryResolver, 'findAll').mockImplementation(async () => result);

      expect(await categoryResolver.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const result: Category = mockCategory;

      jest.spyOn(categoryResolver, 'findOne').mockImplementation(async () => result);

      expect(await categoryResolver.findOne('1')).toBe(result);
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const category: UpdateCategoryInput = { ...mockCategory };
      const result: Category = mockCategory;

      jest.spyOn(categoryResolver, 'updateCategory').mockImplementation(async () => result);

      expect(await categoryResolver.updateCategory(category)).toBe(result);
    });
  });

  describe('removeCategory', () => {
    it('should delete a category by id', async () => {
      jest.spyOn(categoryResolver, 'removeCategory').mockImplementation(async () => true);

      expect(await categoryResolver.removeCategory('1')).toBe(true);
    });
  });

  describe('articles', () => {
    it('should return an array of articles by category', async () => {
      const result: Article[] = [mockArticle];

      jest.spyOn(categoryResolver, 'articles').mockImplementation(async () => result);

      expect(await categoryResolver.articles(mockCategory)).toBe(result);
    });
  });

  describe('feeds', () => {
    it('should return an array of feeds by category', async () => {
      const result: Feed[] = [mockFeed];

      jest.spyOn(categoryResolver, 'feeds').mockImplementation(async () => result);

      expect(await categoryResolver.feeds(mockCategory)).toBe(result);
    });
  });

  describe('links', () => {
    it('should return an array of links by category', async () => {
      const result: Link[] = [mockLink];

      jest.spyOn(categoryResolver, 'links').mockImplementation(async () => result);

      expect(await categoryResolver.links(mockCategory)).toBe(result);
    });
  });

  describe('keywords', () => {
    it('should return an array of keywords by category', async () => {
      const result: Keyword[] = [mockKeyword];

      jest.spyOn(categoryResolver, 'keywords').mockImplementation(async () => result);

      expect(await categoryResolver.keywords(mockCategory)).toBe(result);
    });
  });
});
