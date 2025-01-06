/**
 * Класс Collapse - для сворачивания и разворачивания блока
*/

export class Collapse {
  private mainSelector: string
  private headSelector: string
  private openSelector: string
  private closeSelector: string
  private modArrowSelector: string

  constructor() {
    this.mainSelector = '.collapse'
    this.headSelector = `${this.mainSelector}__head`
    this.openSelector = `${this.mainSelector}--open`
    this.closeSelector = `${this.mainSelector}--close`
    this.modArrowSelector = `${this.mainSelector}--arrow`

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private toggleCollapse(targetElement: HTMLElement): void {
    const parent = targetElement.closest(this.mainSelector) as HTMLElement
    const isModArrow = parent.classList.contains(this.modArrowSelector.substring(1))

    if (parent) {
      const svgIcon = parent.querySelector(`${this.headSelector}-icon use`)

      if (parent.classList.contains(this.closeSelector.substring(1))) {
        parent.classList.remove(this.closeSelector.substring(1))
        parent.classList.add(this.openSelector.substring(1))

        if (!isModArrow) svgIcon?.setAttribute('xlink:href', './img/icons/icons.svg#collapse')
      }
      else if (parent?.classList.contains(this.openSelector.substring(1))) {
        parent.classList.remove(this.openSelector.substring(1))
        parent.classList.add(this.closeSelector.substring(1))

        if (!isModArrow) svgIcon?.setAttribute('xlink:href', './img/icons/icons.svg#reveal')
      } else {
        parent.classList.add(this.closeSelector.substring(1))

        if (!isModArrow)  svgIcon?.setAttribute('xlink:href', './img/icons/icons.svg#reveal')
      }
    }    
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.headSelector) && targetElement.tagName !== 'INPUT') {
      this.toggleCollapse(targetElement)
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}