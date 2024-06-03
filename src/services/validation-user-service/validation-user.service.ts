import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ValidationUserService {
  constructor(private readonly prisma: PrismaService) {}

  async emailAlreadyExist(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (user) {
      throw new ConflictException('the email is already being used');
    }

    return;
  }

  async usernameAlreadyExist(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
        deletedAt: null,
      },
    });

    if (user) {
      throw new ConflictException('the username is already being used');
    }

    return;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
        deletedAt: null,
      },
    });

    return user || null;
  }
}
