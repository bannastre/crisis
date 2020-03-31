import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { CountryCallingCode, NationalNumber } from 'libphonenumber-js'
import { Identity } from './identity'

export interface IPhonenumber {
  id?: string
  identities?: Identity[]
  countryCode: CountryCallingCode
  number: NationalNumber
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Phonenumber implements IPhonenumber {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @OneToMany(
    type => Identity,
    identity => identity.address
  )
  public identities: Identity[]

  @Column('varchar', { nullable: false, length: 3 })
  public countryCode: CountryCallingCode

  @Column('varchar', { nullable: false, length: 10 })
  public number: NationalNumber

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
