import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { mockArticle } from '../mocks/article.mock';
import { mockCategory } from '../mocks/category.mock';
import { mockFeed } from '../mocks/feed.mock';
import { mockKeyword } from '../mocks/keyword.mock';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './models/article.model';

describe('ArticleResolver', () => {
  let articleResolver: ArticleResolver;

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
        ArticleResolver,
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

    articleResolver = module.get<ArticleResolver>(ArticleResolver);
  });

  it('should be defined', () => {
    expect(articleResolver).toBeDefined();
  });

  describe('createArticle', () => {
    it('should create an article', async () => {
      const article: CreateArticleInput = { ...mockArticle };
      const result: Article = mockArticle;

      jest.spyOn(articleResolver, 'createArticle').mockImplementation(async () => result);

      expect(await articleResolver.createArticle(article)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const result: Article[] = [mockArticle];

      jest.spyOn(articleResolver, 'findAll').mockImplementation(async () => result);

      expect(await articleResolver.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an article by id', async () => {
      const result: Article = mockArticle;

      jest.spyOn(articleResolver, 'findOne').mockImplementation(async () => result);

      expect(await articleResolver.findOne('1')).toBe(result);
    });
  });

  describe('updateArticle', () => {
    it('should update an article', async () => {
      const article: UpdateArticleInput = { ...mockArticle };
      const result: Article = mockArticle;

      jest.spyOn(articleResolver, 'updateArticle').mockImplementation(async () => result);

      expect(await articleResolver.updateArticle(article)).toBe(result);
    });
  });

  describe('removeArticle', () => {
    it('should delete an article by id', async () => {
      jest.spyOn(articleResolver, 'removeArticle').mockImplementation(async () => true);

      expect(await articleResolver.removeArticle('1')).toBe(true);
    });
  });

  describe('category', () => {
    it('should return a category by article', async () => {
      const result: Category = mockCategory;

      jest.spyOn(articleResolver, 'category').mockImplementation(async () => result);

      expect(await articleResolver.category(mockArticle)).toBe(result);
    });
  });

  describe('feed', () => {
    it('should return a feed by article', async () => {
      const result: Feed = mockFeed;

      jest.spyOn(articleResolver, 'feed').mockImplementation(async () => result);

      expect(await articleResolver.feed(mockArticle)).toBe(result);
    });
  });

  describe('keywords', () => {
    it('should return an array of keywords by article', async () => {
      const result: Keyword[] = [mockKeyword];

      jest.spyOn(articleResolver, 'keywords').mockImplementation(async () => result);

      expect(await articleResolver.keywords(mockArticle)).toBe(result);
    });
  });
});
