import { UserTabsEnum, userTabsArray } from '../constants/index'

import { Form } from './Form'
import { CustomSwiper } from './CustomSwiper'
import { Filter } from './Filter'

export class UserBoard {
  private selectorTabsWrapper: string
  private selectorForm: string
  private selectorSortsBtn: string
  private selectorCategoriesBtn: string
  private selectorFilterBtn: string
  private selectorDensityBtn: string

  private selectorActions: string

  private sortsBtnElem: HTMLElement
  private filterBtnElem: HTMLElement
  private categoriesBtnElem: HTMLElement
  private densityBtnElem: HTMLElement

  private actionsElems: HTMLElement[]
  private formsElems: HTMLElement[]

  private tabsSlider: CustomSwiper
  private form: Form
  private filter: Filter
  
  // constructor(filter: Filter, slider: CustomSwiper, form: Form) {
  constructor(slider: CustomSwiper) {
    this.selectorTabsWrapper = '.user-board__tabs'
    this.selectorForm = '.user-board__form'
    // this.selectorSortsBtn = '.user-board__actions-sorts'
    this.selectorSortsBtn = '.filter-actions__sorts'
    // this.selectorCategoriesBtn = '.user-board__actions-categories'
    this.selectorCategoriesBtn = '.filter-actions__categories'
    // this.selectorFilterBtn = '.user-board__actions-filters'
    this.selectorFilterBtn = '.filter-actions__filters'
    // this.selectorDensityBtn = '.user-board__actions-density'
    this.selectorDensityBtn = '.filter-actions__density'
    // this.selectorActions = '.user-board__actions'
    this.selectorActions = '.filter-actions'

    const filterBtnElem = document.querySelector(this.selectorFilterBtn)
    if (filterBtnElem) this.filterBtnElem = filterBtnElem as HTMLElement

    const categoriesBtnElem = document.querySelector(this.selectorCategoriesBtn)
    if (categoriesBtnElem) this.categoriesBtnElem = categoriesBtnElem as HTMLElement

    const sortsBtnElem = document.querySelector(this.selectorSortsBtn)
    if (sortsBtnElem) this.sortsBtnElem = sortsBtnElem as HTMLElement

    const densityBtnElem = document.querySelector(this.selectorDensityBtn)
    if (densityBtnElem) this.densityBtnElem = densityBtnElem as HTMLElement

    const actionsElems = Array.from(document.querySelectorAll(this.selectorActions))
    if (actionsElems.length) this.actionsElems = actionsElems as HTMLElement[]

    const formsElems = Array.from(document.querySelectorAll(this.selectorForm))
    if (actionsElems.length) this.formsElems = formsElems as HTMLElement[]
    

    this.tabsSlider = slider
    // this.form = form
    // this.filter = filter

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
  
  // изменение отображение форм (goods, sp, tff) чипсы и фильтры при переключении табов
  private changeFormsDisplay(activeTab: string) {
    this.formsElems.forEach(elem => elem.classList.add('hide'))

    const activeFormBlock = this.formsElems.find(elem => elem.classList.contains(`${this.selectorForm.substring(1)}-${activeTab}`))
    activeFormBlock?.classList.remove('hide')
  }

  private definedActiveTab() {
    const tabsWrapper = document.querySelector(this.selectorTabsWrapper)
    const activeTabElement = tabsWrapper?.querySelector('.tabs__tab--active') as HTMLElement | null
    const activeTab = activeTabElement?.dataset.tabPath as string | undefined

    if (activeTab) {
      const index = userTabsArray.indexOf(UserTabsEnum[activeTab])     

      this.tabsSlider.initialActionIndex = index === -1 ? 0 : index
      this.tabsSlider.startSlide()

      this.changeActionsDisplay(activeTab)
      this.changeFormsDisplay(activeTab)
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest('.tabs__tab') && targetElement.closest(this.selectorTabsWrapper)) {
      this.definedActiveTab()
      // this.filter.closeFilters()
    }
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.closest(this.selectorForm)) {
      if (targetElement.name === 'sorting') {
        // this.form.submitForm()
      }
    }
  }

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('change', (e: Event) => this.changeHandler(e))
  }
}
