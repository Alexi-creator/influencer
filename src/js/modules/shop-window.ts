import { Slider } from './slider'

import { ToggleDensity } from './toggleDensity'
import { SelectedDensity } from '../types/index'

import { shopTabs } from '../constants/index'

/**
 * Управление витриной (табы, товары, tff и тд)
 */
export class ShopWindow extends ToggleDensity {
  selectorDensity: string
  selectorDensityGoods: string
  selectorTabsWrapper: string

  tabsSlider: Slider
  
  initialActionIndexShopsTabs: number

  constructor(slider: Slider) {
    super()

    this.selectorDensity = '.shop-window__actions-density'
    this.selectorDensityGoods = '.shop-window__goods-items'
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

  toggleDensityGoods() {
    const blockGoods = document.querySelector(this.selectorDensityGoods)
    if (blockGoods) {
      if (this.selectedDensity === SelectedDensity.TILE) {
        blockGoods.classList.add('shop-window__goods-items--horizontally')
      } else blockGoods.classList.remove('shop-window__goods-items--horizontally')
    }
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    const parentDensity = targetElement.closest(this.selectorDensity) as HTMLElement

    if (parentDensity) {
      this.toggleDensity(parentDensity)
      this.toggleDensityGoods()
    }

    if (targetElement.closest('.tabs__tab') && targetElement.closest(this.selectorTabsWrapper)) {
      this.definedActiveTab()
    }
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
