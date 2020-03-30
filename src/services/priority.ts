import { IGrantResponse, GrantEnum, ErrorEnum } from '../types'
import dbSchema from '../db'
import { Identity, IIdentity } from '../db/entities/identity'
import { Priority, IPriority } from '../db/entities/priority'
import { Identitypriority, IIdentitypriority } from '../db/entities/identitypriority'

export default class PriorityService {
  private errorHandler(err: any) {
    switch (err.name) {
      case 'EntityNotFound':
        return new Error(ErrorEnum.IDENTITY_NOT_FOUND)
      default:
        return new Error(ErrorEnum.UNKNOWN_ERROR)
    }
  }

  public async findGrantByMobileNo(priorityGrant: GrantEnum, mobileNo: string): Promise<IGrantResponse> {
    try {
      console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`)
      const transaction = await dbSchema.getTransaction()

      const identityRepository = transaction.manager.getRepository(Identity)
      const identity: IIdentity = await identityRepository.findOneOrFail({ where: { smsNumber: mobileNo } })
      console.log(`[priorityService::findGrantsByMobileNo] identity found`)

      const priorityRepository = transaction.manager.getRepository(Priority)
      const priority: IPriority = await priorityRepository.findOne({ where: { grant: priorityGrant } })
      console.log(`[priorityService::findGrantsByMobileNo] priority found`)

      const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)
      const identitypriority: IIdentitypriority = await identitypriorityRepository.findOne({
        where: { identityId: identity.id, priority },
      })

      console.log(`[priorityService::findGrantsByMobileNo] Priority Grant checked against identity.smsnumber`)
      return { priority: priorityGrant, valid: !!identitypriority }
    } catch (err) {
      console.error('[priorityService::findGrantsByMobileNo::Error] ' + err.message)
      throw this.errorHandler(err)
    }
  }
}
