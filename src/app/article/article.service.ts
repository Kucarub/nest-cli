import { ForbiddenException, Injectable } from '@nestjs/common'
import { ArticleCreateOrUpdateFormDto, Pagination, ArticleResultDto } from './article.dto'
import { UserEntity, UserRole } from '@/entities/user.entity'
import { ArticleEntity, ArticleType } from '@/entities/Article.entity'
import { ArticleRepository } from '@/repositories/article.repository'
import { plainToClass, classToPlain } from 'class-transformer'

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
  ) {
  }

  /**
   * 条件搜索返回文章列表
   */
  async queryArticleList(dto: Pagination): Promise<ArticleResultDto> {
    const [res, count] = await this.articleRepository
      .createQueryBuilder('a')
      .leftJoin('a.author', 'u')
      .select([
        'a.id',
        'a.title',
        'a.type',
        'a.cover',
        'a.description',
        'a.viewNum',
        'a.publishTime',
        'u.username as author',
      ])
      .orderBy('a.publishTime', 'ASC')
      .take(dto.pageSize)
      .skip(dto.pageSize * (dto.pageNum - 1))
      .getManyAndCount()
    return plainToClass(ArticleResultDto, {
      pageNum: dto.pageNum,
      pageSize: dto.pageSize,
      totalRows: count,
      totalNum: Math.ceil(count / dto.pageSize),
      list: res,
    })
  }

  /**
   * 创建文章
   * 1. 非管理员以上角色不能够提交 npm 包文档
   * 2. 确认 dto 内的 `cover` 和 `file` 文件是否存在
   */
  async createArticle(user: UserEntity, dto: ArticleCreateOrUpdateFormDto): Promise<ArticleEntity> {
    if (dto.type === ArticleType.NPM && user.role < UserRole.Admin) {
      throw new ForbiddenException('Only `Admin` role can publish `NPM` type')
    }
    // this.verifyCoverAndFileIsExistOrThrowException(dto)

    const article = await this.articleRepository.create(dto)
    article.author = user
    return article.save()
  }
}
