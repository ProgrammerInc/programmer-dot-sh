import { registerEnumType } from '@nestjs/graphql';

export enum FeedType {
  ATOM = 'ATOM',
  RSS = 'RSS',
  NONE = 'NONE',
}

registerEnumType(FeedType, {
  name: 'FeedType',
});
