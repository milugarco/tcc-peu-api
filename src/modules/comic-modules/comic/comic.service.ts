import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ComicCreateDto } from './dto/comic-create.dto';

@Injectable()
export class ComicService {
  constructor(private readonly prisma: PrismaService) {}

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
}
