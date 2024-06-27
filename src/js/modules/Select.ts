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
    this.selectorItem = '.select__options-item'
    this.selectorIcon = '.select__icon'

    this.allSelects = Array.from(document.querySelectorAll('.select'))

    if (this.allSelects.length === 0) return
    this.init()
  }

  private init() {
    this.initialOption()
    this.handlers()
  }

  private changeTabsContent(select: HTMLElement) {
    const value = select.querySelector('input')?.value
    const tabContentElement = document.querySelector(`[data-tab-target="${value}"]`)
  
    if (tabContentElement) {
      const tabsParent = tabContentElement.closest('.tabs__contents')
      const tabs = tabsParent?.querySelectorAll('.tabs__content')
  
      tabs?.forEach((tab) => tab.classList.remove('tabs__content--active'))
      tabContentElement.classList.add('tabs__content--active')
    }
  }


  private initialOption() {
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

      this.changeTabsContent(select)
      this.toggle(select)
    }

    select.querySelectorAll(this.selectorItem).forEach(option => option.classList.remove('active'))
    targetElement?.closest(this.selectorItem)?.classList.add('active')
   
  }

  private clickHandler(e: MouseEvent) {
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

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
  }
}