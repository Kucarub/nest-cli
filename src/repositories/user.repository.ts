/*
 * @Author: Cphayim
 * @Date: 2019-08-20 17:04:41
 * @LastEditTime: 2019-08-20 17:07:28
 * @Description: 用户存储库
 */

import { EntityRepository } from 'typeorm'
import { MyRepository } from './base.repository'
import { SysRoleEntity as User } from '@/entities/SysRole.entity'

@EntityRepository(User)
export class UserRepository extends MyRepository<User> {}
