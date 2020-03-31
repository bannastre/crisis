import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Address } from './address'
import { Phonenumber } from './phoneNumber'
import { Identitypriority } from './identitypriority'

export interface IIdentity {
  id?: string
  smsNumber: Phonenumber
  telNumber?: Phonenumber
  firstName?: string
  lastName?: string
  email?: string
  dob?: string
  address?: Address
  identitypriorities?: Identitypriority[]
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Identity implements IIdentity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Index({ unique: true })
  @JoinColumn()
  @OneToOne(
    type => Phonenumber,
    phonenumber => phonenumber.id
  )
  public smsNumber: Phonenumber

  @ManyToOne(
    type => Phonenumber,
    phonenumber => phonenumber.identities,
    { onDelete: 'CASCADE' }
  )
  public telNumber: Phonenumber

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  public email: string

  @Column()
  public dob: string

  @ManyToOne(
    type => Address,
    address => address.identities,
    { onDelete: 'CASCADE' }
  )
  public address: Address

  @OneToMany(
    type => Identitypriority,
    identitypriority => identitypriority.identity
  )
  public identitypriorities: Identitypriority[]

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
