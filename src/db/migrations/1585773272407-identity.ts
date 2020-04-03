import { MigrationInterface, QueryRunner } from 'typeorm'
import { Identity, IIdentity } from '../entities/identity'
import { Address, IAddress } from '../entities/address'
import { Phonenumber, IPhonenumber } from '../entities/phoneNumber'
import dbSchema from '../'
import config from '../../config'
import { IdentityTypeEnum } from '../../types/enums'

/**
 * This creates real identities for demo purposes
 */
// tslint:disable: variable-name
export class Identity1585773272407 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Create an address
     */
    const addressRepository = transaction.manager.getRepository(Address)

    const addressEntity_os: IAddress = addressRepository.create({
      addressLine1: '116 Old Street',
      addressLine2: '',
      addressLine3: '',
      region: 'Clerkenwell',
      city: 'London',
      country: 'UK',
      postcode: 'EC1V 9BG',
    })

    const savedAddress_os = await addressRepository.save(addressEntity_os)

    /**
     * Create a phone number
     */
    const phoneNumberRepository = transaction.manager.getRepository(Phonenumber)

    const smsNumberEntityIsmail: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7785300930',
    })

    const telNumberEntityIsmail: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '2079460289',
    })

    const smsNumberEntityDaryl: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7540195547',
    })

    const telNumberEntityDaryl: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '2079460290',
    })

    const savedsmsNumberIsmail = await phoneNumberRepository.save(smsNumberEntityIsmail)
    const savedPhoneNumberIsmail = await phoneNumberRepository.save(telNumberEntityIsmail)
    const savedsmsNumberDaryl = await phoneNumberRepository.save(smsNumberEntityDaryl)
    const savedPhoneNumberDaryl = await phoneNumberRepository.save(telNumberEntityDaryl)

    /**
     * Create an Identity
     */
    const identityRepository = transaction.manager.getRepository(Identity)

    /* tslint:disable object-literal-sort-keys */
    const identities: IIdentity[] = [
      {
        firstName: 'Ismail',
        lastName: 'Amla',
        type: IdentityTypeEnum.KEY_WORKER,
        email: '',
        smsNumber: savedsmsNumberIsmail,
        telNumber: savedPhoneNumberIsmail,
        dob: '28-10-1947',
        address: savedAddress_os,
      },
      {
        firstName: 'Daryl',
        lastName: 'Rowland',
        type: IdentityTypeEnum.SHIELDED_PATIENT,
        email: 'daryl@jigsaw.xyz',
        smsNumber: savedsmsNumberDaryl,
        telNumber: savedPhoneNumberDaryl,
        dob: '28-10-1947',
        address: savedAddress_os,
      },
    ]

    await Promise.all(
      identities.map(async (id: IIdentity) => {
        const identityEntity: IIdentity = identityRepository.create(id)
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
