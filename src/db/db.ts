import { Connection, ConnectionOptions, createConnections, getConnection } from 'typeorm'
import { mssqlConnection } from '../config'

export class Db {
  protected connection: Connection

  constructor(protected connectionOptions: ConnectionOptions | undefined) {}

  get getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Database connections not initialised')
    }
    return this.connection
  }

  public async setup(): Promise<Connection[]> {
    return await this.initTypeOrm()
  }

  public async close(): Promise<void> {
    if (!this.connection) {
      throw new Error('Database connections not initialised')
    }
    try {
      await this.connection.close()
    } catch (e) {
      throw e
    }
  }

  private async initTypeOrm(): Promise<Connection[]> {
    try {
      const connections = await createConnections([this.connectionOptions])
      this.connection = getConnection('default')
      return connections
    } catch (e) {
      throw e
    }
  }
}

const db = new Db(mssqlConnection)
export default db
