import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsEnum, Length, IsOptional } from 'class-validator'

export class VideoDto {
  @ApiModelProperty({ description: '页码', type: 'number', example: 1 })
  @IsNumber()
  public pageNum: number
  @ApiModelProperty({ description: '条数', type: 'number', example: 10 })
  @IsNumber()
  public pageSize: number
}
