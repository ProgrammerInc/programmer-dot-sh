import * as Joi from '@hapi/joi';

export const configOptions = {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().default(4000),
    WORKER_PORT: Joi.number().default(7000),
    ENABLE_COMPRESSION: Joi.boolean().default(false),
    ENABLE_CORS: Joi.boolean().default(false),
    ENABLE_CSURF: Joi.boolean().default(false),
    ENABLE_HELMET: Joi.boolean().default(false),
    ENABLE_LOGGER: Joi.boolean().default(true),
    ENABLE_RATELIMIT: Joi.boolean().default(false),
    RATELIMIT_WINDOW: Joi.number().default(15),
    RATELIMIT_MAX: Joi.number().default(100),
    DATABASE_CONNECTION: Joi.string().default('PROGRAMMER-DOT-SH'),
    DATABASE_URL: Joi.string().default('mongodb://localhost/programmer-dot-sh'),
    DATABASE_TIMEOUT: Joi.number().default(1500),
    REDIS_URL: Joi.string().default('redis://localhost:6379'),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
