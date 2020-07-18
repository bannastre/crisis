import { MigrationInterface, QueryRunner } from 'typeorm'
import { DbSchema, Db } from '../'
import config from '../../config'
import { GrantEnum } from '../../types'
import { Priority, IPriority } from '../entities/priority'

/**
 * This creates a prorities
 */
export const priorityEntities: IPriority[] = [
  {
    grant: GrantEnum.FOOD_DELIVERY,
    description: 'Food delivery services',
  },
  {
    grant: GrantEnum.HEALTHCARE_MEDICINE_DISPENSARY,
    description: 'Critical prescriptions & dispensary access',
  },
  {
    grant: GrantEnum.HEALTHCARE_CARE_VISITORS,
    description: 'Healthcare worker visitation priority',
  },
  {
    grant: GrantEnum.TRANSPORT_PRIVATE,
    description: 'Access to private transport during lockdown conditions',
  },
  {
    grant: GrantEnum.TRANSPORT_PUBLIC,
    description: 'Allowed on public transport during lockdown conditions',
  },
  {
    grant: GrantEnum.SCHOOLING_ACCESS,
    description: 'Schooling for children of grant owner',
  },
  {
    grant: GrantEnum.SCHOOLING_MEALS_AFTERSCHOOL,
    description: 'After-School meals for children of grant owner',
  },
]

export class Priority1585494476694 implements MigrationInterface {
  dbSchema = new DbSchema(new Db(config.connection))

  public async up(): Promise<any> {
    await this.dbSchema.initialiseDatabaseConnections()
    const transaction = await this.dbSchema.getTransaction()

    /**
     * Create an priority
     */
    const priorityRepository = transaction.manager.getRepository(Priority)

    await Promise.all(
      priorityEntities.map(async (priority: IPriority) => {
        const priorityEntity = priorityRepository.create(priority)
        return await priorityRepository.save(priorityEntity)
      })
    )

    await transaction.commitTransaction()
    await this.dbSchema.closeDatabaseConnections()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM ${config.connection.database}.dbo.[priority]`)
  }
}
