import { z } from 'nestjs-zod/z';

export const ComicHomeSchema = z.object({
  id: z.string(),
  title: z.string(),
  sinopse: z.string(),
  coverPhoto: z.string(),
  bannerPhoto: z.string(),
  createdAt: z.date(),
});

export const ComicReadSchema = z.object({
  pageId: z.number(),
  comicTitle: z.string(),
  pagePhoto: z.string(),
  pageNumber: z.number(),

  totalPages: z.number(),
});
