import { parsePhoneNumberFromString, CountryCallingCode, NationalNumber, PhoneNumber } from 'libphonenumber-js'
import phone from 'phone'
import { IGrantResponse, GrantEnum, ErrorEnum } from '../types'
import { IPhonenumber } from '../db/entities/phoneNumber'
import IdentityRepository from '../db/repositories/identity'
import { FancyError } from '../helpers'
import { IdentityTypeEnum } from '../types/enums'

export default class PriorityService {
  constructor(private identityRepository: IdentityRepository) {}

  private parsePhoneNumber(phoneNumber: string): IPhonenumber {
    try {
      console.log(`[priorityService::parsePhoneNumber] parsing phone number`)
      const validatedNumber = phone(phoneNumber, 'GB', true)
      const parsedPhoneNumber: PhoneNumber = parsePhoneNumberFromString(validatedNumber[0])

      const countryCode: CountryCallingCode = parsedPhoneNumber ? parsedPhoneNumber.countryCallingCode : '+44'
      const nationalNumber: NationalNumber = parsedPhoneNumber ? parsedPhoneNumber.nationalNumber : phoneNumber

      return { countryCode, number: nationalNumber }
    } catch (err) {
      console.log(`[priorityService::parsePhoneNumber::Error] parsing phone number`)
      throw new FancyError(ErrorEnum.INVALID_PHONE_NUMBER, 400)
    }
  }

  public async findGrantByMobileNo(priorityGrant: GrantEnum, mobileNo: string): Promise<IGrantResponse> {
    try {
      console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`)
      const parsedPhoneNumber: IPhonenumber = this.parsePhoneNumber(mobileNo)

      const identity = await this.identityRepository.findByMobileAndGrant(parsedPhoneNumber, priorityGrant)

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
