import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Feed } from '../feed/models/feed.model';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  private readonly logger = new Logger(WorkerController.name);

  constructor(private readonly workerService: WorkerService) {}

  @EventPattern('feed_created')
  async feedCreated(data: Feed): Promise<void> {
    this.logger.log(`Received New Feed: ${JSON.stringify(data)}`);

    return this.workerService.feedCreated(data);
  }

  @EventPattern('update_feeds')
  async updateFeeds(data: Feed[]): Promise<void> {
    this.logger.log(`Updating Feeds: ${JSON.stringify(data)}`);

    return this.workerService.updateFeeds(data);
  }
}
