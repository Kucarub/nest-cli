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

  async validToken(): Promise<void> {
    const admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbGUiOjksImlhdCI6MTYzMDQ4MjEwOCwiZXhwIjoxNjMwNTY4NTA4fQ.ctJbQ7_8-SK7vn8l01KJhPZh1fFP-f8rlV5n03tfLeI'
    const normal = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsInJvbGUiOjEsImlhdCI6MTYzMDQ4MjEyMywiZXhwIjoxNjMwNTY4NTIzfQ.BiBTIvci15gHV-n1ivGOSyczRIw0douo--dJdjZxjf4'
    let adminToken
    try {
      adminToken = await this.jwtService.verify(admin)
    } catch (e) {
      console.log(e)
    }
    const admindecode = await this.jwtService.decode(admin)
    const normalToken = await this.jwtService.verify(normal)
    const normaldecode = await this.jwtService.decode(normal)
  }

  /**
   * 通过载荷中的 uid 获取用户实体
   */
  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    return this.userRepository.findOne(payload.uid)
  }
}
