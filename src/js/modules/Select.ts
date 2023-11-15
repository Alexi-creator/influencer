export class Select {
  selectorSelect: string
  selectorHeader: string
  selectorTitle: string
  selectorOptions: string
  selectorItem: string
  selectorIcon: string
  allSelects: Element[]

  constructor() {
    this.selectorSelect = '.select'
    this.selectorHeader = '.select__header'
    this.selectorTitle = '.select__title'
    this.selectorOptions = '.select__options'
    this.selectorItem = '.select__item'
    this.selectorIcon = '.select__icon'

    this.allSelects = Array.from(document.querySelectorAll('.select'))

    if (this.allSelects.length === 0) return
    this.init()
  }

  private init() {
    this.initialOption()
    this.handlers()
  }

  private initialOption() {
    this.allSelects.forEach(select => {
      const value = select.querySelector('input')?.value
      const titleElem = select.querySelector(this.selectorTitle)
      let label

      if (value) {
        label = select.querySelector(`[data-value=${value}]`)?.innerHTML
      } else {
        label = select.querySelector(this.selectorItem)?.innerHTML
      }

      if (titleElem) titleElem.innerHTML = label
    })
  }

  private toggle(select: HTMLElement) {
    const iconElement = select.querySelector(this.selectorIcon)

    iconElement?.classList.toggle('active')
    select.classList.toggle('active')   
  }

  private changeOption(select: HTMLElement, targetElement: HTMLElement) {
    const titleElement = select.querySelector(this.selectorTitle)
    const input = select.querySelector('input')
    
    const value = targetElement.dataset.value
    const label = targetElement.innerHTML

    if (titleElement && input && value) {
      titleElement.innerHTML = label
      input.value = value

      this.toggle(select)
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    const select = targetElement?.closest(this.selectorSelect) as HTMLElement

    this.allSelects.forEach(selectItem => {
      if (select !== selectItem) selectItem.classList.remove('active')
    })

    if (select) {
      if (targetElement?.closest(this.selectorHeader)) {
        this.toggle(select)
      }
      if (targetElement?.closest(this.selectorOptions)) {
        this.changeOption(select, targetElement)
      }
    }
  }

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
  }
}