import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Master } from './master.entity'
import { CatMetadata } from './cat-metadata.entity'

@Entity('cat', { schema: 'db' })
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', { name: 'name', length: 10 })
  name: string

  @Column('int', { name: 'age' })
  age: number

  @Column('varchar', { name: 'breed', length: 255 })
  breed: string

  @ManyToOne(() => Master, (master) => master.cats, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'masterId', referencedColumnName: 'id' }])
  master: Master

  @OneToOne(() => CatMetadata, (catMetadata) => catMetadata.cat)
  catMetadata: CatMetadata
}
