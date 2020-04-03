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
// tslint:disable: variable-name
export class Identity1585814016605 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Get an existing address
     */
    const addressRepository = transaction.manager.getRepository(Address)
    const addressEntity_sains: Address = await addressRepository.findOne({ where: { postcode: 'EC1V 9BG' } })

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
      number: '2079460291',
    })

    const smsNumberEntityAndrew: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '7979456456',
    })

    const telNumberEntityAndrew: IPhonenumber = phoneNumberRepository.create({
      countryCode: '44',
      number: '2079460292',
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
        address: addressEntity_sains,
      },
      {
        firstName: 'Andrew',
        lastName: 'Hogwood',
        type: IdentityTypeEnum.KEY_WORKER,
        email: '',
        smsNumber: savedsmsNumberAndrew,
        telNumber: savedPhoneNumberAndrew,
        dob: '28-10-1965',
        address: addressEntity_sains,
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
