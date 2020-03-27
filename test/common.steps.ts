// tslint:disable: no-console
import dotenv from 'dotenv'
import chai from 'chai'
import { Before, BeforeAll, Then, When } from 'cucumber'
import express from 'express'
import rp from 'request-promise'
import { v4 } from 'uuid'

import app, { start } from '../src/app'
import config from '../config'

dotenv.config()

chai.should()

BeforeAll(async () => {
  await start()
})

Before(function(scenario) {
  console.log('\nScenario: ', scenario.pickle.name)
  this.headers = { 'x-correlation-id': v4(), 'x-person-id': v4() }
})

When('I call {string} {string}', async function(method, path) {
  this.response = await rp({
    body: this.body,
    form: this.form,
    headers: {
      ...this.headers,
      authorization: `Bearer someToken}`,
    },
    json: true,
    method,
    qs: this.qs,
    resolveWithFullResponse: true,
    simple: false,
    url: `${config.test.url}${path}`,
  })
})

Then('I should get the expected status code {int}', function(statusCode) {
  this.response.statusCode.should.equal(statusCode)
})
