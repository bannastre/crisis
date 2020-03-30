import { Request } from 'express'
import { GrantEnum, ErrorEnum } from './enums'
import { IScopedRequest, IGrantResponse } from './contracts'

interface IGrant {
  priority: GrantEnum
  valid: boolean
}

export { ErrorEnum, GrantEnum, IGrant, IGrantResponse, IScopedRequest }
