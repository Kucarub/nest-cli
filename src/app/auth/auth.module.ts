/*
 * @Author: Cphayim
 * @Date: 2019-08-17 15:04:19
 * @LastEditTime: 2019-08-28 09:46:29
 * @Description: 认证模块
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'

import { UserRepository } from '@/repositories/user.repository'
import { PassportModule } from '@nestjs/passport'
import { config } from '@/config'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.APP.SECRET_KEY,
      signOptions: {
        // 有效期
        expiresIn: config.APP.TOKEN_EXPIRES,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
