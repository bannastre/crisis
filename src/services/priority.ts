import { parsePhoneNumberFromString, CountryCallingCode, NationalNumber } from 'libphonenumber-js'
import { IGrantResponse, GrantEnum, ErrorEnum } from '../types'
import dbSchema from '../db'
import { Identity } from '../db/entities/identity'
import { Priority } from '../db/entities/priority'
import { Phonenumber, IPhonenumber } from '../db/entities/phoneNumber'
import { Identitypriority } from '../db/entities/identitypriority'
import { FancyError } from '../helpers'

export default class PriorityService {
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
      const identity = await identityRepository
        .createQueryBuilder('identity')
        .innerJoinAndSelect('identity.smsNumber', 'smsNumber')
        .innerJoinAndSelect('identity.identitypriorities', 'identitypriority')
        .leftJoinAndSelect('identitypriority.priority', 'priority')
        .where('smsNumber.number = :smsNumberNumber', {
          smsNumberNumber: parsedMobileNumber.number,
        })
        .andWhere('smsNumber.countryCode = :smsNumberCountryCode', {
          smsNumberCountryCode: parsedMobileNumber.countryCode,
        })
        .andWhere('priority.grant = :grant', {
          grant: priorityGrant,
        })
        .getOne()

      console.log(`[priorityService::findGrantsByMobileNo] Priority Grant checked against identity.smsnumber`)
      return { priority: priorityGrant, valid: !!identity }
    } catch (err) {
      console.log(err)
      console.error('[priorityService::findGrantsByMobileNo::Error] ' + err.message)
      throw new FancyError(err, ErrorEnum.UNKNOWN_ERROR)
    } finally {
      await transaction.release()
      console.log(`[priorityService::findGrantsByMobileNo::Finally] Transaction released: ${transaction.isReleased}`)
    }
  }
}
