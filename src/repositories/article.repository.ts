/*
 * @Author: Cphayim
 * @Date: 2019-08-20 17:04:41
 * @LastEditTime: 2019-08-27 16:14:05
 * @Description: 文章存储库
 */

import { EntityRepository } from 'typeorm'
import { MyRepository } from './base.repository'
import { Article } from '@/entities/article.entity'

@EntityRepository(Article)
export class ArticleRepository extends MyRepository<Article> {}
