import crypto from 'crypto'

/**
 * Hash a string using SHA-256
 * @param string - The string to hash
 */
export default async function hash(string: string) {
  const utf8 = new TextEncoder().encode(string)
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('')
  return hashHex
}
