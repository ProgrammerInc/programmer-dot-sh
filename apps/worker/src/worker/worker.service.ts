import { Injectable, Logger } from '@nestjs/common';
import { FeedType } from '@programmer/enums';
import { Article, Feed } from '@programmer/models';
import { ReturnModelType } from '@typegoose/typegoose';
import metascraper from 'metascraper';
import metaAuthor from 'metascraper-author';
import metaClearbit from 'metascraper-clearbit';
import metaDate from 'metascraper-date';
import metaDescription from 'metascraper-description';
import metaImage from 'metascraper-image';
import metaLang from 'metascraper-lang';
import metaLogo from 'metascraper-logo';
import metaLogoFavicon from 'metascraper-logo-favicon';
import metaPublisher from 'metascraper-publisher';
import metaTitle from 'metascraper-title';
import metaUrl from 'metascraper-url';
import { InjectModel } from 'nestjs-typegoose';
import fetch from 'node-fetch';
import Parser from 'rss-parser';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  private readonly scraper = metascraper([
    metaAuthor(),
    metaDate(),
    metaDescription(),
    metaImage(),
    metaLang(),
    metaLogo(),
    metaClearbit(),
    metaLogoFavicon(),
    metaPublisher(),
    metaTitle(),
    metaUrl(),
  ]);

  constructor(
    @InjectModel(Article) private readonly articleModel: ReturnModelType<typeof Article>,
    @InjectModel(Feed) private readonly feedModel: ReturnModelType<typeof Feed>,
  ) {}

  async feedCreated(data: any): Promise<void> {
    const parser = new Parser();

    const { _id, url } = data;

    const response = await fetch(url);

    this.logger.debug(response);

    const contentType = response.headers.get('content-type');

    this.logger.debug(contentType);

    const isXML = contentType.startsWith('application/xml') || contentType.startsWith('text/xml');
    const isATOM = contentType.startsWith('application/atom+xml');
    const isRSS = contentType.startsWith('application/rss+xml');

    if (isATOM || isRSS || isXML) {
      const body = await response.text();
      const metadata = await this.scraper({ html: body, url });

      this.logger.debug(metadata);

      const feed = await parser.parseURL(url);

      const newFeed = new this.feedModel({
        title: feed.title || metadata.title,
        description: feed.description || metadata.description,
        author: metadata.author,
        image: metadata.image,
        publisher: metadata.publisher,
        url: feed.link || metadata.url,
        feedUrl: feed.feedUrl || url,
        feedType: isATOM ? FeedType.ATOM : isRSS ? FeedType.RSS : FeedType.NONE,
        published: true,
      });

      await this.feedModel.findByIdAndUpdate(_id, newFeed, {
        new: true,
      });

      feed.items.forEach(async (item) => {
        this.logger.debug({
          ...item,
          content: 'REDACTED',
          contentSnippet: 'REDACTED',
        }); // Too much printing. Save the terminal trees.

        const response = await fetch(item.link);
        const body = await response.text();
        const metadata = await this.scraper({ html: body, url: item.link });

        this.logger.debug(metadata);

        const article = new Article({
          title: item.title || metadata.title,
          description: metadata.description || item.contentSnippet,
          content: item.content,
          author: metadata.author || item.author || item.creator,
          publisher: metadata.publisher,
          url: item.link || metadata.url,
          image: metadata.image,
          guid: item.id,
          published: true,
          publishedAt: new Date(item.pubDate) || new Date(metadata.date),
          feed: _id,
        });
        const newArticle = new this.articleModel(article);
        const createdArticle = await newArticle.save();

        await this.feedModel.findByIdAndUpdate(article.feed, {
          $push: {
            articles: createdArticle.id,
          },
        });
      });
    }
  }

  async updateFeeds(data: Feed[]): Promise<void> {
    const parser = new Parser();

    const feeds = data && data.length ? data : await this.feedModel.find().exec();

    feeds.forEach(async (item) => {
      const { id, url } = item;
      const feed = await parser.parseURL(url);

      feed.items.forEach(async (item) => {
        this.logger.debug({
          ...item,
          content: 'REDACTED',
          contentSnippet: 'REDACTED',
        }); // Too much printing. Save the terminal trees.

        const response = await fetch(item.link);
        const body = await response.text();
        const metadata = await this.scraper({ html: body, url });

        this.logger.debug(metadata);

        const article = new Article({
          title: item.title || metadata.title,
          description: metadata.description || item.contentSnippet,
          content: item.content,
          author: metadata.author || item.author || item.creator,
          publisher: metadata.publisher,
          url: item.link || metadata.url,
          image: metadata.image,
          guid: item.id,
          published: true,
          publishedAt: new Date(item.pubDate) || new Date(metadata.date),
          feed: id,
        });
        const newArticle = new this.articleModel(article);
        const createdArticle = await newArticle.save();

        await this.feedModel.findByIdAndUpdate(article.feed, {
          $push: {
            articles: createdArticle.id,
          },
        });
      });
    });
  }
}
