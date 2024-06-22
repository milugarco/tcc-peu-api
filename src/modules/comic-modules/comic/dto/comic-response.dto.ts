import { createZodDto } from 'nestjs-zod';
import {
  ComicHomeSchema,
  ComicReadSchema,
} from '../schema/comic-response.schema';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from 'src/services/pagination-service/dto/pagination.dto';

export class ComicHomeDto extends createZodDto(ComicHomeSchema) {}

export class ComicReadDto extends createZodDto(ComicReadSchema) {}

export class ComicHome {
  @ApiProperty({
    type: () => [ComicHomeDto],
  })
  data: ComicHomeDto[];

  @ApiProperty({
    type: PaginationResponse,
    nullable: true,
  })
  pageInfo: PaginationResponse;
}
