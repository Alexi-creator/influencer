import { BreakpointWidth } from '../constants/sizeScreen'

/**
 * Выбор сортировки
 */
export class Sort {
  private selectorSortingWrapper: string
  private selectorCross: string
  private selectorSortingAction: string

  private defaultContentBtn: string
  private isSelected: boolean
  private isOpen: boolean
  private lastSelectedIcon: string

  constructor() {
    this.selectorSortingWrapper = '.shop-window__filtersorting-sorting'
    this.selectorCross = '.shop-window__filtersorting-sorting-cross'
    this.selectorSortingAction = '.shop-window__actions-sorts'

    this.defaultContentBtn = ''
    this.isSelected = false
    this.isOpen = false
    this.lastSelectedIcon = ''

    this.init()
  }

  private init() {
    const sortingActionBtn = document.querySelector(this.selectorSortingAction)
  
    if (sortingActionBtn) {
      this.defaultContentBtn = sortingActionBtn.innerHTML
    }

    this.handlers()

    const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryList.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    if (e.matches && this.isOpen) return document.body.classList.remove('overflow')
    if (!e.matches && this.isOpen) document.body.classList.add('overflow')
  }

  private changeIcon() {
    const sortingActionBtn = document.querySelector(this.selectorSortingAction) as HTMLElement
    const svg = sortingActionBtn.querySelector('use')
    const splitIconPath = svg?.getAttribute('xlink:href')?.split('#')

    if (this.isSelected && this.isOpen) {
      return svg?.setAttribute('xlink:href', `${splitIconPath?.[0]}#cross`)
    }

    if (this.isSelected && !this.isOpen) {
      svg?.setAttribute('xlink:href', `${splitIconPath?.[0]}#${this.lastSelectedIcon}`)
    }
  }

  private toggleSorting() {  
    const sortingWrapper = document.querySelector(this.selectorSortingWrapper)

    if (this.isOpen) {
      sortingWrapper?.classList.remove('active')
      this.isOpen = false
      document.body.classList.remove('overflow')
    } else {
      sortingWrapper?.classList.add('active')
      this.isOpen = true
      window.innerWidth < BreakpointWidth.DESKTOP && document.body.classList.add('overflow')
    }

    this.changeIcon()
  }

  private chooseSorting(targetElement: HTMLElement) {
    this.isSelected = true

    const parent = targetElement.closest('.radio')
    const clonedContentBtn = parent?.querySelector('.btn')?.innerHTML

    const sortingActionBtn = document.querySelector(this.selectorSortingAction) as HTMLElement

    if (sortingActionBtn && clonedContentBtn) {
      sortingActionBtn.innerHTML = clonedContentBtn
      sortingActionBtn.classList.remove('btn--color-grey')
      sortingActionBtn.classList.add('btn--tag', 'btn--tag-checked')

      const svg = sortingActionBtn.querySelector('use')
      const currentIcon = svg?.getAttribute('xlink:href')?.split('#')[1]
      this.lastSelectedIcon = currentIcon || ''
    }

    this.toggleSorting()
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    const sortingActionBtn = targetElement.closest(this.selectorSortingAction)
    const tagName = targetElement.tagName   

    if ((tagName === 'svg' || tagName === 'use') && sortingActionBtn) {
      const svg = sortingActionBtn.querySelector('use')
      const currentIcon = svg?.getAttribute('xlink:href')?.split('#')[1]

      if (currentIcon === 'cross') {
        this.isSelected = false
        this.isOpen = false
        
        sortingActionBtn.innerHTML = this.defaultContentBtn
        sortingActionBtn.classList.add('btn--color-grey')
        sortingActionBtn.classList.remove('btn--tag', 'btn--tag-checked')

        const sortingWrapper = document.querySelector(this.selectorSortingWrapper)
        if (sortingWrapper) sortingWrapper.classList.remove('active')     

        const checkedRadio = sortingWrapper?.querySelector('input[type="radio"]:checked') as HTMLInputElement
        
        if (checkedRadio) {
          checkedRadio.checked = false
          checkedRadio.dispatchEvent(new Event('change', { bubbles: true }))
        }

        return
      }
    }
    
    if (sortingActionBtn || targetElement.closest(this.selectorCross)) {
      this.toggleSorting()
    }
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.checked && targetElement.closest(this.selectorSortingWrapper)) {
      this.chooseSorting(targetElement)
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
