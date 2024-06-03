import { createZodDto } from 'nestjs-zod';
import { UserCreateSchema } from '../schema/user-create.schema';

export class UserCreateDto extends createZodDto(UserCreateSchema) {}
