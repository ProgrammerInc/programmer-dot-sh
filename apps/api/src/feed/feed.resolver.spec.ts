import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { Category } from '../category/models/category.model';
import { mockArticle } from '../mocks/article.mock';
import { mockCategory } from '../mocks/category.mock';
import { mockFeed } from '../mocks/feed.mock';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { FeedType } from './enums/feed-type.enum';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';

describe('FeedResolver', () => {
  let feedResolver: FeedResolver;

  beforeEach(async () => {
    function mockFeedModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedResolver,
        FeedService,
        {
          provide: 'NEWS_FEED_WORKER',
          useFactory: () => ({}),
        },
        {
          provide: getModelToken('Feed'),
          useValue: mockFeedModel,
        },
      ],
    }).compile();

    feedResolver = module.get<FeedResolver>(FeedResolver);
  });

  it('should be defined', () => {
    expect(feedResolver).toBeDefined();
  });

  describe('createFeed', () => {
    it('should create a feed', async () => {
      const feed: CreateFeedInput = { ...mockFeed, feedType: FeedType.RSS };
      const result: Feed = mockFeed;

      jest.spyOn(feedResolver, 'createFeed').mockImplementation(async () => result);

      expect(await feedResolver.createFeed(feed)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of feeds', async () => {
      const result: Feed[] = [mockFeed];

      jest.spyOn(feedResolver, 'findAll').mockImplementation(async () => result);

      expect(await feedResolver.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a feed by id', async () => {
      const result: Feed = mockFeed;

      jest.spyOn(feedResolver, 'findOne').mockImplementation(async () => result);

      expect(await feedResolver.findOne('1')).toBe(result);
    });
  });

  describe('updateFeed', () => {
    it('should update a feed', async () => {
      const feed: UpdateFeedInput = { ...mockFeed, feedType: FeedType.RSS };
      const result: Feed = mockFeed;

      jest.spyOn(feedResolver, 'updateFeed').mockImplementation(async () => result);

      expect(await feedResolver.updateFeed(feed)).toBe(result);
    });
  });

  describe('removeFeed', () => {
    it('should delete a feed by id', async () => {
      jest.spyOn(feedResolver, 'removeFeed').mockImplementation(async () => true);

      expect(await feedResolver.removeFeed('1')).toBe(true);
    });
  });

  describe('category', () => {
    it('should return a category by feed', async () => {
      const result: Category = mockCategory;

      jest.spyOn(feedResolver, 'category').mockImplementation(async () => result);

      expect(await feedResolver.category(mockFeed)).toBe(result);
    });
  });

  describe('articles', () => {
    it('should return an array of articles by feed', async () => {
      const result: Article[] = [mockArticle];

      jest.spyOn(feedResolver, 'articles').mockImplementation(async () => result);

      expect(await feedResolver.articles(mockFeed)).toBe(result);
    });
  });
});
