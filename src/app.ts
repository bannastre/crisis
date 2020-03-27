import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
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
}

export default app
