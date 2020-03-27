import { Request } from 'express'

export enum GrantEnum {
  FOOD_DELIVERY = 'food::delivery',
}

export enum ErrorEnum {
  PRIORITY_GRANT_NOT_FOUND = '404 - Not Found',
}

export interface IScopedRequest extends Request {
  user: any
}

export interface IGrant {
  priority: GrantEnum
  valid: boolean
}
