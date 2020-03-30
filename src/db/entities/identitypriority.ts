import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Priority } from './priority'

export interface IIdentitypriority {
  id?: string
  identityId: string
  priority: Priority
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Identitypriority {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ unique: true })
  public identityId: string

  @ManyToOne(
    type => Priority,
    priority => priority.id
  )
  public priority: Priority

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
