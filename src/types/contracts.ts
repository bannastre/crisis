import { Request } from 'express'
import { GrantEnum, IdentityTypeEnum } from './enums'

export interface IScopedRequest extends Request {
  user: any
}

export interface IGrantResponse {
  priority: IdentityTypeEnum | GrantEnum
  valid: boolean
}
