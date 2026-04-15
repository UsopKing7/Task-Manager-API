const { PORT, SALT } = process.env

export const env = {
  PORT: Number(PORT) || 3000,
  SALT: Number(SALT) || 10
}
