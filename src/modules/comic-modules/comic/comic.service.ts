import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ComicCreateDto } from './dto/comic-create.dto';
import {
  ComicHome,
  ComicHomeDto,
  ComicReadDto,
} from './dto/comic-response.dto';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/services/pagination-service/pagination.service';

@Injectable()
export class ComicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(body: ComicCreateDto): Promise<string> {
    try {
      const { bannerPhoto, coverPhoto, pages, sinopse, title } = body;

      const pagesFormatted = pages.map((page) => {
        return {
          pagePhoto: page.pagePhoto,
          pageNumber: page.pageNumber,
        };
      });

      await this.prisma.comic.create({
        data: {
          title,
          sinopse,
          coverPhoto,
          bannerPhoto,
          comicPages: {
            createMany: {
              data: pagesFormatted,
            },
          },
        },
      });
      return `OK`;
    } catch (error) {
      throw error;
    }
  }

  async findAllHome(
    page: number,
    perPage: number,
    title?: string,
  ): Promise<ComicHome> {
    try {
      const where: Prisma.ComicWhereInput = {
        deletedAt: null,
      };

      if (title) {
        where.title = { contains: title, mode: 'insensitive' };
      }

      const comics = await this.prisma.comic.findMany({
        where,
        take: Number(perPage),
        skip: (page - 1) * perPage,
        orderBy: { createdAt: 'desc' },
      });

      const totalItems = await this.prisma.comic.count({ where });

      const pagination = await this.paginationService.paginate({
        page,
        perPage: perPage,
        totalItems,
      });

      const data: ComicHomeDto[] = comics.map((comic) => {
        return {
          id: comic.id,
          bannerPhoto: comic.bannerPhoto,
          coverPhoto: comic.coverPhoto,
          sinopse: comic.sinopse,
          title: comic.title,
          createdAt: comic.createdAt,
        };
      });

      const response: ComicHome = {
        data,
        pageInfo: pagination,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async comicHome(comicId: string): Promise<ComicHomeDto> {
    try {
      const comic = await this.prisma.comic.findUnique({
        where: {
          id: comicId,
        },
      });

      if (!comic) {
        throw new NotFoundException('Comic not found');
      }

      const response: ComicHomeDto = {
        id: comic.id,
        bannerPhoto: comic.bannerPhoto,
        coverPhoto: comic.coverPhoto,
        sinopse: comic.sinopse,
        title: comic.title,
        createdAt: comic.createdAt,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async comicRead(comicId: string, page: number): Promise<ComicReadDto> {
    try {
      const comicPage = await this.prisma.comicPage.findFirst({
        where: {
          comicId,
          pageNumber: Number(page),
        },
        include: {
          comic: true,
        },
      });

      if (!comicPage) throw new NotFoundException('Page not found');

      const totalPages = await this.prisma.comicPage.count({
        where: {
          comicId,
        },
      });

      const response: ComicReadDto = {
        comicTitle: comicPage.comic.title,
        pageId: comicPage.id,
        pageNumber: comicPage.pageNumber,
        pagePhoto: comicPage.pagePhoto,
        totalPages: totalPages,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}
