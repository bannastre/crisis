import express, { Router } from 'express'

import { healthcheckRouter } from './healthcheck'
import { priorityRouter } from './priority'
import { DbSchema } from '../db'

const indexRouter = (dbSchema: DbSchema): Router => {
  const router: Router = express.Router()

  router.use('/healthcheck', healthcheckRouter)
  router.use('/priority', priorityRouter(dbSchema))

  return router
}

export default indexRouter
