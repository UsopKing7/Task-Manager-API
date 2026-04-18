const { PORT, SALT, EMAIL, PASSWORD, SECRET_KEY, EXPIRES_IN } = process.env

export const env = {
  PORT: Number(PORT) || 3000,
  SALT: Number(SALT) || 10,
  EMAIL: String(EMAIL),
  PASSWORD: String(PASSWORD),
  SECRET_KEY: String(SECRET_KEY),
  EXPIRES_IN: EXPIRES_IN
}
