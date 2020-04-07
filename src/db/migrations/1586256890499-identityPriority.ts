import { MigrationInterface, QueryRunner } from 'typeorm'
import { DbSchema, Db } from '..'
import { Identity, IIdentity } from '../entities/identity'
import { Priority, IPriority } from '../entities/priority'
import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
import { GrantEnum } from '../../types'
export class IdentityPriority1586253493669 implements MigrationInterface {
  dbSchema = new DbSchema(new Db(config.connection))
  public async up(): Promise<any> {
    await this.dbSchema.initialiseDatabaseConnections()
    const transaction = await this.dbSchema.getTransaction()
    const identityRepository = transaction.manager.getRepository(Identity)
    const priorityRepository = transaction.manager.getRepository(Priority)
    const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)
    // Create Identity
    const anyIdentities: IIdentity[] = await identityRepository.find()
    const anyPriority: IPriority = await priorityRepository.create({
      grant: GrantEnum.ANY,
      description: 'Any priority grant',
    })
    const savedAnyPriority = await priorityRepository.save(anyPriority)
    await Promise.all(
      anyIdentities.map(async (anyIdentity: IIdentity) => {
        const idPriority: IIdentitypriority = await identitypriorityRepository.create({
          identity: anyIdentity,
          priority: savedAnyPriority,
        })
        return await identitypriorityRepository.save(idPriority)
      })
    )
    await transaction.commitTransaction()
    await this.dbSchema.closeDatabaseConnections()
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
