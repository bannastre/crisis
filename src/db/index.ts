import { Connection, ObjectType, QueryRunner } from 'typeorm'
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel'

import db from './db'

export interface DbSchema {
  initialiseDatabaseConnections(): Promise<Connection[]>
  closeDatabaseConnections(): Promise<void>
  getTransaction(isolationLevel?: IsolationLevel): Promise<QueryRunner>
  getQueryRunner(): Promise<QueryRunner>
  isConnected(): Promise<boolean>
  getCustomRepository<T>(queryRunner: QueryRunner, customRepository: ObjectType<T>): T
}

async function closeDatabaseConnections(): Promise<void> {
  return await db.close()
}

async function isConnected(): Promise<boolean> {
  return await db.isConnected()
}

async function initialiseDatabaseConnections(): Promise<Connection[]> {
  return await db.setup()
}

// NOTE: Loosening restrictions on SERIALIZABLE transactions to
// NOTE: READ COMMITTED due to race conditions on dirty transactions
async function getTransaction(isolationLevel: IsolationLevel = 'READ COMMITTED'): Promise<QueryRunner> {
  console.info('[DbSchema::getTransaction]')
  const connection: Connection = db.getConnection

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
  isConnected,
}

export default dbSchema
