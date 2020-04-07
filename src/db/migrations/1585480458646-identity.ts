import { MigrationInterface, QueryRunner } from 'typeorm'
import { Identity, IIdentity } from '../entities/identity'
import { Address, IAddress } from '../entities/address'
import { Phonenumber, IPhonenumber } from '../entities/phoneNumber'
import { DbSchema, Db } from '../'
import config from '../../config'
import { IdentityTypeEnum } from '../../types/enums'

/**
 * This creates a key worker identity
 */
// tslint:disable: variable-name
export class Identity1585480458646 implements MigrationInterface {
  dbSchema = new DbSchema(new Db(config.connection))

  public async up(): Promise<any> {
    await this.dbSchema.initialiseDatabaseConnections()
    const transaction = await this.dbSchema.getTransaction()

    /**
     * Create an address
     */
    const addressRepository = transaction.manager.getRepository(Address)

    const addressEntity_kw: IAddress = addressRepository.create({
      addressLine1: '1 Playfair Mansions',
      addressLine2: `Queen's Club Gardens`,
      addressLine3: '',
      region: 'Fulham',
      city: 'London',
      country: 'UK',
      postcode: 'W14 9TR',
    })

    const savedAddress_kw = await addressRepository.save(addressEntity_kw)

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
    const identities_kw: IIdentity[] = [
      {
        firstName: 'Kit',
        lastName: 'Harper',
        type: IdentityTypeEnum.KEY_WORKER,
        email: 'chris@jigsaw.xyz',
        smsNumber: savedPhoneNumber,
        telNumber: savedPhoneNumber,
        dob: '26-10-1983',
        address: savedAddress_kw,
      },
    ]

    await Promise.all(
      identities_kw.map(async (id: IIdentity) => {
        const identityEntity_kw: IIdentity = identityRepository.create(id)
        return await identityRepository.save(identityEntity_kw)
      })
    )

    await transaction.commitTransaction()
    await this.dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identity]`)
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[address]`)
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[phonenumber]`)
  }
}
