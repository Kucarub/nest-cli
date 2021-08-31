import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './User.entity'

@Entity('article', { schema: 'db' })
export class ArticleEntity extends BaseEntity {
  @Column('tinyint', {
    name: 'is_active',
    comment: '状态，用于软删除',
  })
  isActive: number

  @Column('int', { name: 'score_value', comment: '分值', default: () => '\'5\'' })
  scoreValue: number

  @Column('int', {
    name: 'view_num',
    comment: '查看次数',
  })
  viewNum: number

  @Column('int', {
    name: 'download_num',
    comment: '下载次数',
  })
  downloadNum: number

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('datetime', {
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date

  @Column('datetime', {
    name: 'update_time',
    comment: '更新时间',
  })
  updateTime: Date

  @Column('enum', {
    name: 'type',
    comment: '分类',
    enum: ['jquery', 'vue', 'react', 'server', 'npm', 'common'],
  })
  type: 'jquery' | 'vue' | 'react' | 'server' | 'npm' | 'common'

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

  @Column('text', { name: 'content', comment: 'markdown 内容' })
  content: string

  @Column('varchar', {
    name: 'file',
    nullable: true,
    comment: '文件附件',
    length: 255,
  })
  file: string | null

  @Column('datetime', {
    name: 'publish_time',
    comment: '发布时间',
  })
  publishTime: Date

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'uid', referencedColumnName: 'id' }])
  u: UserEntity
}
