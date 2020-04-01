import { Connection, ConnectionOptions, createConnections, getConnection } from 'typeorm'
import config from '../config'

export class Db {
  protected connection: Connection

  constructor(protected connectionOptions: ConnectionOptions | undefined) {}

  public getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Database connections not initialised')
    }
    // @ts-ignore
    this.connection.buildMetadatas()
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
      this.connection = getConnection('crisis_base')
      return connections
    } catch (e) {
      throw e
    }
  }
}

const db = new Db(config.connection)
export default db
