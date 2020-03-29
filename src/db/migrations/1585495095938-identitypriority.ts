import { MigrationInterface, QueryRunner } from 'typeorm'
import dbSchema from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'

export class Identitypriority1585495095938 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    const identityRepository = transaction.manager.getRepository(Identity)
    const priorityRepository = transaction.manager.getRepository(Priority)
    const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)

    const identity: IIdentity = await identityRepository.findOneOrFail()
    const priority: IPriority = await priorityRepository.findOneOrFail()

    const identitypriorityEntity: IIdentitypriority = identitypriorityRepository.create({
      identityId: identity.id,
      priority,
    })

    await identitypriorityRepository.save(identitypriorityEntity)

    await transaction.commitTransaction()
    await dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
