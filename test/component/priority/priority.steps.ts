// tslint:disable: no-console only-arrow-functions
import { After, Before, Given, Then } from 'cucumber'
import sinon from 'ts-sinon'
import { GrantEnum, IdentityTypeEnum } from '../../../src/types'
import IdentityRepository from '../../../src/db/repositories/identity'
import { Identity } from '../../../src/db/entities/identity'

const identityMock: Identity = {
  id: 'C6FB423E-F36B-1410-83CA-00702EAE709F',
  type: IdentityTypeEnum.KEY_WORKER,
  firstName: 'Kit',
  lastName: 'Harper',
  email: 'chris@jigsaw.xyz',
  dob: '26-10-1983',
  createdAt: '2020-04-07T06:55:06.273Z',
  updatedAt: '2020-04-07T06:55:06.273Z',
  // @ts-ignore circular call for the identity this smsNumber belongs to
  smsNumber: {
    id: 'C1FB423E-F36B-1410-83CA-00702EAE709F',
    countryCode: '44',
    number: '7700900077',
    createdAt: '2020-04-07T06:55:06.250Z',
    updatedAt: '2020-04-07T06:55:06.250Z',
  },
  identitypriorities: [
    // @ts-ignore circular call for the identity this identityPriority belongs to
    {
      id: 'D9FB423E-F36B-1410-83CA-00702EAE709F',
      createdAt: '2020-04-07T06:55:06.830Z',
      updatedAt: '2020-04-07T06:55:06.830Z',
      priority: {
        id: 'C7FB423E-F36B-1410-83CA-00702EAE709F',
        grant: GrantEnum.FOOD_DELIVERY,
        description: 'Food delivery services',
        createdAt: '2020-04-07T06:55:06.490Z',
        updatedAt: '2020-04-07T06:55:06.490Z',
      },
    },
  ],
}

Before(function () {
  // identityRepositoryStub - Stubs SQL interactions from TypeOrm to Database
  this.idRepositoryStub = sinon.stub(IdentityRepository.prototype, 'findByMobileAndGrant')
  this.idRepositoryStub.withArgs({ countryCode: '44', number: '7700900077' }, GrantEnum.FOOD_DELIVERY).returns(
    new Promise((resolve) => {
      resolve(identityMock)
    })
  )
  this.idRepositoryStub.withArgs({ countryCode: '44', number: '7700900077' }).returns(
    new Promise((resolve) => {
      resolve(identityMock)
    })
  )
  this.idRepositoryStub.withArgs({ countryCode: '44', number: '7700900077' }, 'not|known').returns(
    new Promise((resolve) => {
      resolve(undefined)
    })
  )
})

Given('I have a known {string} query parameter', function (qp: string) {
  switch (qp) {
    case 'mobileNumber':
      this.qs = {
        mobileNumber: '+447700900077',
        ...this.qs,
      }
      break
    case 'priorityGrant':
      this.qs = {
        priorityGrant: GrantEnum.FOOD_DELIVERY,
        ...this.qs,
      }
      break
    default:
      this.qs = null
  }
})

Given('I have an unknown {string} query parameter', function (qp: string) {
  switch (qp) {
    case 'mobileNumber':
      this.qs = {
        mobileNumber: '+447700900078',
        ...this.qs,
      }
      break
    case 'priorityGrant':
      this.qs = {
        priorityGrant: 'not|known',
        ...this.qs,
      }
      break
    default:
      this.qs = null
  }
})

Given('I have a {string} header', function (header: string) {
  switch (header) {
    case 'ocp-apim-subscription-key':
      this.headers = {
        ['ocp-apim-subscription-key']: 'any_mocked_header_value',
        ...this.headers,
      }
      break
    default:
      this.headers = null
  }
})

Then('I should get a response containing the attribute {string} with value {string}', function (
  attr: string,
  val: string | boolean
) {
  this.response.body[attr].toString().should.eql(val)
})

After(async function () {
  sinon.restore()
})
