import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getTop() {
    const users = await this.prisma.user.findMany({
      orderBy: { points: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        points: true,
        createdAt: true,
        _count: {
          select: { submissions: { where: { approved: true } } },
        },
      },
    });

    const badges = await this.prisma.badge.groupBy({
      by: ['userId'],
      _count: { userId: true },
    });

    const badgeMap = Object.fromEntries(badges.map(b => [b.userId, b._count.userId]));

    return users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name,
      email: user.email,
      points: user.points,
      submissions: user._count.submissions,
      badges: badgeMap[user.id] || 0,
    }));
  }

  async getMyRank(userId: string) {
    const allUsers = await this.prisma.user.findMany({
      orderBy: { points: 'desc' },
      select: { id: true, name: true, points: true },
    });

    const rank = allUsers.findIndex(u => u.id === userId) + 1;
    const user = allUsers[rank - 1];

    const submissions = await this.prisma.submission.count({
      where: { userId, approved: true },
    });

    const badges = await this.prisma.badge.count({ where: { userId } });

    return {
      rank,
      name: user?.name,
      points: user?.points || 0,
      submissions,
      badges,
    };
  }

  async getUserBadges(userId: string) {
    return this.prisma.badge.findMany({
      where: { userId },
      orderBy: { awardedAt: 'desc' },
    });
  }
}

