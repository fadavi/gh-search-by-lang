import { expect } from 'chai'
import { buildLanguagesQuery, buildSignedKeyValue, sanitizeLanguage } from './sanitize'

describe('lib/sanitize', () => {
  context('sanitizeLanguage', () => {
    it('trims all whitespace characters', () => {
      expect(sanitizeLanguage(' \t\nl i\ts \np\r\n   '))
        .to.be.equal('lisp')
    })

    it('removes all colons', () => {
      expect(sanitizeLanguage(':a:weird::programming:language::'))
        .to.be.equal('aweirdprogramminglanguage')
    })
  })

  context('buildSignedKeyValue', () => {
    it('returns key:value normally', () => {
      expect(buildSignedKeyValue('key', 'value'))
        .to.be.equal('key:value')
    })

    it('moves the hyphen before the key if it exists', () => {
      expect(buildSignedKeyValue('key', '-value'))
        .to.be.equal('-key:value')
    })
  })

  context('buildLanguageQuery', () => {
    it('returns sanitized languages', () => {
      const query = buildLanguagesQuery([
        ' java:script\t',
        '\n\n\r   \t',
        ' S\tQ\tL ',
        'language:C++',
        '-c#',
        'c--'
      ])

      expect(query).to.be.equal([
        'language:javascript',
        'language:SQL',
        'language:languageC++',
        '-language:c#',
        'language:c--'
      ].join(' '))
    })
  })
})
