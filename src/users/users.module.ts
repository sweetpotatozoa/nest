// users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserProfilesModule } from '../user-profiles/user-profiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserProfilesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule], // UsersService와 UserRepository를 다른 모듈에서 사용할 수 있도록 export
})
export class UsersModule {}
