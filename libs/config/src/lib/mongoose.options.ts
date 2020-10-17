import { DATABASE_CONNECTION } from './constants.options';

export const mongooseOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const typegooseOptions = {
  ...mongooseOptions,
  connectionName: DATABASE_CONNECTION,
};
