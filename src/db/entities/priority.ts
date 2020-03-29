import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { GrantEnum } from '../../types'

export interface IPriority {
  id?: number
  grant: GrantEnum
  description: string
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Priority {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public grant: GrantEnum

  @Column()
  public description: string

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
