/*
 * @Author: Cphayim
 * @Date: 2019-08-20 17:04:41
 * @LastEditTime: 2019-08-20 17:07:28
 * @Description: 用户存储库
 */

import { EntityRepository } from 'typeorm'
import { MyRepository } from './base.repository'
import { UserEntity } from '@/entities/User.entity'

@EntityRepository(UserEntity)
export class UserRepository extends MyRepository<UserEntity> {}
