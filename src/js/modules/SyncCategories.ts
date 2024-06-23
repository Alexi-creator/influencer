/**
 * Синхронизация категорий из разных блоков (на десктопе и в фильтрах на меньших размерах)
 */
export class SyncCategories {
  private containerSelector: string
  private menuSelector: string
  private categoriesSelector: string

  private containerElem: HTMLElement

  constructor() {
    this.containerSelector = '.shop-window'
    this.menuSelector = '.shop-window__menu'
    this.categoriesSelector = '.filters__item--categories'

    const containerElem = document.querySelector(this.containerSelector) as HTMLElement
    if (containerElem) this.containerElem = containerElem

    this.init()
  }

  private init() {
    this.handlers()
  }

  private checked(notSelected: HTMLInputElement) {
    notSelected.checked = true
    notSelected.dispatchEvent(new Event('change'))
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement
    const name = targetElement.name
    const type = targetElement.type
    const value = targetElement.value
    
    if (type === 'radio' && (targetElement.closest(this.menuSelector) || targetElement.closest(this.categoriesSelector))) {
      const inputs = Array.from(document.querySelectorAll(`input[name=${name}][type=${type}][value=${value}]`))
      const notSelected = inputs.filter(elem => elem !== targetElement)[0] as HTMLInputElement

      this.checked(notSelected)
    }
  }

  private handlers() {
    this.containerElem.addEventListener('change', (e) => this.changeHandler(e))
  }
}
