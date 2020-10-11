import { Test, TestingModule } from '@nestjs/testing';
import { CreateFeedInput, UpdateFeedInput } from '@programmer/dtos';
import { FeedType } from '@programmer/enums';
import { mockArticle, mockCategory, mockFeed } from '@programmer/mocks';
import { Article, Category, Feed } from '@programmer/models';
import { getModelToken } from 'nestjs-typegoose';
import { FeedService } from './feed.service';

describe('FeedService', () => {
  let feedService: FeedService;

  beforeEach(async () => {
    function mockFeedModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    feedService = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(feedService).toBeDefined();
  });

  describe('create', () => {
    it('should create a feed', async () => {
      const feed: CreateFeedInput = { ...mockFeed, feedType: FeedType.RSS };
      const result: Feed = mockFeed;

      jest.spyOn(feedService, 'create').mockImplementation(async () => result);

      expect(await feedService.create(feed)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of feeds', async () => {
      const result: Feed[] = [mockFeed];

      jest.spyOn(feedService, 'findAll').mockImplementation(async () => result);

      expect(await feedService.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a feed by id', async () => {
      const result: Feed = mockFeed;

      jest.spyOn(feedService, 'findOne').mockImplementation(async () => result);

      expect(await feedService.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a feed', async () => {
      const feed: UpdateFeedInput = { ...mockFeed, feedType: FeedType.RSS };
      const result: Feed = mockFeed;

      jest.spyOn(feedService, 'update').mockImplementation(async () => result);

      expect(await feedService.update(feed.id, feed)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a feed by id', async () => {
      jest.spyOn(feedService, 'remove').mockImplementation(async () => true);

      expect(await feedService.remove('1')).toBe(true);
    });
  });

  describe('category', () => {
    it('should return a category by feed id', async () => {
      const result: Category = mockCategory;

      jest.spyOn(feedService, 'category').mockImplementation(async () => result);

      expect(await feedService.category('1')).toBe(result);
    });
  });

  describe('articles', () => {
    it('should return an array of articles by feed id', async () => {
      const result: Article[] = [mockArticle];

      jest.spyOn(feedService, 'articles').mockImplementation(async () => result);

      expect(await feedService.articles('1')).toBe(result);
    });
  });
});
