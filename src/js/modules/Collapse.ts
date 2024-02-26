/**
 * Класс Collapse - для сворачивания и разворачивания блока
*/

export class Collapse {
  selector: string

  constructor() {
    this.selector = '.collapse'

    this.init()
  }

  private init() {
    this.handlers()
  }

  private toggleCollapse(targetElement: HTMLElement) {
    const parent = targetElement.closest(this.selector) as HTMLElement

    if (parent) {
      if (parent.classList.contains('collapse--close')) {
        parent.classList.remove('collapse--close')
        parent.classList.add('collapse--open')
      }
      else if (parent?.classList.contains('collapse--open')) {
        parent.classList.remove('collapse--open')
        parent.classList.add('collapse--close')
      } else {
        parent.classList.add('collapse--close')
      }
    }    
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest('.collapse__head') && targetElement.tagName !== 'INPUT') {
      return this.toggleCollapse(targetElement)
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}