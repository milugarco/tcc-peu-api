import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ValidationUserService } from 'src/services/validation-user-service/validation-user.service';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly validationUserService: ValidationUserService,
  ) {
    this.jwtSecret = this.configService.get<string>('app.jwtSecret');
  }

  async login(username: string, password: string): Promise<string> {
    try {
      const user = await this.validationUserService.findByUsername(username);

      if (!user) {
        throw new NotFoundException('User name not found');
      }

      const passwordValid = compareSync(password, user.password);

      if (!passwordValid) {
        throw new ConflictException('Invalid password');
      }

      delete user.password;

      const payload = { user: user };

      const accessToken = this.jwtService.signAsync(payload, {
        secret: this.jwtSecret,
      });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }
}
