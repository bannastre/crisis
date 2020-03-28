import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import config from './config'
import dbSchema from './db'
import indexRouter from './routes'
import { OpenApiValidator } from 'express-openapi-validator'
import * as http from 'http'
import path from 'path'

const app: express.Express = express()

export async function start(): Promise<http.Server> {
  try {
    console.debug('configuring using....')
    console.debug(config)

    const connections = await dbSchema.initialiseDatabaseConnections()
    connections.map((connection: any) => {
      console.log(
        `${connection.name}: ${connection.options.username}@${connection.options.host}:${connection.options.port}
        (${connection.options.database})\n`,
        `connected: ${connection.isConnected}`
      )
    })

    app.disable('x-powered-by')

    app.use(cors())
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.text())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())

    // TODO: security - check jwt

    return await new OpenApiValidator({
      apiSpec: path.join(__dirname, '../../definitions/crisis.yaml'),
      validateRequests: { allowUnknownQueryParameters: false },
      validateResponses: true,
      unknownFormats: ['jwt', 'uuid'],
    })
      .install(app)
      .then(() => {
        app.use(config.basePath, indexRouter)

        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
          res.locals.message = err.message
          res.locals.error = req.app.get('env') === 'development' ? err : {}
          res.status(err.status || 500)
          next(err)
        })

        return app.listen(config.port, () => {
          console.log(
            `Express server listening on port ${config.port} in ${config.env} mode with base path of ${config.basePath}.`
          )
        })
      })
  } catch (err) {
    console.error(err)
  }
}

export default app
