import { MigrationInterface, QueryRunner } from 'typeorm'
import { Identity, IIdentity } from '../entities/identity'
import { Address, IAddress } from '../entities/address'
import { Phonenumber, IPhonenumber } from '../entities/phoneNumber'
import dbSchema from '../'
import config from '../../config'
import { IdentityTypeEnum } from '../../types/enums'

/**
 * This creates a vulnerable person identity
 */
export class Identity1585694690202 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Create an address
     */
    const addressRepository = transaction.manager.getRepository(Address)

    const addressEntity: IAddress = addressRepository.create({
      addressLine1: '136b Barking Rd',
      addressLine2: '',
      addressLine3: '',
      region: 'East Ham',
      city: 'London',
      country: 'UK',
      postcode: 'E6 3BD',
    })

    const savedAddress = await addressRepository.save(addressEntity)

    /**
     * Create a phone number
     */
    const phoneNumberRepository = transaction.manager.getRepository(Phonenumber)

    const phoneNumberEntity: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7911123456 ',
    })

    const phoneNumberEntity2: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '1214960674 ',
    })

    const savedPhoneNumber = await phoneNumberRepository.save(phoneNumberEntity)
    const savedPhoneNumber2 = await phoneNumberRepository.save(phoneNumberEntity2)

    /**
     * Create an Identity
     */
    const identityRepository = transaction.manager.getRepository(Identity)

    /* tslint:disable object-literal-sort-keys */
    const identities: IIdentity[] = [
      {
        firstName: 'John',
        lastName: 'Barton',
        type: IdentityTypeEnum.SHIELDED_PATIENT,
        email: '',
        smsNumber: savedPhoneNumber,
        telNumber: savedPhoneNumber2,
        dob: '28-10-1947',
        address: savedAddress,
      },
    ]

    await Promise.all(
      identities.map(async (identity: IIdentity) => {
        const identityEntity: IIdentity = identityRepository.create(identity)
        return await identityRepository.save(identityEntity)
      })
    )

    await transaction.commitTransaction()
    await dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identity]`)
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[address]`)
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[phonenumber]`)
  }
}
