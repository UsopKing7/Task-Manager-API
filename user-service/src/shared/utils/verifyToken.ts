import jwt from 'jsonwebtoken'
import { env } from 'shared/consts/env'

export const verifyToken = (token: string): string => {
  if (!env.SECRET_KEY) throw new Error('Secret key not found')
  return jwt.verify(token, env.SECRET_KEY) as string
}
