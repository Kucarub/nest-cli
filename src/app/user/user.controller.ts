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
} from './user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get('findTest/:id')
  findTest(@Param('id', ParseIntPipe)id: number): Promise<UserRegisterDto> {
    return this.userService.test(id)
  }

  @Post('save')
  @ApiOkResponse({ description: '查询成功', type: UserEntity })
  @ApiBadRequestResponse({ description: '查询失败' })
  saveTest(@Body() dto: UserRegisterDto): Promise<UserRegisterDto> {
    return this.userService.testSave(dto)
  }
}
