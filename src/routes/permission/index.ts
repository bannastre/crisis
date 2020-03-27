import express, { Request, Response, NextFunction } from 'express'

export const permissionRouter = express.Router()

permissionRouter.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'OK' })
})
