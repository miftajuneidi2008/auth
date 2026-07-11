import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service.js';
import { DatabaseModule } from './database/database.module.js';
import { UsersService } from './users/users.service.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [DatabaseService, UsersService],
})
export class AppModule {}
