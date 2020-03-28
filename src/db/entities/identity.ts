import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from './address'

@Entity()
export class Identity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column()
  smsNumber: number

  @Column()
  telNumber: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  dob: string

  @OneToOne(
    type => Address,
    address => address.identity
  )
  @JoinColumn()
  address: Address
}
