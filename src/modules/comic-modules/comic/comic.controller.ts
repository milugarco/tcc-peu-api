import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ComicService } from './comic.service';
import { ComicCreateDto } from './dto/comic-create.dto';
import { AuthUserGuard } from 'src/modules/auth-modules/auth/auth.guards';
import { ComicHome, ComicHomeDto, ComicReadDto } from './dto/comic-response.dto';

@ApiTags('Comic')
@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Get('find-all-home')
  @ApiOperation({ summary: 'Get all comics home' })
  @ApiQuery({
    name: 'page',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
  })
  async findAllHome(
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
    @Query('title') title?: string,
  ): Promise<ComicHome> {
    return await this.comicService.findAllHome(
      Number(page),
      Number(perPage),
      title,
    );
  }

  @Get('comic-home/:comicId')
  @ApiOperation({ summary: 'Get all comics home' })
  @ApiParam({
    name: 'comicId',
    required: true,
    type: String,
  })
  async comicHome(@Param('comicId') comicId: string): Promise<ComicHomeDto> {
    return await this.comicService.comicHome(comicId);
  }

  @Get('comic-read/:comicId')
  @ApiOperation({ summary: 'Get all comics home' })
  @ApiParam({
    name: 'comicId',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  async comicRead(
    @Param('comicId') comicId: string,
    @Query('page') page: number,
  ): Promise<ComicReadDto> {
    return await this.comicService.comicRead(comicId, page);
  }

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
