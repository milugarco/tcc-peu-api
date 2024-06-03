import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import variables from 'src/config/variables';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ValidationUserService } from 'src/services/validation-user-service/validation-user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ConfigModule.forRoot({
      load: [variables],
    }),
  ],
  providers: [AuthService, PrismaService, ValidationUserService],
  controllers: [AuthController],
})
export class AuthModule {}
