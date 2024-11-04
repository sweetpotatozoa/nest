// userProfiles/user-profile.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('profile')
export class UserProfilesController {
  constructor(private readonly userProfileService: UserProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProfile(
    @Req() req: Request,
    @Body() body: { bio: string; avatarUrl: string },
  ) {
    const user = req.user as { username: string };
    return this.userProfileService.createProfile(
      user.username,
      body.bio,
      body.avatarUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: Request) {
    const user = req.user as { username: string };
    return this.userProfileService.getProfile(user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProfile(
    @Req() req: Request,
    @Body() body: { bio: string; avatarUrl: string },
  ) {
    const user = req.user as { username: string };
    return this.userProfileService.updateProfile(
      user.username,
      body.bio,
      body.avatarUrl,
    );
  }
}
