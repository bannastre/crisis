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
// tslint:disable: variable-name
export class Identity1585694690202 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Create an address
     */
    const addressRepository = transaction.manager.getRepository(Address)

    const addressEntity_vp: IAddress = addressRepository.create({
      addressLine1: '136b Barking Rd',
      addressLine2: '',
      addressLine3: '',
      region: 'East Ham',
      city: 'London',
      country: 'UK',
      postcode: 'E6 3BD',
    })

    const savedAddress_vp = await addressRepository.save(addressEntity_vp)

    /**
     * Create a phone number
     */
    const phoneNumberRepository = transaction.manager.getRepository(Phonenumber)

    const phoneNumberEntity_vp: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7911123456',
    })

    const telNumberEntity_vp: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '1214960674',
    })

    const savedPhoneNumber_vp = await phoneNumberRepository.save(phoneNumberEntity_vp)
    const savedTelNumber_vp = await phoneNumberRepository.save(telNumberEntity_vp)

    /**
     * Create an Identity
     */
    const identityRepository = transaction.manager.getRepository(Identity)

    /* tslint:disable object-literal-sort-keys */
    const identities_vp: IIdentity[] = [
      {
        firstName: 'John',
        lastName: 'Barton',
        type: IdentityTypeEnum.SHIELDED_PATIENT,
        email: '',
        smsNumber: savedPhoneNumber_vp,
        telNumber: savedTelNumber_vp,
        dob: '28-10-1947',
        address: savedAddress_vp,
      },
    ]

    await Promise.all(
      identities_vp.map(async (id: IIdentity) => {
        const identityEntity_vp: IIdentity = identityRepository.create(id)
        return await identityRepository.save(identityEntity_vp)
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
