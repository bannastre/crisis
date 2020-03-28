import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Identity } from './identity'

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(
    type => Identity,
    identity => identity.address
  )
  @JoinColumn()
  identity: Identity

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
}
