/*
 * @Author: Cphayim
 * @Date: 2019-08-20 10:01:14
 * @LastEditTime: 2019-08-22 17:05:47
 * @Description: JWT 载荷接口
 */
import { UserRole } from '@/entities/user.entity'

export interface JwtPayload {
  uid: number
  role: UserRole
}
