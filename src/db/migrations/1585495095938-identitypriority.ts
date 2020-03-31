import { MigrationInterface, QueryRunner } from 'typeorm'
import dbSchema from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
import { GrantEnum } from '../../types'

export class Identitypriority1585495095938 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    const identityRepository = transaction.manager.getRepository(Identity)
    const priorityRepository = transaction.manager.getRepository(Priority)
    const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)

    const identities: IIdentity[] = await identityRepository.find()

    // tslint:disable: variable-name
    // FOOD_DELIVERY
    const food_delivery_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.FOOD_DELIVERY },
    })
    const food_delivery_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identities[0],
      priority: food_delivery_priority,
    })
    await identitypriorityRepository.save(food_delivery_identitypriority)
    const food_delivery_identitypriority_2: IIdentitypriority = identitypriorityRepository.create({
      identity: identities[1],
      priority: food_delivery_priority,
    })
    await identitypriorityRepository.save(food_delivery_identitypriority_2)

    // TRANSPORT_PUBLIC
    const transport_public_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.TRANSPORT_PUBLIC },
    })
    const transport_public_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identities[0],
      priority: transport_public_priority,
    })
    await identitypriorityRepository.save(transport_public_identitypriority)
    const transport_public_identitypriority_2: IIdentitypriority = identitypriorityRepository.create({
      identity: identities[1],
      priority: transport_public_priority,
    })
    await identitypriorityRepository.save(transport_public_identitypriority_2)

    // SCHOOLING_ACCESS
    const schooling_access_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.SCHOOLING_ACCESS },
    })
    const schooling_access_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identities[0],
      priority: schooling_access_priority,
    })
    await identitypriorityRepository.save(schooling_access_identitypriority)

    // HEALTHCARE_MEDECINE_DISPENSARY
    const healthcare_medecine_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.HEALTHCARE_MEDECINE_DISPENSARY },
    })
    const healthcare_medecine_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identities[0],
      priority: healthcare_medecine_priority,
    })
    await identitypriorityRepository.save(healthcare_medecine_identitypriority)

    // HEALTHCARE_CARE_VISITORS
    const healthccare_care_priority: IPriority = await priorityRepository.findOne({
      where: { grant: GrantEnum.HEALTHCARE_CARE_VISITORS },
    })
    const healthccare_care_identitypriority: IIdentitypriority = identitypriorityRepository.create({
      identity: identities[0],
      priority: healthccare_care_priority,
    })
    await identitypriorityRepository.save(healthccare_care_identitypriority)

    await transaction.commitTransaction()
    await dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
