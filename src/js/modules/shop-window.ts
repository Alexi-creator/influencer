import { shopTabs } from '../constants/index'

import { Slider } from './slider'

/**
 * Управление витриной (табы, товары, tff и тд)
 */
export class ShopWindow {
  selectorTabsWrapper: string

  tabsSlider: Slider
  
  constructor(slider: Slider) {
    this.selectorTabsWrapper = '.shop-window__tabs'

    this.tabsSlider = slider
    
    this.init()
  }

  init() {
    this.handlers()
    this.definedActiveTab()
  }

  definedActiveTab() {
    const tabsWrapper = document.querySelector(this.selectorTabsWrapper)
    const activeTab = (tabsWrapper?.querySelector('.tabs__tab--active') as HTMLElement)?.dataset.tabPath

    if (activeTab) {
      const index = shopTabs.indexOf(activeTab)

      this.tabsSlider.initialActionIndex = index === -1 ? 0 : index
      this.tabsSlider.startSlide()
    }
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest('.tabs__tab') && targetElement.closest(this.selectorTabsWrapper)) {
      this.definedActiveTab()
    }
  }

  changeHandler(e: Event) {
    const targetElement = e.target as HTMLElement
    console.log(targetElement)
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
