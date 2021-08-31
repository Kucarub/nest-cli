import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Cat } from './cat.entity'

@Entity('cat_metadata', { schema: 'db' })
export class CatMetadata extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('int', { name: 'width' })
  width: number

  @Column('int', { name: 'height' })
  height: number

  @OneToOne(() => Cat, (cat) => cat.catMetadata, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'catId', referencedColumnName: 'id' }])
  cat: Cat
}
