import { IScopedRequest, IGrant, GrantEnum, ErrorEnum } from '../types'
import { NextFunction, Response } from 'express'
import { constants } from 'http2'

const mobileNumberArray = ['07843627130']

export default class PriorityController {
  public get = (req: IScopedRequest, res: Response, next: NextFunction) => {
    try {
      const { priorityGrant, mobileNumber } = req.query
      let grant: IGrant
      switch (priorityGrant) {
        case GrantEnum.FOOD_DELIVERY:
          if (mobileNumberArray.includes(mobileNumber)) {
            grant = { priority: GrantEnum.FOOD_DELIVERY, valid: true }
          } else {
            grant = { priority: GrantEnum.FOOD_DELIVERY, valid: false }
          }
          break
        default:
          throw new Error(ErrorEnum.PRIORITY_GRANT_NOT_FOUND)
      }
      res.status(constants.HTTP_STATUS_OK).json(grant)
    } catch (err) {
      switch (err.message) {
        case ErrorEnum.PRIORITY_GRANT_NOT_FOUND:
          res.status(404).end()
          break
        default:
          res.status(500).end()
      }
    }
  }
}
