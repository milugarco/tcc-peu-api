import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AuthModule } from './modules/auth-modules/auth/auth.module';
import { UserModule } from './modules/user-modules/user/user.module';
import { ComicModule } from './modules/comic-modules/comic/comic.module';

@Module({
  imports: [AuthModule, UserModule, ComicModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
})
export class AppModule {}
