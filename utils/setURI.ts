export function setURI(uri?: string | string[]) {
  if (uri === undefined) return '/'
  if (typeof uri === 'string') return uri
  return uri.join('/')
}
