import { EntityRepository } from 'typeorm'
import { DbSchema } from '../'
import { Identity } from '../entities/identity'
import { IPhonenumber } from '../entities/phoneNumber'
import { GrantEnum, ErrorEnum } from '../../types'
import { FancyError } from '../../helpers'

@EntityRepository()
export default class IdentityRepository {
  constructor(protected dbSchema: DbSchema) {}

  public async findByMobileAndGrant(parsedPhoneNumber: IPhonenumber, priorityGrant?: GrantEnum): Promise<Identity> {
    try {
      console.log(`[identityRepository::findByMobileAndGrant] Starting query`)
      const qr = await this.dbSchema.getQueryRunner()
      const identityRepository = qr.manager.getRepository(Identity)

      priorityGrant = priorityGrant ? priorityGrant : GrantEnum.ANY

      return await identityRepository
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
    } catch (err) {
      console.error('[identityRepository::findByMobileAndGrant::Error] ' + err)
      throw new FancyError(ErrorEnum.UNKNOWN_ERROR)
    }
  }
}
