import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ArticleEntity } from './Article.entity'

@Index('IDX_78a916df40e02a9deb1c4b75ed', ['username'], { unique: true })
@Entity('user', { schema: 'db' })
export class UserEntity extends BaseEntity {
  @Column('tinyint', {
    name: 'is_active',
    comment: '状态，用于软删除',
  })
  isActive: number

  @Column('int', { name: 'score', comment: '积分' })
  score: number

  @Column('int', { name: 'sn', nullable: true })
  sn: number | null

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

  @Column('varchar', {
    name: 'username',
    unique: true,
    comment: '用户名',
    length: 20,
  })
  username: string

  @Column('varchar', { name: 'password', comment: '密码', length: 32 })
  password: string

  @Column('varchar', { name: 'nickname', comment: '昵称', length: 20 })
  nickname: string

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '头像',
    length: 255,
  })
  avatar: string | null

  @Column('enum', {
    name: 'role',
    comment: '角色',
    enum: ['0', '1', '8', '9'],
  })
  role: '0' | '1' | '8' | '9'

  @OneToMany(() => ArticleEntity, (article) => article.u)
  articles: ArticleEntity[]
}
