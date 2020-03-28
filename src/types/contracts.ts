import { Request } from 'express'

export interface IScopedRequest extends Request {
  user: any
}
