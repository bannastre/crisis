import { MigrationInterface, QueryRunner } from 'typeorm'
import { DbSchema, Db } from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
import { GrantEnum } from '../../types'

/**
 * This creates idenitityPriorities for Furlough demo
 */
// tslint:disable: variable-name
export class IdentityPriority1585911778412 implements MigrationInterface {
  dbSchema = new DbSchema(new Db(config.connection))
  public async up(): Promise<any> {
    await this.dbSchema.initialiseDatabaseConnections()
    const transaction = await this.dbSchema.getTransaction()

    const identityRepository = transaction.manager.getRepository(Identity)
    const priorityRepository = transaction.manager.getRepository(Priority)
    const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)

    // Create Identity
    const identity_rk: IIdentity = await identityRepository.findOne({
      where: {
        lastName: 'Kofeve',
      },
    })

    /**
     * FOOD_DELIVERY
     *
     */
    const food_delivery_priority_fw: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.FOOD_DELIVERY },
    })
    const food_delivery_identitypriority_fw: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_rk,
      priority: food_delivery_priority_fw,
    })
    await identitypriorityRepository.save(food_delivery_identitypriority_fw)

    /**
     *  FURLOUGH
     */

    // Create Priority
    const mortgageHolidayPriGrant: IPriority = priorityRepository.create({
      grant: GrantEnum.FINANCIAL_MORTGAGE_HOLIDAY,
      description: 'Mortgage Holiday',
    })

    const mortgageHolidayPriGrantEntity = await priorityRepository.save(mortgageHolidayPriGrant)

    // Create Mortgage Holiday IdentityPriority
    const mortgageHolidayIdentitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_rk,
      priority: mortgageHolidayPriGrantEntity,
    })

    await identitypriorityRepository.save(mortgageHolidayIdentitypriority)

    await transaction.commitTransaction()
    await this.dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
