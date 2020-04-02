import { MigrationInterface, QueryRunner } from 'typeorm'
import { Identity, IIdentity } from '../entities/identity'
import { Address, IAddress } from '../entities/address'
import { Phonenumber, IPhonenumber } from '../entities/phoneNumber'
import dbSchema from '../'
import config from '../../config'
import { IdentityTypeEnum } from '../../types/enums'

/**
 * This creates real identities for Sainsbury's demo purposes
 */
export class Identity1585814016605 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Create an address
     */
    const addressRepository = transaction.manager.getRepository(Address)

    const addressEntity: IAddress = addressRepository.create({
      addressLine1: '116 Old Street',
      addressLine2: '',
      addressLine3: '',
      region: 'Clerkenwell',
      city: 'London',
      country: 'UK',
      postcode: 'EC1V 9BG',
    })

    const savedAddress = await addressRepository.save(addressEntity)

    /**
     * Create a phone number
     */
    const phoneNumberRepository = transaction.manager.getRepository(Phonenumber)

    const smsNumberEntityMichele: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7841220846',
    })

    const telNumberEntityMichele: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '2079460288',
    })

    const smsNumberEntityAndrew: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7979456456',
    })

    const telNumberEntityAndrew: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '2079460290',
    })

    const savedsmsNumberMichele = await phoneNumberRepository.save(smsNumberEntityMichele)
    const savedPhoneNumberMichele = await phoneNumberRepository.save(telNumberEntityMichele)
    const savedsmsNumberAndrew = await phoneNumberRepository.save(smsNumberEntityAndrew)
    const savedPhoneNumberAndrew = await phoneNumberRepository.save(telNumberEntityAndrew)

    /**
     * Create an Identity
     */
    const identityRepository = transaction.manager.getRepository(Identity)

    /* tslint:disable object-literal-sort-keys */
    const identities: IIdentity[] = [
      {
        firstName: 'Michele',
        lastName: 'Swaine',
        type: IdentityTypeEnum.KEY_WORKER,
        email: '',
        smsNumber: savedsmsNumberMichele,
        telNumber: savedPhoneNumberMichele,
        dob: '28-10-1964',
        address: savedAddress,
      },
      {
        firstName: 'Andrew',
        lastName: 'Hogwood',
        type: IdentityTypeEnum.KEY_WORKER,
        email: '',
        smsNumber: savedsmsNumberAndrew,
        telNumber: savedPhoneNumberAndrew,
        dob: '28-10-1965',
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
