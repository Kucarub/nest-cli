/*
 * @Author: Cphayim
 * @Date: 2019-08-17 00:16:10
 * @LastEditTime: 2020-08-21 17:28:23
 * @Description: 用户数据传输对象
 */
import { IsString, Length, Validate, IsNumber, IsOptional, IsEnum } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'
import { UserEntity } from '@/entities/User.entity'

/**
 * 注册 DTO
 * @Request
 */
export class UserRegisterDto extends UserEntity {

}
