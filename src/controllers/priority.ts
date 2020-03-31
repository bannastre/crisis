import { NextFunction, Response } from 'express'
import { constants } from 'http2'
import { IScopedRequest, ErrorEnum } from '../types'
import PriorityService from '../services/priority'

export default class PriorityController {
  constructor(private priorityService = new PriorityService()) {}

  public get = async (req: IScopedRequest, res: Response, next: NextFunction) => {
    try {
      const { priorityGrant, mobileNumber } = req.query

      console.log(
        `[priorityController::get] Searching for ${JSON.stringify(priorityGrant)} linked to smsNumber ${JSON.stringify(
          mobileNumber
        )}`
      )

      const grant = await this.priorityService.findGrantByMobileNo(priorityGrant, mobileNumber)

      console.log(`[priorityController::get] Complete - returning ${JSON.stringify(grant)}`)
      res.status(constants.HTTP_STATUS_OK).json(grant)
    } catch (err) {
      console.error('[priorityController::get] ' + err.message)
      next(err)
    }
  }
}
