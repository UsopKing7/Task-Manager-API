import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  SALT: z.coerce.number().default(10),
  EMAIL: z.string().min(1, 'EMAIL is required'),
  PASSWORD: z.string().min(1, 'PASSWORD is required'),
  SECRET_KEY: z.string().min(1, 'SECRET_KEY is required'),
  EXPIRES_IN: z.coerce.number().default(86400000),
  REDIS_URL: z.string().min(1, 'REDIS_HOST is required'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.log('[X][ERROR][ENV] Invalid environment variables:')
  console.table(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data

