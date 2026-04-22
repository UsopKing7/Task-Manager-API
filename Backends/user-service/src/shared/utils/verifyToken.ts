import jwt from 'jsonwebtoken'
import { env } from 'shared/consts/env'
import { RequestUser } from './req-globals'

export const verifyToken = (token: string): RequestUser => {
  if (!env.SECRET_KEY) throw new Error('Secret key not found')
  return jwt.verify(token, env.SECRET_KEY) as RequestUser
}
