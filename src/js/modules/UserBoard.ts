import { UserTabsEnum, userTabsArray } from '../constants/index'
import { isUserSelect } from '../constants/userTabs'

import { CustomSwiper } from './CustomSwiper'

/**
 * Управление внутренней пользователя, при переключение табов или селекта
 * изменение видимости контролов (кнопки сортировок и фильтрации)
 */
export class UserBoard {
  private mainSelector: string
  private selectorTabsWrapper: string
  private selectorForm: string
  private selectorActions: string
  private currentTabName: string
  private selectorContent: string

  private actionsElems: HTMLElement[]

  private tabsSlider: CustomSwiper
  
  constructor(mainSelector: string, slider: CustomSwiper) {
    this.mainSelector = mainSelector
    this.selectorTabsWrapper = `${this.mainSelector}__tabs`
    this.selectorActions = '.filter-actions'
    this.selectorForm = '.form-filters'
    this.selectorContent = `${this.mainSelector}__content`

    this.currentTabName = ''

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
  private changeActionsDisplay(actionName: string) {
    const contentTabElem = document.querySelector(`[data-tab-target=${this.currentTabName}]`)
    const inputElem = contentTabElem?.querySelector(`${this.mainSelector}__select input`) as HTMLInputElement
    const inputValue = inputElem?.value
    
    // Скрытие / показ нужных кнопок (сортировка, фильтры)
    this.actionsElems.forEach(elem => elem.classList.remove('active'))
    const activeActionBlock = this.actionsElems.find(elem => (
      elem.classList.contains(`${this.selectorActions.substring(1)}--${inputValue || actionName}`)
    ))
    activeActionBlock?.classList.add('active')

    // Скрытие / показ нужных блоков с самими фильтрами и сортировками
    const formsElems = [...(contentTabElem?.querySelectorAll(this.selectorForm) || [])]
    formsElems?.forEach(elem => elem.classList.add('hide'))
    const activeFormBlock = formsElems?.find(elem => (
      elem.classList.contains(`${this.mainSelector.substring(1)}__form-${inputValue || actionName}`)
    ))
    activeFormBlock?.classList.remove('hide')
    
    // Скрытие / показ нужных блоков с контентом
    const contentElems = [...(contentTabElem?.querySelectorAll(this.selectorContent) || [])]
    contentElems?.forEach(elem => elem.classList.add('hide'))
    const activeContentBlock = contentElems?.find(elem => (
      elem.classList.contains(`${this.mainSelector.substring(1)}__content-${inputValue || actionName}`)
    ))
    activeContentBlock?.classList.remove('hide')
  }

  private definedActiveTab() {
    const tabsWrapper = document.querySelector(this.selectorTabsWrapper)
    const activeTabElement = tabsWrapper?.querySelector('.tabs__tab--active') as HTMLElement | null
    const activeTab = activeTabElement?.dataset.tabPath as string | undefined

    if (activeTab) {
      const index = userTabsArray.indexOf(UserTabsEnum[activeTab])     

      this.tabsSlider.initialActionIndex = index === -1 ? 0 : index
      this.tabsSlider.startSlide()

      this.currentTabName = activeTab
      this.changeActionsDisplay(activeTab)
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest('.tabs__tab') && targetElement.closest(this.selectorTabsWrapper)) {
      this.definedActiveTab()
    }
  }

  // private changeHandler(e: Event) {
  //   const targetElement = e.target as HTMLInputElement
    
  //   if (targetElement.closest(this.selectorForm)) {
  //     if (targetElement.name === 'sorting') {
  //       // this.form.submitForm()
  //     }
  //   }
  // }

  private handleSelectChange(e: CustomEvent<string>) {
    if (isUserSelect(e.detail)) {
      this.changeActionsDisplay(e.detail)
    }
  }

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('select-change', (e) => this.handleSelectChange(e as CustomEvent<string>))
    // document.addEventListener('change', (e: Event) => this.changeHandler(e))
  }
}
