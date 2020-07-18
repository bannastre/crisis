import { Connection, ObjectType, QueryRunner } from 'typeorm'
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel'

import Db from './db'

export interface IDbSchema {
  initialiseDatabaseConnections(): Promise<Connection[]>
  closeDatabaseConnections(): Promise<void>
  getTransaction(isolationLevel?: IsolationLevel): Promise<QueryRunner>
  getQueryRunner(): Promise<QueryRunner>
  isConnected(): Promise<boolean>
  getCustomRepository<T>(queryRunner: QueryRunner, customRepository: ObjectType<T>): T
}

export class DbSchema implements IDbSchema {
  constructor(private db: Db) {}

  async closeDatabaseConnections(): Promise<void> {
    return await this.db.close()
  }

  async isConnected(): Promise<boolean> {
    return await this.db.isConnected()
  }

  async initialiseDatabaseConnections(): Promise<Connection[]> {
    return await this.db.setup()
  }

  // NOTE: Loosening restrictions on SERIALIZABLE transactions to
  // NOTE: READ COMMITTED due to race conditions on dirty transactions
  async getTransaction(isolationLevel: IsolationLevel = 'READ COMMITTED'): Promise<QueryRunner> {
    console.info('[DbSchema::getTransaction]')
    const connection: Connection = this.db.getConnection

    const queryRunner = connection.createQueryRunner()
    if (!connection.isConnected) {
      queryRunner.connect()
    }

    await queryRunner.startTransaction(isolationLevel)
    if (isolationLevel === 'SERIALIZABLE') {
      queryRunner.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE')
    }
    return queryRunner
  }

  async getQueryRunner(): Promise<QueryRunner> {
    const connection: Connection = this.db.getConnection
    console.info('DbSchema::getQueryRunner')
    const queryRunner = await connection.createQueryRunner()
    return queryRunner
  }

  getCustomRepository<T>(queryRunner: QueryRunner, customRepository: ObjectType<T>): T {
    const entityManager = queryRunner.manager
    console.info('DbSchema::getCustomRepository')
    return entityManager.getCustomRepository(customRepository)
  }
}

export { Db }
