import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ComicController],
  providers: [ComicService, PrismaService, ConfigService],
})
export class ComicModule {}
