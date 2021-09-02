import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleService } from './article.service'
import { AuthService } from '@/app/auth/auth.service'
import { UserEntity, UserRole } from '@/entities/User.entity'
import { ArticleCreateOrUpdateFormDto, ArticleDto } from './article.dto'
import { Authorization, UserParam } from '@/decorators/auth.decorator'
import { ArticleEntity } from '@/entities/Article.entity'

@Controller('/article')
@ApiUseTags('文章模块')
export class ArticleController {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly authService: AuthService,
    private readonly articleService: ArticleService,
  ) {
  }

  @Get('/')
  @Authorization(UserRole.Member)
  @ApiOkResponse({ description: '返回文章列表', type: ArticleDto })
  async queryArticleList(@Param() dto: ArticleDto): Promise<ArticleDto> {
    return this.articleService.queryArticleList(dto)
  }

  @Post('/save')
  @Authorization(UserRole.Member)
  @ApiOkResponse({ description: '返回文章列表', type: ArticleDto })
  async publishArticle(@UserParam() user: UserEntity, @Body() dto: ArticleCreateOrUpdateFormDto): Promise<ArticleEntity> {
    return await this.articleService.createArticle(user, dto)
  }
}
