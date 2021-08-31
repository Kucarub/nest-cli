import { Inject, Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  UserRegisterDto,
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
   * test
   */
  async test(id: number): Promise<UserRegisterDto> {
    const test = await this.userRepository.findOne({ where: { id } })
    Logger.append(`cpass<uid:${id}>`)
    return test
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
    Logger.append(`${user}`)
    return await user.save()
  }

  /**
   * testSave
   */
  async testSave(user: UserEntity): Promise<UserRegisterDto> {
    const res = await this.userRepository.save(user)
    Logger.append(`save<info:${res}>`)
    return res
  }
}
