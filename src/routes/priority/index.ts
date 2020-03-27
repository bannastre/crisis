import express, { Request, Response, NextFunction } from 'express'
import { PriorityController } from '../../controllers'

export const priorityRouter = express.Router()

const priorityController = new PriorityController()

priorityRouter.get('/', priorityController.get)
