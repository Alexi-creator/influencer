import { shopTabs } from '../constants/index'

import { Form } from './Form'
import { Slider } from './Slider'

/**
 * Управление витриной (табы, товары, tff и тд)
 */
export class ShopWindow {
  private selectorTabsWrapper: string
  private selectorForm: string

  private tabsSlider: Slider
  private form: Form
  
  constructor(slider: Slider, form: Form) {
    this.selectorTabsWrapper = '.shop-window__tabs'
    this.selectorForm = '.shop-window__filtersorting'

    this.tabsSlider = slider
    this.form = form

    this.init()
  }

  private init() {
    this.handlers()
    this.definedActiveTab()
  }

  private definedActiveTab() {
    const tabsWrapper = document.querySelector(this.selectorTabsWrapper)
    const activeTab = (tabsWrapper?.querySelector('.tabs__tab--active') as HTMLElement)?.dataset.tabPath

    if (activeTab) {
      const index = shopTabs.indexOf(activeTab)

      this.tabsSlider.initialActionIndex = index === -1 ? 0 : index
      this.tabsSlider.startSlide()
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest('.tabs__tab') && targetElement.closest(this.selectorTabsWrapper)) {
      this.definedActiveTab()
    }
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.closest(this.selectorForm)) {
      if(targetElement.name === 'sorting') {
        this.form.submitForm()
      }
    }
  }

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('change', (e: Event) => this.changeHandler(e))
  }
}
