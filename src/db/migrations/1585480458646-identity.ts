import { MigrationInterface, QueryRunner } from 'typeorm'
import { Identity, IIdentity } from '../entities/identity'
import { Address, IAddress } from '../entities/address'
import dbSchema from '../'
import config from '../../config'

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
     * Create an Identity
     */
    const identityRepository = transaction.manager.getRepository(Identity)

    /* tslint:disable object-literal-sort-keys */
    const identities: IIdentity[] = [
      {
        firstName: 'Chris',
        lastName: 'Harrop',
        email: 'chris@jigsaw.xyz',
        smsNumber: '+447843627130',
        telNumber: '+447843627130',
        dob: '28-10-1983',
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
  }
}
