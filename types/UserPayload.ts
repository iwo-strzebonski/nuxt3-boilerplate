import * as jose from 'jose'

export default interface UserPayload extends jose.JWTPayload {
  email: string
}
