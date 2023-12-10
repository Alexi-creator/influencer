export enum ShopTabsEnum {
  goods = 'goods',
  sp = 'sp',
  tff = 'tff',
  contacts = 'contacts',
}

// Тип для проверки наличия значения в enum
type ShopTabsType = keyof typeof ShopTabsEnum;

// Массив значений enum
export const shopTabsArray: readonly ShopTabsType[] = ['goods', 'sp', 'tff', 'contacts']

// Проверка наличия значения в enum
export function isShopTab(tab: string): tab is ShopTabsType {
  return Object.values(shopTabsArray).includes(tab as ShopTabsType)
}
