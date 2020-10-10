import * as path from 'path';

export const staticOptions = {
  rootPath: path.join(__dirname, '..', '..', 'docs'),
  serveRoot: '/docs',
  exclude: ['/api*', '/graphql', '/health'],
};
