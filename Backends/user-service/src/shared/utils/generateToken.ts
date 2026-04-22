import jwt, { SignOptions } from 'jsonwebtoken'
import { env } from 'shared/consts/env'

interface PayloadJwt {
  id_user: string
  email: string
  roles: string[]
}

export const generateToken = (payload: PayloadJwt): string => {
  if (!env.SECRET_KEY) throw new Error('Secret key not found')
  const sig = jwt.sign as (
    payload: string | object | Buffer,
    secret: string,
    options?: SignOptions
  ) => string

  return sig(payload, env.SECRET_KEY)
}
