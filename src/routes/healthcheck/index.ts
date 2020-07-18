import express, { Request, Response } from 'express'
import { constants } from 'http2'
import config from '../../config'

export const healthcheckRouter = express.Router()

healthcheckRouter.get('/ping', (_: Request, res: Response) => res.status(200).send({ message: 'ok' }))
healthcheckRouter.get('/ready', async (_: Request, res: Response) => {
  try {
    if (config.env === 'test') {
      res.status(constants.HTTP_STATUS_OK).send({
        message: 'ok',
      })
    } else {
      res.status(constants.HTTP_STATUS_OK).send({
        // TODO: test ping from dependencies
        message: 'ok',
      })
    }
  } catch (error) {
    res.status(constants.HTTP_STATUS_SERVICE_UNAVAILABLE).send()
  }
})
