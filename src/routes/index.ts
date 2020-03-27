import express, { Response } from 'express'
import { constants } from 'http2'
import config from '../../config'

import { permissionRouter } from './permission'

const router = express.Router()

router.get('/healthcheck/ping', (_: any, res: Response) => res.status(200).send({ message: 'ok' }))
router.get('/healthcheck/ready', async (_: any, res: Response) => {
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

router.use('/permission', permissionRouter)

export default router
