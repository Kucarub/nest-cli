import { Inject, Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  UserRegisterDto,
  UserLoginDto,
} from './user.dto'
import { UserRepository } from '@/repositories/user.repository'
import { UserEntity } from '@/entities/User.entity'
import Logger from '@/libs/logger'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  /**
   * 创建新用户
   * 1. 检查用户名是否重复
   */
  async createUser(dto: UserRegisterDto): Promise<UserRegisterDto> {
    // 判断用户名的可用性
    const isExist = await this.userRepository.findOne({ where: { username: dto.username } })
    if (isExist) {
      throw new BadRequestException(`username \`${dto.username}\` is existed.`)
    }
    const user = await this.userRepository.create(dto)
    Logger.append(`createUser<uid:${user.id}>:<username:${user.username}>`)
    return await user.save()
  }

  /**
   * 登录
   * 验证用户名和密码
   * 正确的情况下返回用户实体
   */
  async verify(dto: UserLoginDto): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        username: dto.username,
        // 密码在查询时会自动加密，无需手动加密（查看 User 实体定义）
        password: dto.password,
      },
    })
    if (!user) {
      throw new BadRequestException('用户名或密码错误')
    }
    Logger.append(`userLogin<uid:${user.id}>:<username:${user.username}>`)
    return true
  }
}
