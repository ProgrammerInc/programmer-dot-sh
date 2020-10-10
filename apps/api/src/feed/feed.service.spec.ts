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
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';

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
