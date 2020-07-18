import { MigrationInterface, QueryRunner } from 'typeorm'
import { DbSchema, Db } from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
import { GrantEnum } from '../../types'

/**
 * This creates idenitityPriorities for Sainsbury's demo purposes
 */
export class IdentityPriority1585814278524 implements MigrationInterface {
  dbSchema = new DbSchema(new Db(config.connection))
  public async up(): Promise<any> {
    await this.dbSchema.initialiseDatabaseConnections()
    const transaction = await this.dbSchema.getTransaction()

    const identityRepository = transaction.manager.getRepository(Identity)
    const priorityRepository = transaction.manager.getRepository(Priority)
    const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)

    /**
     *  KEY WORKER
     *
     *
     *
     *
     *
     *
     */

    // tslint:disable: variable-name
    const identity_ms: IIdentity = await identityRepository.findOne({
      where: {
        lastName: 'Swaine',
      },
    })

    const identity_ah: IIdentity = await identityRepository.findOne({
      where: {
        lastName: 'Hogwood',
      },
    })

    /**
     * FOOD_DELIVERY
     *
     */
    const food_delivery_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.FOOD_DELIVERY },
    })
    const food_delivery_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_ms,
      priority: food_delivery_priority,
    })
    await identitypriorityRepository.save(food_delivery_identitypriority)
    const food_delivery_identitypriority_ah: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_ah,
      priority: food_delivery_priority,
    })
    await identitypriorityRepository.save(food_delivery_identitypriority_ah)

    /**
     * TRANSPORT_PUBLIC
     *
     */
    const transport_public_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.TRANSPORT_PUBLIC },
    })
    const transport_public_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_ms,
      priority: transport_public_priority,
    })
    await identitypriorityRepository.save(transport_public_identitypriority)
    const transport_public_identitypriority_ah: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_ah,
      priority: transport_public_priority,
    })
    await identitypriorityRepository.save(transport_public_identitypriority_ah)

    /**
     * SCHOOLING_ACCESS
     *
     */
    const schooling_access_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.SCHOOLING_ACCESS },
    })
    const schooling_access_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_ms,
      priority: schooling_access_priority,
    })
    await identitypriorityRepository.save(schooling_access_identitypriority)
    const schooling_access_identitypriority_ah: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_ah,
      priority: schooling_access_priority,
    })
    await identitypriorityRepository.save(schooling_access_identitypriority_ah)

    await transaction.commitTransaction()
    await this.dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
