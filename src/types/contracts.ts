import { Request } from 'express'
import { GrantEnum } from './enums'

export interface IScopedRequest extends Request {
  user: any
}

export interface IGrantResponse {
  priority: GrantEnum
  valid: boolean
}
