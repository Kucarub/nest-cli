/*
 * @Author: Cphayim
 * @Date: 2019-08-22 15:57:25
 * @LastEditTime: 2019-08-22 15:58:07
 * @Description: 认证数据传输对象
 */
import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class TokenDto {
  @ApiModelProperty({ description: '令牌' })
  @IsString()
  readonly token: string

  @ApiModelProperty({ description: '截止时间戳（Unix秒）' })
  @IsNumber()
  expires: number
}
