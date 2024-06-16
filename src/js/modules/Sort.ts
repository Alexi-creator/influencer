import { BreakpointWidth } from '../constants/sizeScreen'

/**
 * Выбор сортировки
 */
export class Sort {
  // селекторы
  private selectorContainer: string
  private selectorActionContainer: string
  private selectorActionBtn: string

  private selectorSortingWrapper: string
  private selectorCross: string
  private selectorIconCross: string

  private isSelected: boolean
  private isOpen: boolean

  private defaultContentBtn: string
  private selectedContentBtn: string

  // dom элементы
  private container: HTMLElement
  private actionContainer: HTMLElement
  private sortingActionBtn: HTMLElement

  private sortingWrapper: HTMLElement
  private sortingCross: HTMLElement
  private selectedElem: HTMLInputElement | null

  constructor({ selectorContainer, selectorActionContainer }: { selectorContainer: string, selectorActionContainer: string }) {
    this.selectorContainer = selectorContainer
    this.selectorActionContainer = selectorActionContainer
    this.selectorActionBtn = `${this.selectorActionContainer} .shop-window__actions-sorts`

    this.selectorSortingWrapper = '.shop-window__form-sorting'
    this.selectorCross = '.shop-window__form-sorting-cross'
    this.selectorIconCross = '.shop-window__actions-icon--cross'
    
    
    const container = document.querySelector(this.selectorContainer)
    if (container) this.container = container as HTMLElement
    const actionContainer = document.querySelector(this.selectorActionContainer)
    if (actionContainer) this.actionContainer = actionContainer as HTMLElement
    const sortingActionBtn = document.querySelector(this.selectorActionBtn)
    if (sortingActionBtn) this.sortingActionBtn = sortingActionBtn as HTMLElement

    const sortingWrapper = this.container.querySelector(this.selectorSortingWrapper)
    if (sortingWrapper) this.sortingWrapper = sortingWrapper as HTMLElement
    const sortingCross = this.container.querySelector(this.selectorCross)
    if (sortingCross) this.sortingCross = sortingCross as HTMLElement

    this.isOpen = false
    this.isSelected = false

    this.defaultContentBtn = this.sortingActionBtn.innerHTML
    this.selectedContentBtn = ''

    if (!this.sortingActionBtn || !this.container) return

    this.init()
  }

  private init() {
    this.handlers()

    const mediaQueryDESKTOP = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    const mediaQueryTABLET = window.matchMedia(`(min-width:${BreakpointWidth.TABLET}px)`)
    mediaQueryDESKTOP.addListener((e) => this.breakpointChecker(e, BreakpointWidth.DESKTOP))
    mediaQueryTABLET.addListener((e) => this.breakpointChecker(e, BreakpointWidth.TABLET))
  }

  private toggleOverflowBody(e: MediaQueryListEvent) {
    if (!this.container.classList.contains('hide')) {
      if (e.matches && this.isOpen) return document.body.classList.remove('overflow')
      if (!e.matches && this.isOpen) document.body.classList.add('overflow')
    }
  }

  private toggleContentBtn(e: MediaQueryListEvent) {
    if (e.matches && this.selectedContentBtn) {
      return this.sortingActionBtn.innerHTML = this.selectedContentBtn
    }

    this.sortingActionBtn.innerHTML = this.defaultContentBtn
  }

  private breakpointChecker(e: MediaQueryListEvent, breakPoint: BreakpointWidth) {
    if (this.actionContainer.classList.contains('active')) {
      if (breakPoint === BreakpointWidth.DESKTOP) {
        this.toggleOverflowBody(e)
      }

      if (breakPoint === BreakpointWidth.TABLET) {
        this.toggleContentBtn(e)
      }
    }
  }

  private toggleSorting() {  
    if (this.isOpen) {
      this.sortingWrapper.classList.remove('active')
      this.sortingActionBtn.classList.remove('active')

      this.isOpen = false
      document.body.classList.remove('overflow')
      
      if (this.selectedContentBtn && window.innerWidth > 768) {
        this.sortingActionBtn.innerHTML = this.selectedContentBtn
      }
    } else {
      this.sortingWrapper.classList.add('active')
      this.sortingActionBtn.classList.add('active')

      this.isOpen = true
      window.innerWidth < BreakpointWidth.DESKTOP && document.body.classList.add('overflow')

      this.sortingActionBtn.innerHTML = this.defaultContentBtn
    }
  }

  private chooseSorting(targetElement: HTMLInputElement) {
    this.isSelected = true
    this.selectedElem = targetElement

    const parent = targetElement.closest('.radio')    
    const clonedContentBtn = parent?.querySelector('.btn')?.innerHTML

    if (clonedContentBtn) {
      this.selectedContentBtn = clonedContentBtn

      if (window.innerWidth > 768) {
        this.sortingActionBtn.innerHTML = clonedContentBtn
      }
    }

    this.sortingActionBtn.classList.remove('btn--color-grey')
    this.sortingActionBtn.classList.add('btn--tag', 'btn--tag-checked')

    this.toggleSorting()
  }

  private clearSort() {
    if (this.isSelected) {
      this.selectedContentBtn = ''
      this.sortingActionBtn.classList.remove('btn--tag', 'btn--tag-checked')
      this.sortingActionBtn.classList.add('btn--color-grey')
      this.sortingActionBtn.innerHTML = this.defaultContentBtn
  
      if (this.selectedElem) this.selectedElem.checked = false
      this.isSelected = false
      this.selectedElem = null
    }
 
    this.toggleSorting()
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    // выбор сортировки
    if (targetElement.checked && this.sortingWrapper.contains(targetElement)) {
      this.chooseSorting(targetElement)
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    // клик по крестику в кнопке сортировки (сброс сортировок)      
    if (targetElement.closest(this.selectorIconCross) && this.sortingActionBtn.contains(targetElement)) {    
      return this.clearSort()
    }

    // открытие / зыкрытие блока с сортировкой
    if (this.sortingActionBtn.contains(targetElement) || this.sortingCross.contains(targetElement)) {      
      return this.toggleSorting()
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    this.sortingWrapper.addEventListener('change', (e) => this.changeHandler(e))
  }
}
