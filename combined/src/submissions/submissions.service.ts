import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    return this.prisma.submission.create({
      data: {
        userId,
        vulnName: data.vulnName,
        vulnCategory: data.vulnCategory,
        screenshotUrl: data.screenshotUrl,
        notes: data.notes,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.submission.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string) {
    const submission = await this.prisma.submission.update({
      where: { id },
      data: { approved: true },
    });

    // Award points
    await this.prisma.user.update({
      where: { id: submission.userId },
      data: { points: { increment: 100 } },
    });

    // Check and award badges
    await this.checkBadges(submission.userId);

    return submission;
  }

  async reject(id: string) {
    return this.prisma.submission.update({
      where: { id },
      data: { approved: false },
    });
  }

  private async checkBadges(userId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: { userId, approved: true },
    });

    const categories = [...new Set(submissions.map(s => s.vulnCategory))];
    const count = submissions.length;

    // Award badges based on achievements
    if (count >= 1) {
      await this.awardBadge(userId, 'First Blood', 'Achievement', 'bronze');
    }
    if (count >= 5) {
      await this.awardBadge(userId, 'Pentester', 'Achievement', 'silver');
    }
    if (count >= 10) {
      await this.awardBadge(userId, 'Security Expert', 'Achievement', 'gold');
    }

    // Category badges
    for (const category of categories) {
      const categoryCount = submissions.filter(s => s.vulnCategory === category).length;
      if (categoryCount >= 3) {
        await this.awardBadge(userId, `${category} Specialist`, category, 'silver');
      }
    }
  }

  private async awardBadge(userId: string, name: string, category: string, tier: string) {
    try {
      await this.prisma.badge.create({
        data: { userId, name, category, tier },
      });
    } catch (e) {
      // Badge already exists, ignore
    }
  }
}

