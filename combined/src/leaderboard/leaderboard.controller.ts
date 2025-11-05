import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeaderboardService } from './leaderboard.service';

@ApiTags('leaderboard')
@Controller('leaderboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LeaderboardController {
  constructor(private leaderboard: LeaderboardService) {}

  @Get()
  async getLeaderboard() {
    return this.leaderboard.getTop();
  }

  @Get('my-rank')
  async getMyRank(@Request() req) {
    return this.leaderboard.getMyRank(req.user.userId);
  }

  @Get('my-badges')
  async getMyBadges(@Request() req) {
    return this.leaderboard.getUserBadges(req.user.userId);
  }
}

