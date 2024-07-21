export enum UserTabsEnum {
  posts = 'posts',
  followers = 'followers',
  subscriptions = 'subscriptions',
  likes = 'likes',
}

// Тип для проверки наличия значения в enum
type UserTabsType = keyof typeof UserTabsEnum;

// Массив значений enum
export const userTabsArray: readonly UserTabsType[] = ['posts', 'followers', 'subscriptions', 'likes']

// Проверка наличия значения в enum
export function isUserTab(tab: string): tab is UserTabsType {
  return Object.values(userTabsArray).includes(tab as UserTabsType)
}
