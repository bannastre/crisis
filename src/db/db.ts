import { Connection, ConnectionOptions, createConnections, getConnection } from 'typeorm'
import config from '../config'

export class Db {
  protected connection: Connection
  private connectionName = 'crisis'

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

  public async isConnected(): Promise<boolean> {
    return this.connection.isConnected
  }

  public async close(): Promise<void> {
    if (!this.connection) {
      throw new Error('Database connections not initialised')
    }
    try {
      console.info(`[db::close dbConnection] - Closing`)
      await this.connection.close()
    } catch (e) {
      throw e
    }
  }

  private async initTypeOrm(): Promise<Connection[]> {
    try {
      const connections = await createConnections([this.connectionOptions])
      this.connection = getConnection(this.connectionName)
      return connections
    } catch (e) {
      throw e
    }
  }
}

const db = new Db(config.connection)
export default db
