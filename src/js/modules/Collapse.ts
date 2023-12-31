export class Collapse {
  selector: string

  constructor() {
    this.selector = '.collapse'

    this.init()
  }

  private init() {
    this.handlers()
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    let parent: HTMLElement | null

    if (targetElement.closest('.collapse__head')) {
      parent = targetElement.closest(this.selector)

      if (parent?.classList.contains('collapse--close')) {
        parent?.classList.remove('collapse--close')
        parent?.classList.add('collapse--open')
        parent?.classList.remove('collapse--open')
      }

      else if (parent?.classList.contains('collapse--open')) {
        parent?.classList.remove('collapse--open')
        parent?.classList.add('collapse--close')
      } else {
        parent?.classList.add('collapse--close')
      }
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}