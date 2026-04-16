const { PORT, SALT, EMAIL, PASSWORD } = process.env

export const env = {
  PORT: Number(PORT) || 3000,
  SALT: Number(SALT) || 10,
  EMAIL: String(EMAIL),
  PASSWORD: String(PASSWORD)
}
