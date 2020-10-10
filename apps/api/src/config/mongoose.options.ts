import { DATABASE_CONNECTION } from './constants.options';

export const mongooseOptions = {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const typegooseOptions = {
  ...mongooseOptions,
  connectionName: DATABASE_CONNECTION,
};
