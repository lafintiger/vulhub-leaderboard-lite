import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwt.sign({ sub: user.id, email: user.email });
    const { password: _, ...userData } = user;
    
    return { user: userData, accessToken: token };
  }

  async register(data: { email: string; password: string; name: string }) {
    const exists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        name: data.name,
      },
    });

    const token = this.jwt.sign({ sub: user.id, email: user.email });
    const { password: _, ...userData } = user;
    
    return { user: userData, accessToken: token };
  }
}

