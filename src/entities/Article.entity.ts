import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './User.entity'

export enum ArticleType {
  JQUERY = 'jquery',
  VUE = 'vue',
  REACT = 'react',
  SERVER = 'server',
  NPM = 'npm',
  COMMON = 'common',
}

@Entity('article', { schema: 'dbnest' })
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @CreateDateColumn({
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date

  @CreateDateColumn({
    name: 'update_time',
    comment: '更新时间',
  })
  updateTime: Date

  @Column('tinyint', {
    name: 'is_active',
    comment: '状态，用于软删除',
    default: () => 1,
  })
  isActive: number

  @Column('enum', {
    name: 'type',
    comment: '分类',
    enum: ArticleType,
  })
  type: ArticleType

  @Column('varchar', { name: 'title', comment: '标题', length: 64 })
  title: string

  @Column('varchar', {
    name: 'cover',
    nullable: true,
    comment: '封面图',
    length: 255,
  })
  cover: string | null

  @Column('varchar', {
    name: 'description',
    nullable: true,
    comment: '简述',
    length: 200,
  })
  description: string | null

  @Column('int', {
    name: 'score_value',
    comment: '分值',
    default: 5,
  })
  scoreValue: number

  @Column('text', { name: 'content', comment: 'markdown 内容' })
  content: string

  @Column('varchar', {
    name: 'file',
    nullable: true,
    comment: '文件附件',
    length: 255,
  })
  file: string | null

  @Column('int', {
    name: 'view_num',
    comment: '查看次数',
    default: 0,
  })
  viewNum: number

  @Column('int', {
    name: 'download_num',
    comment: '下载次数',
    default: 0,
  })
  downloadNum: number

  @CreateDateColumn({
    name: 'publish_time',
    comment: '发布时间',
  })
  publishTime: Date

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{
    name: 'uid',
    referencedColumnName: 'id',
  }])
  author: UserEntity
}
