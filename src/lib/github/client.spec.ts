import { expect } from 'chai'
import { GraphQLClient } from 'graphql-request'
import * as sinon from 'sinon'
import * as githubClient from './client'

describe('lib/github/client', () => {
  let originalToken: string | undefined

  beforeEach(() => originalToken = process.env.GITHUB_TOKEN)
  afterEach(() => {
    process.env.GITHUB_TOKEN = originalToken
    sinon.restore()
  })

  context('createClient', () => {
    it('stops the process if github token is not set', () => {
      delete process.env.GITHUB_TOKEN

      const processExitStub = sinon.stub(process, 'exit')

      const client = githubClient.createClient()
      expect(processExitStub.calledOnceWithExactly(1)).to.be.true
      expect(client).to.be.not.ok
    })

    it('returns a client instance', () => {
      process.env.GITHUB_TOKEN = 'fake-token'

      const client = githubClient.createClient()
      expect(client).to.be.instanceOf(GraphQLClient)
    })
  })

  context('getClient', () => {
    it('caches the created client', () => {
      process.env.GITHUB_TOKEN = 'fake-token'

      const client1 = githubClient.getClient()
      const client2 = githubClient.getClient()
      expect(client1).to.be.equal(client2)
    })
  })
})
