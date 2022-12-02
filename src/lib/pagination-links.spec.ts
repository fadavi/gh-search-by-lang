import { expect } from 'chai'
import { createPaginationLinks, createUrlByRequest } from './pagination-links'

describe('lib/pagination-links', () => {
  context('createUrlByRequest', () => {
    it('uses http as default protocol', () => {
      const url = createUrlByRequest({
        hostname: 'foo',
        url: '/bar',
      })

      expect(url).to.be.equal('http://foo/bar')
    })

    it('returns relative url when hostname is falsey', () => {
      const url = createUrlByRequest({
        protocol: 'http',
        url: '/foo',
      }, {
        bar: 'baz',
      })

      expect(url).to.be.equal('/foo?bar=baz')
    })

    it('deletes null params', () => {
      const url = createUrlByRequest({
        protocol: 'http',
        hostname: 'foo',
        url: '/bar?baz=qux',
      }, {
        baz: null,
        qux: null,
      })

      expect(url).to.be.equal('http://foo/bar')
    })

    it('sets non-null search params', () => {
      const url = createUrlByRequest({
        protocol: 'http',
        hostname: 'foo',
        url: '/bar?param1=value1',
      }, {
        param1: 'value2',
        param2: 'value3',
      })

      expect(url).to.be.equal('http://foo/bar?param1=value2&param2=value3')
    })
  })

  context('createPaginationLinks', () => {
    it('sets link to next page when there are more pages', () => {
      const links = createPaginationLinks({}, {
        hasNextPage: true,
        endCursor: 'thecursor',
      })

      expect(links).to.be.eql({ next: '/?after=thecursor' })
    })

    it('sets link to prev page when there are prevsious pages', () => {
      const links = createPaginationLinks({}, {
        hasPreviousPage: true,
        startCursor: 'thecursor',
      })

      expect(links).to.be.eql({ prev: '/?before=thecursor' })
    })
  })
})
