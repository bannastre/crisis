import express, { Router } from 'express'
import { PriorityController } from '../../controllers'
import { DbSchema } from '../../db'
import PriorityService from '../../services/priority'
import IdentityRepository from '../../db/repositories/identity'

const priorityRouter = (dbSchema: DbSchema): Router => {
  const thisRouter = express.Router()
  const identityRepository = new IdentityRepository(dbSchema)
  const priorityService = new PriorityService(identityRepository)
  const priorityController = new PriorityController(priorityService)

  thisRouter.get('/', priorityController.get)

  return thisRouter
}

export { priorityRouter }
