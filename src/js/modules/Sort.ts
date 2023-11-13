/**
 * Выбор сортировки
 */
export class Sort {
  selectorSortingWrapper: string
  selectorSortingAction: string

  defaultContentBtn: string
  isSelected: boolean
  isOpen: boolean
  lastSelectedIcon: string

  constructor() {
    this.selectorSortingWrapper = '.shop-window__filtersorting-sorting'
    this.selectorSortingAction = '.shop-window__actions-sorts'

    this.defaultContentBtn = ''
    this.isSelected = false
    this.isOpen = false
    this.lastSelectedIcon = ''

    this.init()
  }

  init() {
    const sortingActionBtn = document.querySelector(this.selectorSortingAction)
  
    if (sortingActionBtn) {
      this.defaultContentBtn = sortingActionBtn.innerHTML
    }

    this.handlers()
  }

  changeIcon() {
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

  toggleSorting() {  
    const sortingWrapper = document.querySelector(this.selectorSortingWrapper)

    if (this.isOpen) {
      sortingWrapper?.classList.remove('active')
      this.isOpen = false
    } else {
      sortingWrapper?.classList.add('active')
      this.isOpen = true
    }

    this.changeIcon()
  }

  chooseSorting(targetElement: HTMLElement) {
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

  clickHandler(e: MouseEvent) {
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
    
    if (sortingActionBtn) {
      this.toggleSorting()
    }
  }

  changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.checked && targetElement.closest(this.selectorSortingWrapper)) {
      this.chooseSorting(targetElement)
    }
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
