import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { AuthService } from '@/app/auth/auth.service'
import { UserEntity } from '@/entities/User.entity'
import { UserLoginDto, UserRegisterDto } from './user.dto'
import { TokenDto } from '@/app/auth/auth.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
@ApiUseTags('用户模块')
export class UserController {
  constructor(
    private readonly authService: AuthService,
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
  async login(@Body() dto: UserLoginDto): Promise<TokenDto> {
    const user = await this.userService.verify(dto)
    return await this.authService.signToken(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async proFile(@Param() params): Promise<UserEntity> {
    return await this.userService.findUserInfoById(params.id)
  }
}
