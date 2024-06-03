import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe a new user' })
  @ApiCreatedResponse({ description: 'subscribe successfully' })
  @ApiBody({
    type: UserCreateDto,
  })
  async subscribe(@Body() body: UserCreateDto): Promise<string> {
    return await this.userService.subscribe(body);
  }
}
