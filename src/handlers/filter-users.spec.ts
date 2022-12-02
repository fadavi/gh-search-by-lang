import { expect } from 'chai'
import { prepareResponse, prepareSearchOptions } from './filter-users'

describe('handlers/filter-users', () => {
  context('prepareResponse', () => {
    it('sets non-existing properties to null (0 for followersCount)', () => {
      const data = {
        search: {
          edges: [{
            node: {}
          }],
          pageInfo: {},
          totalCount: 1234
        }
      }

      const { users, pageInfo, totalCount } = prepareResponse(data)

      expect(pageInfo).to.be.eql(data.search.pageInfo)
      expect(totalCount).to.be.eql(data.search.totalCount)
      expect(users).to.be.an('array').with.lengthOf(1)
      expect(users[0]).to.be.eql({
        username: null,
        name: null,
        avatarUrl: null,
        followersCount: 0
      })
    })
  })

  context('prepareSearchOptions', () => {
    it('sets last and before when before is truthy', () => {
      const opts = prepareSearchOptions({
        langs: 'c',
        limit: 123,
        before: 'cursor'
      })

      expect(opts).to.be.eql({
        query: 'language:c',
        last: 123,
        before: 'cursor'
      })
    })

    it('sets first and after when after is truthy', () => {
      const opts = prepareSearchOptions({
        langs: 'c',
        limit: 123,
        after: 'cursor'
      })

      expect(opts).to.be.eql({
        query: 'language:c',
        first: 123,
        after: 'cursor'
      })
    })

    it('sets first when before and after are falsey', () => {
      const opts = prepareSearchOptions({
        langs: 'c',
        limit: 123
      })

      expect(opts).to.be.eql({
        query: 'language:c',
        first: 123
      })
    })
  })
})

describe('endpoints', () => {
  context('GET /users', () => {
    // WIP
  })
})
