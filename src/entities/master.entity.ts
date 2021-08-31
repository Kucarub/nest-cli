import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Cat } from './cat.entity'

@Entity('master', { schema: 'db' })
export class Master extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', { name: 'name', length: 10 })
  name: string

  @Column('tinyint', { name: 'grand' })
  grand: number

  @OneToMany(() => Cat, (cat) => cat.master)
  cats: Cat[]
}
