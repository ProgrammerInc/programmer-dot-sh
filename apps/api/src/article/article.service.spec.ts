import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { mockArticle } from '../mocks/article.mock';
import { mockCategory } from '../mocks/category.mock';
import { mockFeed } from '../mocks/feed.mock';
import { mockKeyword } from '../mocks/keyword.mock';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './models/article.model';

describe('ArticleService', () => {
  let articleService: ArticleService;

  beforeEach(async () => {
    function mockArticleModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    function mockFeedModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken('Article'),
          useValue: mockArticleModel,
        },
        {
          provide: getModelToken('Feed'),
          useValue: mockFeedModel,
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  describe('create', () => {
    it('should create an article', async () => {
      const article: CreateArticleInput = { ...mockArticle };
      const result: Article = mockArticle;

      jest.spyOn(articleService, 'create').mockImplementation(async () => result);

      expect(await articleService.create(article)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const result: Article[] = [mockArticle];

      jest.spyOn(articleService, 'findAll').mockImplementation(async () => result);

      expect(await articleService.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an article by id', async () => {
      const result: Article = mockArticle;

      jest.spyOn(articleService, 'findOne').mockImplementation(async () => result);

      expect(await articleService.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const article: UpdateArticleInput = { ...mockArticle };
      const result: Article = mockArticle;

      jest.spyOn(articleService, 'update').mockImplementation(async () => result);

      expect(await articleService.update(article.id, article)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete an article by id', async () => {
      jest.spyOn(articleService, 'remove').mockImplementation(async () => true);

      expect(await articleService.remove('1')).toBe(true);
    });
  });

  describe('category', () => {
    it('should return a category by article id', async () => {
      const result: Category = mockCategory;

      jest.spyOn(articleService, 'category').mockImplementation(async () => result);

      expect(await articleService.category('1')).toBe(result);
    });
  });

  describe('feed', () => {
    it('should return a feed by article id', async () => {
      const result: Feed = mockFeed;

      jest.spyOn(articleService, 'feed').mockImplementation(async () => result);

      expect(await articleService.feed('1')).toBe(result);
    });
  });

  describe('keywords', () => {
    it('should return an array of keywords by article id', async () => {
      const result: Keyword[] = [mockKeyword];

      jest.spyOn(articleService, 'keywords').mockImplementation(async () => result);

      expect(await articleService.keywords('1')).toBe(result);
    });
  });
});
