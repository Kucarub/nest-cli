import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Index('IDX_5ac142a67366029a265383ee2c', ['content'], { unique: true })
@Entity('todo', { schema: 'db' })
export class TodoEntity extends BaseEntity {
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

  @Column('tinyint', {
    name: 'is_active',
    comment: '状态，用于软删除',
  })
  isActive: number

  @Column('varchar', {
    name: 'content',
    unique: true,
    comment: '待办事项内容',
    length: 255,
  })
  content: string

  @Column('tinyint', {
    name: 'checked',
    comment: '是否完成',
  })
  checked: number
}
