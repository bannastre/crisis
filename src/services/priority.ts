import { parsePhoneNumberFromString, CountryCallingCode, NationalNumber } from 'libphonenumber-js'
import phone from 'phone'
import { IGrantResponse, GrantEnum, ErrorEnum } from '../types'
import dbSchema from '../db'
import { Identity } from '../db/entities/identity'
import { IPhonenumber } from '../db/entities/phoneNumber'
import { FancyError } from '../helpers'
import { IdentityTypeEnum } from '../types/enums'

export default class PriorityService {
  private parsePhoneNumber(phoneNumber: string): IPhonenumber {
    try {
      console.log(`[priorityService::parsePhoneNumber] parsing phone number`)
      const validatedNumber = phone(phoneNumber, 'GB', true)
      const parsedPhoneNumber = parsePhoneNumberFromString(validatedNumber[0])

      const countryCode: CountryCallingCode = parsedPhoneNumber ? parsedPhoneNumber.countryCallingCode : '+44'
      const nationalNumber: NationalNumber = parsedPhoneNumber ? parsedPhoneNumber.nationalNumber : phoneNumber

      return { countryCode, number: nationalNumber }
    } catch (err) {
      console.log(`[priorityService::parsePhoneNumber::Error] parsing phone number`)
      throw new FancyError(ErrorEnum.INVALID_PHONE_NUMBER, 400)
    }
  }

  public async findGrantByMobileNo(priorityGrant: GrantEnum, mobileNo: string): Promise<IGrantResponse> {
    const qr = await dbSchema.getQueryRunner()

    try {
      console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`)
      const parsedPhoneNumber = this.parsePhoneNumber(mobileNo)

      const identityRepository = qr.manager.getRepository(Identity)
      const identity = await identityRepository
        .createQueryBuilder('identity')
        .innerJoinAndSelect('identity.smsNumber', 'smsNumber')
        .innerJoinAndSelect('identity.identitypriorities', 'identitypriority')
        .leftJoinAndSelect('identitypriority.priority', 'priority')
        .where('smsNumber.number = :smsNumberNumber', {
          smsNumberNumber: parsedPhoneNumber.number,
        })
        .andWhere('smsNumber.countryCode = :smsNumberCountryCode', {
          smsNumberCountryCode: parsedPhoneNumber.countryCode,
        })
        .andWhere('priority.grant = :grant', {
          grant: priorityGrant,
        })
        .getOne()

      console.log(`[priorityService::findGrantsByMobileNo] Priority Grant checked`)

      const priority: IdentityTypeEnum = identity ? identity.type : IdentityTypeEnum.STANDARD
      const valid: boolean = !!identity
      return { priority, valid }
    } catch (err) {
      console.error('[priorityService::findGrantsByMobileNo::Error] ' + err.message)
      if (err instanceof FancyError) {
        throw err
      }
      throw new FancyError(ErrorEnum.UNKNOWN_ERROR)
    }
  }
}
