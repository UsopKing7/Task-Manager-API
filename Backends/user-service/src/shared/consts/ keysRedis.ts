export const keys = {
  user: 'user',
  user_info: 'user-info',
  backlist: 'blacklist'
}

export const keyUser = (id_user: string): string => { return `${keys.user}:${id_user}` }
export const keyUserInfo = (id_user: string): string => { return `${keys.user_info}:${id_user}` }
export const keyBalclistToken = (token: string): string => { return `${keys.backlist}:${token}` }

