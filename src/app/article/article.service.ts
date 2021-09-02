import { Injectable, Inject, ForbiddenException } from '@nestjs/common'
import { ArticleDto, ArticleCreateOrUpdateFormDto } from './article.dto'
import { UserEntity, UserRole } from '@/entities/user.entity'
import { ArticleType, ArticleEntity } from '@/entities/Article.entity'
import { ArticleRepository } from '@/repositories/article.repository'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
  ) {
  }

  /**
   * 条件搜索返回文章列表
   */
  async queryArticleList(dto: ArticleDto): Promise<ArticleDto> {
    return
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

    const article = this.articleRepository.create(dto)
    // article.author = user
    return article.save()
  }
}
