import { ShopTabsEnum, shopTabsArray } from '../constants/index'

import { CustomSwiper } from './CustomSwiper'

/**
 * Управление витриной (табы, товары, tff и тд)
 */
export class ShopWindow {
  private selectorTabsWrapper: string
  private selectorActions: string

  private actionsElems: HTMLElement[]

  private tabsSlider: CustomSwiper
  
  constructor(slider: CustomSwiper) {
    this.selectorTabsWrapper = '.shop-window__tabs'
    this.selectorActions = '.filter-actions'

    const actionsElems = Array.from(document.querySelectorAll(this.selectorActions))
    if (actionsElems.length) this.actionsElems = actionsElems as HTMLElement[]
    
    this.tabsSlider = slider

    this.init()
  }

  private init() {
    this.handlers()
    this.definedActiveTab()
  }

  // изменение отображение кнопок (фильтры, категории) в зависимости от выбранного таба
  private changeActionsDisplay(activeTab: string) {   
    this.actionsElems.forEach(elem => elem.classList.remove('active'))

    const activeActionBlock = this.actionsElems.find(elem => elem.classList.contains(`${this.selectorActions.substring(1)}--${activeTab}`))      
    activeActionBlock?.classList.add('active')
  }

  private definedActiveTab() {
    const tabsWrapper = document.querySelector(this.selectorTabsWrapper)
    const activeTabElement = tabsWrapper?.querySelector('.tabs__tab--active') as HTMLElement | null
    const activeTab = activeTabElement?.dataset.tabPath as string | undefined

    if (activeTab) {
      const index = shopTabsArray.indexOf(ShopTabsEnum[activeTab])     

      this.tabsSlider.initialActionIndex = index === -1 ? 0 : index
      this.tabsSlider.startSlide()

      this.changeActionsDisplay(activeTab)
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest('.tabs__tab') && targetElement.closest(this.selectorTabsWrapper)) {
      this.definedActiveTab()
      // this.filter.closeFilters()
    }
  }

  // private changeHandler(e: Event) {
  //   const targetElement = e.target as HTMLInputElement
  // }

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    // document.addEventListener('change', (e: Event) => this.changeHandler(e))
  }
}
