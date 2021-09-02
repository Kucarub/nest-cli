import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsEnum, Length, IsOptional } from 'class-validator'
import { ArticleType, ArticleEntity } from '@/entities/article.entity'

export class Pagination {
  @ApiModelProperty({ description: '页码', type: 'number', example: 1 })
  @IsNumber()
  public pageNum: number
  @ApiModelProperty({ description: '条数', type: 'number', example: 10 })
  @IsNumber()
  public pageSize: number
}

/**
 * 文章表单 DTO
 * （用于发布/更新）
 * @Request
 */
export class ArticleCreateOrUpdateFormDto {
  @ApiModelProperty({ description: '分类' })
  @IsEnum(ArticleType)
  type: ArticleType

  @ApiModelProperty({ description: '标题' })
  @IsString()
  @Length(1, 50)
  title: string

  @ApiModelProperty({ description: '封面图', required: false })
  @IsString()
  @IsOptional()
  cover?: string

  @ApiModelProperty({ description: '简述', required: false })
  @IsString()
  @IsOptional()
  @Length(0, 300)
  description?: string

  @ApiModelProperty({ description: 'markdown 内容' })
  @IsString()
  content: string

  @ApiModelProperty({ description: '附件', required: false })
  @IsString()
  @IsOptional()
  file?: string
}

export class ArticleResultDto extends Pagination {
  @ApiModelProperty({ description: '总页数', type: 'number', example: 10 })
  @IsNumber()
  private totalNum: number
  @ApiModelProperty({ description: '总条数', type: 'number', example: 10 })
  @IsNumber()
  private totalRows: number
  @ApiModelProperty({ description: '数据' })
  public list?: any[]
}
