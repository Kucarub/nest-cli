import { UseGuards, createParamDecorator, Request, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { RolesGuard } from '@/guards/roles.guard'
import { UserRole } from '@/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
/**
 * 认证及角色守卫
 * 要求：使用的模块必须导入 `AuthModule`
 * @typedef MethodDecorator
 */
export function Authorization(role = UserRole.Member): MethodDecorator {
  // 合并守卫
  return UseGuards(
    // 自动验证 token 并注入用户实体到 request.user
    AuthGuard('jwt'),
    // 自动验证用户实体对应角色是否符合要求
    new RolesGuard(role),
  )
}
