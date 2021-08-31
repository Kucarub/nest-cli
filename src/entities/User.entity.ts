import {
  BaseEntity,
  Column,
  Entity,
  Index,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ArticleEntity } from './Article.entity'

@Index('IDX_78a916df40e02a9deb1c4b75ed', ['username'], { unique: true })
@Entity('user', { schema: 'dbnest' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @CreateDateColumn({
    name: 'create_time',
    comment: '创建时间',
    select: false,
  })
  createTime: Date

  @CreateDateColumn({
    name: 'update_time',
    comment: '更新时间',
    select: false,
  })
  updateTime: Date

  @Column('tinyint', {
    name: 'is_active',
    comment: '状态，用于软删除',
    default: () => 1,
  })
  isActive: number

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
    default: '1',
  })
  role: '0' | '1' | '8' | '9'

  @Column('int', {
    name: 'score',
    comment: '积分',
    default: () => 0,
  })
  score: number

  @Column('int', { name: 'sn', nullable: true, comment: '个人编号' })
  sn: number | null

  @OneToMany(() => ArticleEntity, (article) => article.u)
  articles: ArticleEntity[]
}
