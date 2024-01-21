import { BreakpointWidth } from '../constants/sizeScreen'

/**
 * Выбор сортировки
 */
export class Sort {
  // селекторы
  private selectorContainer: string
  private selectorActionBtn: string

  private selectorSortingWrapper: string
  private selectorCross: string

  private defaultContentBtn: string
  private isSelected: boolean
  private isOpen: boolean

  // dom элементы
  private container: HTMLElement
  private sortingActionBtn: HTMLElement

  private sortingWrapper: HTMLElement
  private sortingCross: HTMLElement

  constructor({ selectorContainer, selectorActionBtn }: { selectorContainer: string, selectorActionBtn: string }) {
    this.selectorContainer = selectorContainer
    this.selectorActionBtn = selectorActionBtn

    this.selectorSortingWrapper = '.shop-window__form-sorting'
    this.selectorCross = '.shop-window__form-sorting-cross'
    
    const container = document.querySelector(this.selectorContainer)
    if (container) this.container = container as HTMLElement
    const sortingActionBtn = document.querySelector(this.selectorActionBtn)
    if (sortingActionBtn) this.sortingActionBtn = sortingActionBtn as HTMLElement

    const sortingWrapper = this.container.querySelector(this.selectorSortingWrapper)
    if (sortingWrapper) this.sortingWrapper = sortingWrapper as HTMLElement
    const sortingCross = this.container.querySelector(this.selectorCross)
    if (sortingCross) this.sortingCross = sortingCross as HTMLElement

    this.isOpen = false
    this.isSelected = false
    this.defaultContentBtn = this.sortingActionBtn.innerHTML

    if (!this.sortingActionBtn || !this.container) return

    this.init()
  }

  private init() {
    this.handlers()

    const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryList.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    if (!this.container.classList.contains('hide')) {
      if (e.matches && this.isOpen) return document.body.classList.remove('overflow')
      if (!e.matches && this.isOpen) document.body.classList.add('overflow')
    }
  }

  private toggleSorting() {  
    if (this.isOpen) {
      this.sortingWrapper.classList.remove('active')
      this.isOpen = false
      document.body.classList.remove('overflow')
    } else {
      this.sortingWrapper.classList.add('active')
      this.isOpen = true
      window.innerWidth < BreakpointWidth.DESKTOP && document.body.classList.add('overflow')
    }
  }

  private chooseSorting(targetElement: HTMLElement) {    
    this.isSelected = true

    const parent = targetElement.closest('.radio')    
    const clonedContentBtn = parent?.querySelector('.btn')?.innerHTML

    if (clonedContentBtn) {
      this.sortingActionBtn.innerHTML = clonedContentBtn
      this.sortingActionBtn.insertAdjacentHTML(
        'beforeend',
        '<svg class="shop-window__actions-icon-default"><use xlink:href="./img/icons/icons.svg#sorts"></use></svg>'
      )
    }

    this.sortingActionBtn.classList.remove('btn--color-grey')
    this.sortingActionBtn.classList.add('btn--tag', 'btn--tag-checked')

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
