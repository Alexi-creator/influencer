/**
 * Выбор фильтров
 */
export class Filter {
  selectorFilterAction: string
  selectorFilterWrapper: string

  constructor() {
    this.selectorFilterAction = '.shop-window__actions-filters'
    this.selectorFilterWrapper = '.shop-window__filtersorting-filter'

    const filterActionBtn = document.querySelector(this.selectorFilterAction)

    if (!filterActionBtn) return

    this.init()
  }

  init() {
    this.handlers()
  }

  toggleFilter() {
    document.querySelector(this.selectorFilterWrapper)?.classList.toggle('active')
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.selectorFilterAction)) {
      this.toggleFilter()
    }
    
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    // document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
