import { MigrationInterface, QueryRunner } from 'typeorm'
import { Identity, IIdentity } from '../entities/identity'
import { Address, IAddress } from '../entities/address'
import { Phonenumber, IPhonenumber } from '../entities/phoneNumber'
import dbSchema from '../'
import config from '../../config'
import { IdentityTypeEnum } from '../../types/enums'

/**
 * This creates a key worker identity
 */
export class Identity1585480458646 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Create an address
     */
    const addressRepository = transaction.manager.getRepository(Address)

    const addressEntity: IAddress = addressRepository.create({
      addressLine1: '1 Playfair Mansions',
      addressLine2: `Queen's Club Gardens`,
      addressLine3: '',
      region: 'Fulham',
      city: 'London',
      country: 'UK',
      postcode: 'W14 9TR',
    })

    const savedAddress = await addressRepository.save(addressEntity)

    /**
     * Create a phone number
     */
    const phoneNumberRepository = transaction.manager.getRepository(Phonenumber)

    const phoneNumberEntity: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7700900077',
    })

    const savedPhoneNumber = await phoneNumberRepository.save(phoneNumberEntity)

    /**
     * Create an Identity
     */
    const identityRepository = transaction.manager.getRepository(Identity)

    /* tslint:disable object-literal-sort-keys */
    const identities: IIdentity[] = [
      {
        firstName: 'Kit',
        lastName: 'Harper',
        type: IdentityTypeEnum.KEY_WORKER,
        email: 'chris@jigsaw.xyz',
        smsNumber: savedPhoneNumber,
        telNumber: savedPhoneNumber,
        dob: '26-10-1983',
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
