import type { GraphQLClient } from 'graphql-request'
import * as sinon from 'sinon'
import * as githubSearch from './search-users'
import * as githubClient from './client'
import { expect } from 'chai'

describe('lib/github/search-users', () => {
  context('searchUsers', () => {
    let getClientStub: sinon.SinonStub<[], GraphQLClient>

    beforeEach(() => getClientStub = sinon.stub(githubClient, 'getClient'))
    afterEach(() => sinon.restore())

    it('makes a graphql request', async () => {
      const fakeResponse = {}
      const requestStub = sinon.stub().resolves(fakeResponse)

      // @ts-expect-error-next-line
      getClientStub.returns({ request: requestStub } as GraphQLClient)
      const resp = await githubSearch.searchUsers({ query: 'language:c' })

      expect(requestStub.calledOnce).to.be.true
      expect(resp).to.be.equal(fakeResponse)
    })
  })
})
