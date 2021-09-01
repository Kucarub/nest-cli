import { Injectable, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from '@/entities/user.entity'
import { UserRepository } from '@/repositories/user.repository'
import { JwtPayload } from './jwt.interface'
import { TokenDto } from './auth.dto'
import { config } from '@/config'
import { plainToClass } from 'class-transformer'

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  /**
   * 获取过期时间戳
   */
  private static getExpires(): number {
    return Math.floor(Date.now() / 1000) + config.APP.TOKEN_EXPIRES
  }

  /**
   * 签发 token
   */
  async signToken(user: UserEntity): Promise<TokenDto> {
    // 创建载荷
    const payload: JwtPayload = { uid: user.id, role: user.role }
    return plainToClass(TokenDto, {
      token: this.jwtService.sign(payload),
      expires: AuthService.getExpires(),
    })
  }

  /**
   * 通过载荷中的 uid 获取用户实体
   */
  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    return this.userRepository.findOne(payload.uid)
  }
}
