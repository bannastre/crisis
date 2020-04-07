import { GrantEnum, ErrorEnum, IdentityTypeEnum } from './enums'
import { IScopedRequest, IGrantResponse } from './contracts'

interface IGrant {
  priority: GrantEnum
  valid: boolean
}

export { ErrorEnum, GrantEnum, IdentityTypeEnum, IGrant, IGrantResponse, IScopedRequest }
