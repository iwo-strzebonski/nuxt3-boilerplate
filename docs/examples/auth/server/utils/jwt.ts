import * as jose from 'jose'

const runtimeConfig = useRuntimeConfig()

/**
 * Encrypt data into a JWT
 * @param data - Payload to encrypt
 */
export async function encrypt<T extends jose.JWTPayload>(data: T): Promise<string> {
  if (!runtimeConfig.JWT_SECRET) throw new Error('JWT_SECRET is not defined')
  if (!runtimeConfig.JWT_EXPIRES_IN) throw new Error('JWT_EXPIRES_IN is not defined')
  if (!runtimeConfig.JWT_ISSUER) throw new Error('JWT_ISSUER is not defined')

  const secret = jose.base64url.decode(runtimeConfig.JWT_SECRET)

  const jwt = await new jose.EncryptJWT(data)
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer(`urn:${runtimeConfig.JWT_ISSUER}:issuer`)
    .setAudience(`urn:${runtimeConfig.JWT_ISSUER}:audience`)
    .setExpirationTime(runtimeConfig.JWT_EXPIRES_IN)
    .encrypt(secret)

  return jwt
}

/**
 * Decrypt and verify a JWT
 * @param jwt - The encrypted JWT string
 */
export async function decrypt<T extends jose.JWTPayload>(jwt: string): Promise<T | Error> {
  if (!runtimeConfig.JWT_SECRET) throw new Error('JWT_SECRET is not defined')
  if (!runtimeConfig.JWT_ISSUER) throw new Error('JWT_ISSUER is not defined')

  const secret = jose.base64url.decode(runtimeConfig.JWT_SECRET)

  try {
    const { payload } = await jose.jwtDecrypt<T>(jwt, secret, {
      issuer: `urn:${runtimeConfig.JWT_ISSUER}:issuer`,
      audience: `urn:${runtimeConfig.JWT_ISSUER}:audience`
    })

    return payload
  } catch (error) {
    return new Error('Invalid JWT')
  }
}
