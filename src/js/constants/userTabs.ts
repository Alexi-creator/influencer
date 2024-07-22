export enum UserTabsEnum {
  posts = 'posts',
  followers = 'followers',
  subscriptions = 'subscriptions',
  likes = 'likes',
}

export enum UserSelectsEnum {
  subscriptionsSp = 'subscriptions-sp',
  subscriptionsTff = 'subscriptions-tff',
  subscriptionsBloggers = 'subscriptions-bloggers',
  subscriptionsShops = 'subscriptions-shops',
  likesGoods = 'likes-goods',
  likesPublications = 'likes-publications',
}

// Массив значений enum
export const userTabsArray = Object.values(UserTabsEnum) as string[]
export const userSelectsArray = Object.values(UserSelectsEnum) as string[]

// Проверка наличия значения в enum
export function isUserTab(tab: string): tab is UserTabsEnum {
  return userTabsArray.includes(tab)
}
export function isUserSelect(tab: string): tab is UserSelectsEnum {
  return userSelectsArray.includes(tab)
}
