import cors from 'cors'
import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import config from '../config'
import indexRouter from './routes'

import * as http from 'http'

const app: express.Express = express()

export async function start(): Promise<http.Server> {
  console.debug('configuring using....')
  console.debug(config)

  app.disable('x-powered-by')

  app.use(cors())
  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  // TODO: security
  // TODO: schema validation

  app.use(config.basePath, indexRouter)

  app.use((err: any, _: any, __: any, next: any) => {
    console.error(err)
    next(err)
  })

  return app.listen(config.port, () => {
    console.log(
      `Express server listening on port ${config.port} in ${config.env} mode with base path of ${config.basePath}.`
    )
  })
}

export default app
