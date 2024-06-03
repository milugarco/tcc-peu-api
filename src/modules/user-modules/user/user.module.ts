import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ValidationUserService } from 'src/services/validation-user-service/validation-user.service';
import { AuthService } from 'src/modules/auth-modules/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    ValidationUserService,
    AuthService,
    ConfigService,
  ],
})
export class UserModule {}
