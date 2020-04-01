import { Connection, ConnectionOptions, createConnections, getConnection } from 'typeorm'
import config from '../config'

export class Db {
  protected static connection: Connection
  private connectionName = 'default'

  constructor(protected connectionOptions: ConnectionOptions | undefined) {}

  get getConnection(): Connection {
    if (!Db.connection) {
      throw new Error('Database connections not initialised')
    }
    return Db.connection
  }

  public async setup(): Promise<Connection[]> {
    return await this.initTypeOrm()
  }

  public async isConnected(): Promise<boolean> {
    return Db.connection.isConnected
  }

  public async close(): Promise<void> {
    if (!Db.connection) {
      throw new Error('Database connections not initialised')
    }
    try {
      console.info(`[db::close dbConnection] - Closing`)
      await Db.connection.close()
    } catch (e) {
      throw e
    }
  }

  private async initTypeOrm(): Promise<Connection[]> {
    try {
      const connections = await createConnections([this.connectionOptions])
      Db.connection = getConnection(this.connectionName)
      return connections
    } catch (e) {
      throw e
    }
  }
}

const db = new Db(config.connection)
export default db
