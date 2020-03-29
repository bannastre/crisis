import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Address } from './address'

export interface IIdentity {
  id?: number
  smsNumber: string
  telNumber: string
  firstName: string
  lastName: string
  email: string
  dob: string
  address?: Address
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Identity {
  @PrimaryGeneratedColumn()
  public id: number

  @Index({ unique: true })
  @Column()
  public smsNumber: string

  @Column()
  public telNumber: string

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  public email: string

  @Column()
  public dob: string

  @OneToOne(type => Address)
  @JoinColumn()
  public address: Address

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
