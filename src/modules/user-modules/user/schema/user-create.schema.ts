import { UserGenrer } from '@prisma/client';
import { z } from 'nestjs-zod/z';

export const UserCreateSchema = z.object({
  username: z.string().min(5).max(50).trim().describe('User name'),
  email: z.string().email().trim().describe('User email'),
  password: z.string().min(8).max(50).trim().describe('User password'),
  profilePhoto: z.string().describe('User profile photo'),
  bannerPhoto: z.string().describe('User banner photo'),
  age: z.number().min(18).describe('User age'),
  genrer: z.nativeEnum(UserGenrer).describe('User genrer'),
  about: z.string().max(255).describe('User about'),
});
