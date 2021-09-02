import { UseGuards, createParamDecorator, Request, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { RolesGuard } from '@/guards/roles.guard'
import { UserRole } from '@/entities/user.entity'

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

/**
 * 向参数注入当前 token 对应的用户实体
 *
 * 要求：使用该装饰器的控制器方法必须前置 `Authorization` 方法装饰器用于解析 token，否则你将得到一个 `undfined`
 * @typedef createParamDecorator
 */
export const UserParam = createParamDecorator((data, req) => {
  return req.user
})
