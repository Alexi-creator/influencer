/**
 * Класс Collapse - для сворачивания и разворачивания блока
*/

export class Collapse {
  selector: string

  constructor() {
    this.selector = '.collapse'

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private toggleCollapse(targetElement: HTMLElement): void {
    const parent = targetElement.closest(this.selector) as HTMLElement
    const svgIcon = parent.querySelector('.collapse__head-icon use')

    if (parent) {
      if (parent.classList.contains('collapse--close')) {
        parent.classList.remove('collapse--close')
        parent.classList.add('collapse--open')
        svgIcon?.setAttribute('xlink:href', './img/icons/icons.svg#collapse')
      }
      else if (parent?.classList.contains('collapse--open')) {
        parent.classList.remove('collapse--open')
        parent.classList.add('collapse--close')
        svgIcon?.setAttribute('xlink:href', './img/icons/icons.svg#reveal')
      } else {
        parent.classList.add('collapse--close')
        svgIcon?.setAttribute('xlink:href', './img/icons/icons.svg#reveal')
      }
    }    
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest('.collapse__head') && targetElement.tagName !== 'INPUT') {
      this.toggleCollapse(targetElement)
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}