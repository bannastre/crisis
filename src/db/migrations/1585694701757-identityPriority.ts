import { MigrationInterface, QueryRunner } from 'typeorm'
import dbSchema from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
import { GrantEnum } from '../../types'

/**
 * This assigns a common and unique grants to a vulnerable person
 */
export class IdentityPriority1585694701757 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    const identityRepository = transaction.manager.getRepository(Identity)
    const priorityRepository = transaction.manager.getRepository(Priority)
    const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)

    // tslint:disable: variable-name
    const identity: IIdentity = await identityRepository.findOne({
      where: {
        lastName: 'Barton',
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
      identity,
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
      identity,
      priority: transport_public_priority,
    })
    await identitypriorityRepository.save(transport_public_identitypriority)

    /**
     * HEALTHCARE_MEDICINE_DISPENSARY
     *
     */
    const schooling_access_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.SCHOOLING_ACCESS },
    })
    const schooling_access_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity,
      priority: schooling_access_priority,
    })
    await identitypriorityRepository.save(schooling_access_identitypriority)

    /**
     * HEALTHCARE_CARE_VISITORS
     *
     */
    const healthccare_care_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.HEALTHCARE_CARE_VISITORS },
    })
    const healthccare_care_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity,
      priority: healthccare_care_priority,
    })
    await identitypriorityRepository.save(healthccare_care_identitypriority)

    /**
     * HEALTHCARE_MEDICINE_DISPENSARY
     *
     */
    const healthccare_meds_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.HEALTHCARE_MEDICINE_DISPENSARY },
    })
    const healthccare_meds_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity,
      priority: healthccare_meds_priority,
    })
    await identitypriorityRepository.save(healthccare_meds_identitypriority)

    await transaction.commitTransaction()
    await dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
