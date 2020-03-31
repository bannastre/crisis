import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Priority } from './priority'
import { Identity } from './identity'

export interface IIdentitypriority {
  id?: string
  identity: Identity
  priority: Priority
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Identitypriority implements IIdentitypriority {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(
    type => Identity,
    identity => identity.id,
    { onDelete: 'CASCADE' }
  )
  public identity: Identity

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
