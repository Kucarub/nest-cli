import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsNumber } from 'class-validator'

export interface FileDto {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  buffer: Buffer
}

/**
 * 文件保存结果 DTO
 * @Response
 */
export class SaveResultDto {
  @ApiModelProperty({ description: '保存状态' })
  @IsBoolean()
  result: boolean

  @ApiModelProperty({ description: 'url' })
  @IsString()
  url: string

  @ApiModelProperty({ description: '原因（当 result 为 false）' })
  @IsString()
  reason: string
}

/**
 * 文件存在性 DTO
 * @Request
 */
export class FileExistDto {
  @ApiModelProperty({ description: '文件地址' })
  @IsString()
  fileUrl: string
}
