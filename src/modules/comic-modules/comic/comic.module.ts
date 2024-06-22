import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PaginationService } from 'src/services/pagination-service/pagination.service';

@Module({
  controllers: [ComicController],
  providers: [ComicService, PrismaService, ConfigService, PaginationService],
})
export class ComicModule {}
