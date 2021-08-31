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
import { SysRoleEntity as User } from '@/entities/SysRole.entity'
import {
  test,
  UserRegisterDto,
} from './user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
  ) {}
  @Get('findTest/:id')
  findTest(@Param('id',ParseIntPipe)id:number):Promise<UserRegisterDto> {
    return this.UserService.test(id)

    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     message: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // )
    // console.log(new HttpException('a', HttpStatus.INTERNAL_SERVER_ERROR) instanceof Error)
    // throw new ForbiddenException({ hh: '1' })
  }
  @Post('save')
  @ApiOkResponse({ description: '查询成功', type: User })
  @ApiBadRequestResponse({ description: '查询失败' })
  saveTest(@Body() dto:test):Promise<void>{
    console.log(dto.username)
    console.log(dto.password)
    return
    // return this.UserService.testSave(dto)
  }
}
