import { MigrationInterface, QueryRunner } from 'typeorm'
import { Identity, IIdentity } from '../entities/identity'
import { Address, IAddress } from '../entities/address'
import { Phonenumber, IPhonenumber } from '../entities/phoneNumber'
import dbSchema from '../'
import config from '../../config'
import { IdentityTypeEnum } from '../../types/enums'

/**
 * This creates a Furlough Worker identit
 */
// tslint:disable: variable-name
export class Identity1585911771532 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Get an existing address
     */
    const addressRepository = transaction.manager.getRepository(Address)
    const addressEntity_fw: Address = await addressRepository.findOne({ where: { postcode: 'EC1V 9BG' } })

    /**
     * Create a phone number
     */
    const phoneNumberRepository = transaction.manager.getRepository(Phonenumber)

    const smsNumberEntity_fw: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7755578054',
    })

    const telNumberEntity_fw: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '2079460293',
    })

    const savedsmsNumber_fw = await phoneNumberRepository.save(smsNumberEntity_fw)
    const savedtelNumber_fw = await phoneNumberRepository.save(telNumberEntity_fw)

    /**
     * Create an Identity
     */
    const identityRepository = transaction.manager.getRepository(Identity)
    const identity: IIdentity = {
      firstName: 'Richard',
      lastName: 'Kofeve',
      type: IdentityTypeEnum.FURLOUGH,
      email: 'rick@homeforsummer.co.uk',
      smsNumber: savedsmsNumber_fw,
      telNumber: savedtelNumber_fw,
      dob: '28-10-1964',
      address: addressEntity_fw,
    }
    const identityEntity: IIdentity = identityRepository.create(identity)
    await identityRepository.save(identityEntity)

    await transaction.commitTransaction()
    await dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identity]`)
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[address]`)
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[phonenumber]`)
  }
}
