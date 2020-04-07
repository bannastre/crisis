import { MigrationInterface, QueryRunner } from 'typeorm'
import { DbSchema, Db } from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
import { GrantEnum } from '../../types'

/**
 * This assigns a common and unique grants to a real people for demo purposes
 */
export class IdentityPriority1585773985630 implements MigrationInterface {
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
    const identity: IIdentity = await identityRepository.findOne({
      where: {
        lastName: 'Amla',
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
     * SCHOOLING_ACCESS
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
     *  SHEILDED PATIENT
     *
     *
     *
     *
     *
     *
     */

    const identity_sp: IIdentity = await identityRepository.findOne({
      where: {
        lastName: 'Rowland',
      },
    })

    /**
     * FOOD_DELIVERY
     *
     */
    const food_delivery_priority_sp: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.FOOD_DELIVERY },
    })
    const food_delivery_identitypriority_sp: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_sp,
      priority: food_delivery_priority_sp,
    })
    await identitypriorityRepository.save(food_delivery_identitypriority_sp)

    /**
     * TRANSPORT_PUBLIC
     *
     */
    const transport_public_priority_sp: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.TRANSPORT_PUBLIC },
    })
    const transport_public_identitypriority_sp: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_sp,
      priority: transport_public_priority_sp,
    })
    await identitypriorityRepository.save(transport_public_identitypriority_sp)

    /**
     * HEALTHCARE_CARE_VISITORS
     *
     */
    const healthccare_care_priority_sp: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.HEALTHCARE_CARE_VISITORS },
    })
    const healthccare_care_identitypriority_sp: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_sp,
      priority: healthccare_care_priority_sp,
    })
    await identitypriorityRepository.save(healthccare_care_identitypriority_sp)

    /**
     * HEALTHCARE_MEDICINE_DISPENSARY
     *
     */
    const healthccare_meds_priority_sp: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.HEALTHCARE_MEDICINE_DISPENSARY },
    })
    const healthccare_meds_identitypriority_sp: IIdentitypriority = identitypriorityRepository.create({
      identity: identity_sp,
      priority: healthccare_meds_priority_sp,
    })
    await identitypriorityRepository.save(healthccare_meds_identitypriority_sp)

    await transaction.commitTransaction()
    await this.dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
