import { Connection, ObjectType, QueryRunner } from 'typeorm'
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel'

import db from './db'

export interface DbSchema {
  initialiseDatabaseConnections(): Promise<Connection[]>
  closeDatabaseConnections(): Promise<void>
  getTransaction(isolationLevel?: IsolationLevel): Promise<QueryRunner>
  getQueryRunner(): Promise<QueryRunner>
  getCustomRepository<T>(queryRunner: QueryRunner, customRepository: ObjectType<T>): T
}

async function closeDatabaseConnections(): Promise<void> {
  return db.close()
}

async function initialiseDatabaseConnections(): Promise<Connection[]> {
  return db.setup()
}

// NOTE: Loosening restrictions on SERIALIZABLE transactions to
// NOTE: READ COMMITTED due to race conditions on dirty transactions
async function getTransaction(isolationLevel: IsolationLevel = 'READ COMMITTED'): Promise<QueryRunner> {
  const connection: Connection = db.getConnection
  const queryRunner = await connection.createQueryRunner()
  await queryRunner.startTransaction(isolationLevel)
  console.info('DbSchema::getTransaction')
  if (isolationLevel === 'SERIALIZABLE') {
    queryRunner.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE')
  }
  return queryRunner
}

async function getQueryRunner(): Promise<QueryRunner> {
  const connection: Connection = db.getConnection
  console.info('DbSchema::getQueryRunner')
  const queryRunner = await connection.createQueryRunner()
  return queryRunner
}

function getCustomRepository<T>(queryRunner: QueryRunner, customRepository: ObjectType<T>): T {
  const entityManager = queryRunner.manager
  console.info('DbSchema::getCustomRepository')
  return entityManager.getCustomRepository(customRepository)
}

const dbSchema: DbSchema = {
  closeDatabaseConnections,
  getCustomRepository,
  getQueryRunner,
  getTransaction,
  initialiseDatabaseConnections,
}

export default dbSchema
