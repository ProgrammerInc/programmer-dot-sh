import * as path from 'path';

export const staticOptions = {
  rootPath: path.join(process.cwd(), 'apps', 'api', 'docs'),
  serveRoot: '/docs',
  exclude: ['/api*', '/graphql', '/health'],
};
