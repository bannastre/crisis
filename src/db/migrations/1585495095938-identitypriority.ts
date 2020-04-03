import { MigrationInterface, QueryRunner } from 'typeorm'
import dbSchema from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
import { GrantEnum } from '../../types'

/**
 * This assigns a common grants to a key worker
 */
export class Identitypriority1585495095938 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    const identityRepository = transaction.manager.getRepository(Identity)
    const priorityRepository = transaction.manager.getRepository(Priority)
    const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)

    // tslint:disable: variable-name
    const identity_key: IIdentity = await identityRepository.findOne({
      where: {
        lastName: 'Harper',
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
      identity: identity_key,
      priority: food_delivery_priority,
    })
    await identitypriorityRepository.save(food_delivery_identitypriority)

    /**
     * TRANSPORT_PUBLIC
     *
     */
    const transport_public_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.TRANSPORT_PUBLIC },
    })
    const transport_public_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_key,
      priority: transport_public_priority,
    })
    await identitypriorityRepository.save(transport_public_identitypriority)

    /**
     * SCHOOLING_ACCESS
     *
     */
    const schooling_access_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.SCHOOLING_ACCESS },
    })
    const schooling_access_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_key,
      priority: schooling_access_priority,
    })
    await identitypriorityRepository.save(schooling_access_identitypriority)

    await transaction.commitTransaction()
    await dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
