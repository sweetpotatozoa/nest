// userProfiles/user-profile.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { UserProfilesService } from './user-profiles.service';
import { UserProfilesController } from './user-profiles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    forwardRef(() => UsersModule),
  ],
  providers: [UserProfilesService],
  controllers: [UserProfilesController],
  exports: [UserProfilesService],
})
export class UserProfilesModule {}
