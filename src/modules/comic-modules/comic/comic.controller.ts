import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ComicService } from './comic.service';
import { ComicCreateDto } from './dto/comic-create.dto';
import { AuthUserGuard } from 'src/modules/auth-modules/auth/auth.guards';

@ApiTags('Comic')
@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Post('create-comic')
  @ApiBearerAuth()
  @UseGuards(AuthUserGuard)
  @ApiOperation({ summary: 'Create a new comic' })
  @ApiCreatedResponse({ description: 'OK' })
  @ApiBody({
    type: ComicCreateDto,
  })
  async create(
    @Body() body: ComicCreateDto,
    @Request() req: any,
  ): Promise<string> {
    console.log(req.auth.user.type);
    if (req.auth.user.type !== 'ADMIN') {
      throw new ForbiddenException('you are not allowed to create comics');
    }
    return await this.comicService.create(body);
  }
}
