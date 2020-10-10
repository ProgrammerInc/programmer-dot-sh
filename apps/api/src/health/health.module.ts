import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../config/constants.options';
import { mongooseOptions } from '../config/mongoose.options';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect(
          process.env.DATABASE_URL || 'mongodb://localhost/programmer-dot-sh',
          mongooseOptions,
        ),
    },
  ],
})
export class HealthModule {}
