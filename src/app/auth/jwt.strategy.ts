/*
 * @Author: Cphayim
 * @Date: 2019-08-19 17:17:44
 * @LastEditTime: 2019-08-26 10:40:53
 * @Description: JWT 验证策略
 */
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { config } from '@/config'
import { AuthService } from './auth.service'
import { JwtPayload } from './jwt.interface'
import { UserEntity } from '@/entities/User.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: config.APP.SECRET_KEY,
      // 自动拒绝过期的 token
      ignoreExpiration: true,
    })
  }

  /**
   * 通过令牌解析出的载荷验证用户有效性
   */
  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      throw new UnauthorizedException('The token points to an invalid user')
    }
    return user
  }
}
