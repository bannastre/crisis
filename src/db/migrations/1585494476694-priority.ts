import { MigrationInterface, QueryRunner } from 'typeorm'
import dbSchema from '../'
import config from '../../config'
import { GrantEnum } from '../../types'
import { Priority, IPriority } from '../entities/priority'

export class Priority1585494476694 implements MigrationInterface {
  public async up(): Promise<any> {
    await dbSchema.initialiseDatabaseConnections()
    const transaction = await dbSchema.getTransaction()

    /**
     * Create an priority
     */
    const priorityRepository = transaction.manager.getRepository(Priority)

    const priorityEntity: IPriority = priorityRepository.create({
      grant: GrantEnum.FOOD_DELIVERY,
      description: 'Food delivery services',
    })

    await priorityRepository.save(priorityEntity)

    await transaction.commitTransaction()
    await dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[priority]`)
  }
}
