import { Todo } from '@/entities/todo.entity'
import { EntityRepository } from 'typeorm'
import { MyRepository } from './base.repository'

@EntityRepository(Todo)
export class TodoRepository extends MyRepository<Todo> {}
