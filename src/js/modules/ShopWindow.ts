import { ShopTabsEnum, shopTabsArray } from '../constants/index'

import { Form } from './Form'
import { CustomSwiper } from './CustomSwiper'

/**
 * Управление витриной (табы, товары, tff и тд)
 */
export class ShopWindow {
  private selectorTabsWrapper: string
  private selectorForm: string
  private selectorSortsBtn: string
  private selectorCategoriesBtn: string
  private selectorFilterBtn: string
  private selectorDensityBtn: string

  private sortsBtnElem: HTMLElement
  private filterBtnElem: HTMLElement
  private categoriesBtnElem: HTMLElement
  private densityBtnElem: HTMLElement

  private tabsSlider: CustomSwiper
  private form: Form
  
  constructor(slider: CustomSwiper, form: Form) {
    this.selectorTabsWrapper = '.shop-window__tabs'
    this.selectorForm = '.shop-window__filtersorting'
    this.selectorSortsBtn = '.shop-window__actions-sorts'
    this.selectorCategoriesBtn = '.shop-window__actions-categories'
    this.selectorFilterBtn = '.shop-window__actions-filters'
    this.selectorDensityBtn = '.shop-window__actions-density'

    const filterBtnElem = document.querySelector(this.selectorFilterBtn)
    if (filterBtnElem) this.filterBtnElem = filterBtnElem as HTMLElement

    const categoriesBtnElem = document.querySelector(this.selectorCategoriesBtn)
    if (categoriesBtnElem) this.categoriesBtnElem = categoriesBtnElem as HTMLElement

    const sortsBtnElem = document.querySelector(this.selectorSortsBtn)
    if (sortsBtnElem) this.sortsBtnElem = sortsBtnElem as HTMLElement

    const densityBtnElem = document.querySelector(this.selectorDensityBtn)
    if (densityBtnElem) this.densityBtnElem = densityBtnElem as HTMLElement
    

    this.tabsSlider = slider
    this.form = form

    this.init()
  }

  private init() {
    this.handlers()
    this.definedActiveTab()
  }

  // изменение отображение кнопок (фильтры, категории) в зависимости от выбранного таба
  private changeActionsDisplay(activeTab: string) {
    if (activeTab === ShopTabsEnum.goods || activeTab === ShopTabsEnum.tff) {     
      this.categoriesBtnElem.classList.remove(`${this.selectorCategoriesBtn.substring(1)}--active`)
      this.sortsBtnElem.classList.add(`${this.selectorSortsBtn.substring(1)}--active`)
      this.filterBtnElem.classList.add(`${this.selectorFilterBtn.substring(1)}--active`)
      this.densityBtnElem.classList.add(`${this.selectorDensityBtn.substring(1)}--active`)
    }
    if (activeTab === ShopTabsEnum.sp) {
      this.categoriesBtnElem.classList.add(`${this.selectorCategoriesBtn.substring(1)}--active`)
      this.sortsBtnElem.classList.add(`${this.selectorSortsBtn.substring(1)}--active`)
      this.filterBtnElem.classList.remove(`${this.selectorFilterBtn.substring(1)}--active`)
      this.densityBtnElem.classList.remove(`${this.selectorDensityBtn.substring(1)}--active`)
    }
    if (activeTab === ShopTabsEnum.contacts) {
      this.categoriesBtnElem.classList.remove(`${this.selectorCategoriesBtn.substring(1)}--active`)
      this.sortsBtnElem.classList.remove(`${this.selectorSortsBtn.substring(1)}--active`)
      this.filterBtnElem.classList.remove(`${this.selectorFilterBtn.substring(1)}--active`)
      this.densityBtnElem.classList.remove(`${this.selectorDensityBtn.substring(1)}--active`)
    }
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
    }
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.closest(this.selectorForm)) {
      if(targetElement.name === 'sorting') {
        // this.form.submitForm()
      }
    }
  }

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('change', (e: Event) => this.changeHandler(e))
  }
}
