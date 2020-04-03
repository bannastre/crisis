import { MigrationInterface, QueryRunner } from 'typeorm'
// import dbSchema from '..'
// import { Identity, IIdentity } from '../entities/identity'
// import { Priority, IPriority } from '../entities/priority'
// import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
import config from '../../config'
// import { GrantEnum } from '../../types'

/**
 * This assigns a unique grants to a key worker
 */
export class IdentityPriority1585694699034 implements MigrationInterface {
  public async up(): Promise<any> {
    /**
     *
     * NO LONGER REQUIRED
     *
     */
    // await dbSchema.initialiseDatabaseConnections()
    // const transaction = await dbSchema.getTransaction()
    // const identityRepository = transaction.manager.getRepository(Identity)
    // const priorityRepository = transaction.manager.getRepository(Priority)
    // const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)
    // const identity: IIdentity = await identityRepository.findOne({
    //   where: {
    //     lastName: 'Harper',
    //   },
    // })
    // /**
    //  * SCHOOLING_ACCESS
    //  *
    //  */
    // // tslint:disable: variable-name
    // const schooling_access_priority: IPriority = await priorityRepository.findOne({
    //   where: { grant: GrantEnum.SCHOOLING_ACCESS },
    // })
    // const schooling_access_identitypriority: IIdentitypriority = identitypriorityRepository.create({
    //   identity,
    //   priority: schooling_access_priority,
    // })
    // await identitypriorityRepository.save(schooling_access_identitypriority)
    // await transaction.commitTransaction()
    // await dbSchema.closeDatabaseConnections()
    return
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[identitypriority]`)
  }
}
