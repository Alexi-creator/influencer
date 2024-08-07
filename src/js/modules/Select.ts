export class Select {
  private selectorSelect: string
  private selectorHeader: string
  private selectorTitle: string
  private selectorOptions: string
  private selectorItem: string
  private selectorIcon: string

  private allSelects: Element[]

  constructor() {
    this.selectorSelect = '.select'
    this.selectorHeader = '.select__header'
    this.selectorTitle = '.select__title'
    this.selectorOptions = '.select__options'
    this.selectorItem = '.select__options-item'
    this.selectorIcon = '.select__icon'

    this.allSelects = Array.from(document.querySelectorAll('.select'))

    if (this.allSelects.length === 0) return
    this.init()
  }

  private init(): void {
    this.initialOption()
    this.handlers()
  }

  private initialOption(): void {
    this.allSelects.forEach(select => {
      const value = select.querySelector('input')?.value
      const titleElem = select.querySelector(this.selectorTitle)
      const titleElemText = titleElem?.textContent

      if (titleElemText) return

      let label: string | undefined
      let selectedOption: Element | null

      if (value) {
        const optionElement = select.querySelector(`[data-value=${value}]`)
        label = optionElement?.innerHTML
        selectedOption = optionElement
      } else {
        const optionElement = select.querySelector(this.selectorItem)
        label = optionElement?.innerHTML
        selectedOption = optionElement
      }

      if (titleElem && label) titleElem.innerHTML = label

      selectedOption?.classList.add('active')
    })
  }

  private toggle(select: HTMLElement): void {
    const iconElement = select.querySelector(this.selectorIcon)

    iconElement?.classList.toggle('active')
    select.classList.toggle('active')   
  }

  private changeOption(select: HTMLElement, targetElement: HTMLElement): void {
    const titleElement = select.querySelector(this.selectorTitle)
    const input = select.querySelector('input')

    const value = targetElement.dataset.value
    const label = targetElement.innerHTML

    if (titleElement && input && value) {
      titleElement.innerHTML = label
      input.value = value

      document.dispatchEvent(new CustomEvent('select-change', { detail: value }))
      this.toggle(select)
    }

    select.querySelectorAll(this.selectorItem).forEach(option => option.classList.remove('active'))
    targetElement?.closest(this.selectorItem)?.classList.add('active')
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement
    const select = targetElement?.closest(this.selectorSelect) as HTMLElement

    if (select) {
      this.allSelects.forEach(selectItem => {
        if (select !== selectItem) {
          selectItem.classList.remove('active')
  
          const iconElement = selectItem.querySelector(this.selectorIcon)
          iconElement?.classList.remove('active')
        }
      })
      
      if (targetElement?.closest(this.selectorHeader)) {
        this.toggle(select)
      }
      if (targetElement?.closest(this.selectorOptions)) {
        this.changeOption(select, targetElement)
      }
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
  }
}