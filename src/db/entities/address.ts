import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export interface IAddress {
  id?: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  city: string
  region: string
  country: string
  postcode: string
  createdAt?: string
  updatedAt?: string
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public addressLine1: string

  @Column()
  public addressLine2: string

  @Column()
  public addressLine3: string

  @Column()
  public city: string

  @Column()
  public region: string

  @Column()
  public country: string

  @Column()
  public postcode: string

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string
}
