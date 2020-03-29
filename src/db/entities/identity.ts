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
  id?: string
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
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Index({ unique: true })
  @Column({ nullable: false })
  public smsNumber: string

  @Column({ nullable: true })
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
