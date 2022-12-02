const ALL_SPACES_AND_COLONS = /[\s:]+/g

export function sanitizeLanguage(lang: string): string {
  return lang.replace(ALL_SPACES_AND_COLONS, '')
}

export function buildSignedKeyValue(key: string, value: string): string {
  if (value.startsWith('-')) {
    return `-${key}:${value.substring(1)}`
  }

  return `${key}:${value}`
}

export function buildLanguagesQuery(langs: string[]): string {
  return langs
    .map(sanitizeLanguage)
    .filter(Boolean)
    .map(lang => buildSignedKeyValue('language', lang))
    .join(' ')
}
