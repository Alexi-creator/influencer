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
      
      let label: string | undefined
      let selectedOption: Element | null

      if (value) {
        selectedOption = select.querySelector(`[data-value="${value}"]`)
      } else {
        selectedOption = select.querySelector(this.selectorItem)
      }

      selectedOption?.classList.add('active')

      if (titleElemText) return

      if (value) {
        label = selectedOption?.innerHTML
      } else {
        label = selectedOption?.innerHTML
      }

      if (titleElem && label) titleElem.innerHTML = label
    })
  }

  private toggle(select: HTMLElement): void {
    const iconElement = select.querySelector(this.selectorIcon)

    iconElement?.classList.toggle('active')
    select.classList.toggle('active')   
  }

  private changeOption(select: HTMLElement, optionElem: HTMLElement): void {
    const titleElement = select.querySelector(this.selectorTitle)
    const input = select.querySelector('input')

    const value = optionElem.dataset.value
    const label = optionElem.innerHTML

    if (titleElement && input && value) {
      titleElement.innerHTML = label
      input.value = value

      document.dispatchEvent(new CustomEvent('select-change', { detail: { selectName: input.name, value } }))
      this.toggle(select)
    }

    select.querySelectorAll(this.selectorItem).forEach(option => option.classList.remove('active'))
    optionElem?.closest(this.selectorItem)?.classList.add('active')
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement
    const select = targetElement?.closest(this.selectorSelect) as HTMLElement
    
    if (targetElement.tagName !== 'INPUT') {
      this.allSelects.forEach(selectItem => {
        if (select !== selectItem) {
          selectItem.classList.remove('active')
  
          const iconElement = selectItem.querySelector(this.selectorIcon)
          iconElement?.classList.remove('active')
        }
      })
  
      if (select) {  
        if (targetElement?.closest(this.selectorHeader)) {
          this.toggle(select)
        }
  
        if (targetElement?.closest(this.selectorOptions)) {
          const optionElem = targetElement?.closest(this.selectorItem) as HTMLElement
          
          this.changeOption(select, optionElem)
        }
      }
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
  }
}