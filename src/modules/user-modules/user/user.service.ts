import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { ValidationUserService } from 'src/services/validation-user-service/validation-user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { genSaltSync, hash } from 'bcrypt';
import { AuthService } from 'src/modules/auth-modules/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationUserService: ValidationUserService,
    private readonly auth: AuthService,
  ) {}

  async subscribe(body: UserCreateDto): Promise<string> {
    try {
      const {
        about,
        age,
        bannerPhoto,
        email,
        genrer,
        password,
        profilePhoto,
        username,
      } = body;

      await this.validationUserService.usernameAlreadyExist(username);

      await this.validationUserService.emailAlreadyExist(email);

      const salt = genSaltSync(10);
      const hashedPassword = await hash(password, salt);

      await this.prisma.user.create({
        data: {
          about,
          age,
          bannerPhoto,
          email,
          gender: genrer,
          password: hashedPassword,
          profilePhoto,
          username,
          type: 'VISITANT',
        },
      });

      const token = await this.auth.login(username, password);

      return token;
    } catch (error) {
      throw error;
    }
  }
}
