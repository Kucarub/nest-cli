import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Delete,
  Query,
  Put,
  HttpException,
  HttpStatus,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@/repositories/user.repository'
import { UserService } from './user.service'
import { UserEntity } from '@/entities/User.entity'
import {
  UserRegisterDto,
  UserLoginDto,
} from './user.dto'

@Controller('user')
@ApiUseTags('用户模块')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // @InjectRepository(UserEntity)
    // private readonly userRepository: UserRepository,
  ) {
  }

  @Post('/register')
  @ApiOkResponse({ description: '注册成功', type: UserEntity })
  @ApiBadRequestResponse({ description: '用户名重复' })
  async register(@Body() dto: UserRegisterDto): Promise<UserEntity> {
    return await this.userService.createUser(dto)
  }

  @Post('login')
  @ApiOkResponse({ description: '登录成功', type: UserEntity })
  @ApiBadRequestResponse({ description: '用户名或密码错误' })
  async saveTest(@Body() dto: UserLoginDto): Promise<boolean> {
    return await this.userService.verify(dto)
  }
}
