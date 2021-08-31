import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  UserRegisterDto,
} from './user.dto'
import { UserRepository } from '@/repositories/user.repository'
import { SysRoleEntity as User } from '@/entities/SysRole.entity'
import Logger from '@/libs/logger'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * test
   */
  async test(id: number): Promise<UserRegisterDto> {
    const test = await this.userRepository.findOne({ where: { id: id } })
    Logger.append(`cpass<uid:${id}>`)
    return test
  }

  /**
   * testSave
   */
  async testSave(user:User):Promise<UserRegisterDto>{
    console.log(user)
    const res=await this.userRepository.save(user)
    Logger.append(`save<info:${res}>`)
    return res
  }
}
