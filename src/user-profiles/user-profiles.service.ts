// userProfiles/user-profile.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async createProfile(
    username: string,
    bio: string,
    avatarUrl: string,
  ): Promise<UserProfile> {
    const user = await this.usersService.findOne(username); // username으로 사용자 조회
    const profile = this.userProfileRepository.create({ bio, avatarUrl, user });
    return this.userProfileRepository.save(profile);
  }

  async getProfile(username: string): Promise<UserProfile> {
    const user = await this.usersService.findOne(username); // username으로 사용자 조회
    const profile = await this.userProfileRepository.findOne({
      where: { user },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateProfile(
    username: string,
    bio: string,
    avatarUrl: string,
  ): Promise<UserProfile> {
    const profile = await this.getProfile(username);
    profile.bio = bio;
    profile.avatarUrl = avatarUrl;
    return this.userProfileRepository.save(profile);
  }
}
