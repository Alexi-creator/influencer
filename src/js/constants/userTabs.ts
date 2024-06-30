export enum UserTabsEnum {
  'posts-no-select' = 'posts-no-select',
  'followers-no-select' = 'followers-no-select',
  followers = 'followers',
  subscriptions = 'subscriptions',
  likes = 'likes',
}

// Тип для проверки наличия значения в enum
type UserTabsType = keyof typeof UserTabsEnum;

// Массив значений enum
export const userTabsArray: readonly UserTabsType[] = ['posts-no-select', 'followers-no-select', 'followers', 'subscriptions', 'likes']

// Проверка наличия значения в enum
export function isUserTab(tab: string): tab is UserTabsType {
  return Object.values(userTabsArray).includes(tab as UserTabsType)
}
