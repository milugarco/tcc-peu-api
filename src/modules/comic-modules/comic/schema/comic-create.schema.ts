import { z } from 'nestjs-zod/z';

export const ComicCreateSchema = z.object({
  title: z.string().min(5).max(75).trim().describe('comic title'),
  sinopse: z.string().max(255).describe('comic sinopse'),
  coverPhoto: z.string().describe('comic cover photo'),
  bannerPhoto: z.string().describe('comic cover photo'),

  pages: z.array(
    z.object({
      pagePhoto: z.string(),
      pageNumber: z.number(),
    }),
  ),
});
