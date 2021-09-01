/*
 * @Author: Cphayim
 * @Date: 2019-07-08 15:57:09
 * @LastEditTime: 2019-07-09 09:50:42
 * @Description: 角色验证守卫
 */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import { UserRole, UserEntity } from '@/entities/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RolesGuard implements CanActivate {
  private jwtService: JwtService

  constructor(
    private readonly role: UserRole,
  ) {

  }

  test(token: string): void {
    try {
      this.jwtService.verify(token)
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user: UserEntity = request.user
    const token = request.header.token
    this.test(token)
    // 如果用户角色低于要求的角色则拒绝访问
    if (user.role < this.role) {
      throw new ForbiddenException(
        `当前角色不能访问此接口`,
      )
    }
    return true
  }
}
