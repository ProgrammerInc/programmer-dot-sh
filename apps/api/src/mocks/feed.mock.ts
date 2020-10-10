import { FeedType } from '../feed/enums/feed-type.enum';

export const mockFeed = {
  id: '1',
  title: 'Test',
  url: 'https://www.example.com',
  feedUrl: 'https://www.example.com/rss',
  feedType: FeedType.RSS,
  published: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
