import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('photo', { schema: 'db' })
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', { name: 'name', length: 100 })
  name: string

  @Column('text', { name: 'description' })
  description: string

  @Column('varchar', { name: 'filename', length: 255 })
  filename: string

  @Column('int', { name: 'views' })
  views: number

  @Column('tinyint', { name: 'isPublished' })
  isPublished: number
}
