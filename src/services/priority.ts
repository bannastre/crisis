import { parsePhoneNumberFromString, CountryCallingCode, NationalNumber } from 'libphonenumber-js'
import { IGrantResponse, GrantEnum, ErrorEnum } from '../types'
import dbSchema from '../db'
import { Identity } from '../db/entities/identity'
import { Priority } from '../db/entities/priority'
import { Phonenumber, IPhonenumber } from '../db/entities/phoneNumber'
import { Identitypriority } from '../db/entities/identitypriority'
import { FancyError } from '../helpers'

export default class PriorityService {
  private errorHandler(err: any) {
    switch (err.name) {
      case 'EntityNotFound':
        return new FancyError(ErrorEnum.ENTITY_NOT_FOUND, 404)
      default:
        return new FancyError(ErrorEnum.UNKNOWN_ERROR)
    }
  }

  private parseMobileNumber(phoneNumber: string): IPhonenumber {
    try {
      console.log(`[priorityService::parseMobileNumber] parsing phone number`)

      const parsedMobileNumber = parsePhoneNumberFromString(phoneNumber)

      const countryCode: CountryCallingCode = parsedMobileNumber.countryCallingCode
      const nationalNumber: NationalNumber = parsedMobileNumber.nationalNumber

      return { countryCode, number: nationalNumber }
    } catch (err) {
      console.log(`[priorityService::parseMobileNumber::Error] parsing phone number`)
      throw err
    }
  }

  public async findGrantByMobileNo(priorityGrant: GrantEnum, mobileNo: string): Promise<IGrantResponse> {
    console.log(`[priorityService::findGrantsByMobileNo] Transaction Opening`)
    const transaction = await dbSchema.getTransaction()
    try {
      console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`)
      const parsedMobileNumber = this.parseMobileNumber(mobileNo)

      const identityRepository = transaction.manager.getRepository(Identity)
      const identities: Identity[] = await identityRepository.find({
        relations: ['smsNumber'],
      })
      // FIXME: This is should be handled by a Join through the ORM
      const identity: Identity = identities.filter((id: Identity) => {
        return (
          id.smsNumber.number === parsedMobileNumber.number &&
          id.smsNumber.countryCode === parsedMobileNumber.countryCode
        )
      })[0]

      if (!identity) {
        throw new FancyError('Identity not found', 404, 'EntityNotFound')
      }
      console.log(`[priorityService::findGrantsByMobileNo] identity found`)

      const priorityRepository = transaction.manager.getRepository(Priority)
      const priority: Priority = await priorityRepository.findOne({ where: { grant: priorityGrant } })
      console.log(`[priorityService::findGrantsByMobileNo] priority found`)

      const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)
      const identitypriority: Identitypriority = await identitypriorityRepository.findOne({
        where: { identityId: identity, priority },
      })

      console.log(`[priorityService::findGrantsByMobileNo] Priority Grant checked against identity.smsnumber`)
      return { priority: priorityGrant, valid: !!identitypriority }
    } catch (err) {
      console.error('[priorityService::findGrantsByMobileNo::Error] ' + err.message)
      throw this.errorHandler(err)
    } finally {
      await transaction.release()
      console.log(`[priorityService::findGrantsByMobileNo::Finally] Transaction released: ${transaction.isReleased}`)
    }
  }
}
