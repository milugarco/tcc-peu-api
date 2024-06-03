import { createZodDto } from 'nestjs-zod';
import { ComicCreateSchema } from '../schema/comic-create.schema';

export class ComicCreateDto extends createZodDto(ComicCreateSchema) {}
