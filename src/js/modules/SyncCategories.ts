/**
 * Синхронизация категорий из разных блоков (на десктопе и в фильтрах на меньших размерах)
 */
export class SyncCategories {
  constructor() {
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

    if (type === 'radio') {
      const inputs = Array.from(document.querySelectorAll(`input[name=${name}][type=${type}][value=${value}]`))
      const notSelected = inputs.filter(elem => elem !== targetElement)[0] as HTMLInputElement

      this.checked(notSelected)
    }
  }

  private handlers() {
    document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
