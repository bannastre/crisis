import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { GrantEnum } from '../../types'

export interface IPriority {
  id?: string
  grant: GrantEnum
  description: string
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Priority implements IPriority {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ unique: true })
  public grant: GrantEnum

  @Column()
  public description: string

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
