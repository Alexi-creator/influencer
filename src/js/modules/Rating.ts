/**
 * Рейтинг (выбор кол-ва звезд)
 */
export class Rating {
  private mainSelector: string
  private iconSelector: string
  private modSelectSelector: string

  constructor() {
    this.mainSelector = '.rating'
    this.iconSelector = `${this.mainSelector}__icon`
    this.modSelectSelector = `${this.mainSelector}--select`

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private selectRate = (parent: HTMLElement, targetElement: HTMLElement): void => {
    const svgElem = targetElement.closest(this.iconSelector) as HTMLElement
    const inputElem = parent.querySelector('input') as HTMLInputElement

    if (svgElem && inputElem) {
      const rate = svgElem.dataset.rate

      if (rate) {
        parent.dataset.rating = rate
        inputElem.value = rate
      }
    }
  }

  private hoverRate = (parent: HTMLElement, targetElement: HTMLElement): void => {
    const svgElem = targetElement.closest(this.iconSelector) as HTMLElement
    const inputElem = parent.querySelector('input') as HTMLInputElement

    if (svgElem && inputElem) {
      const rate = svgElem.dataset.rate

      if (rate) {
        const svgElems = parent.querySelectorAll('svg')
        svgElems.forEach((elem, index) => {
          if ((index + 1) <= Number(rate)) {
            elem.classList.add('active')
          } else {
            elem.classList.remove('active')
          }
        })
      }
    }
  }

  private cancelRate = (parent: HTMLElement): void => {
    const svgElems = parent.querySelectorAll('svg')
    svgElems.forEach((elem) => {
      elem.classList.remove('active')
    })
  }

  private commonHandler(e: MouseEvent, cb: (parent: HTMLElement, targetElement: HTMLElement) => void): void {
    const targetElement = e.target as HTMLElement

    const parent = targetElement.closest(this.mainSelector) as HTMLElement
    const hasActiveClass = parent?.classList.contains(this.modSelectSelector.substring(1))

    if (parent && hasActiveClass) {
      cb(parent, targetElement)
    }
  }

  private mouseOverHandler(e: MouseEvent): void {
    this.commonHandler(e, this.hoverRate)
  }

  private mouseOutHandler(e: MouseEvent): void {
    this.commonHandler(e, this.cancelRate)
  }

  private clickHandler(e: MouseEvent): void {
    this.commonHandler(e, this.selectRate)
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('mouseover', (e: MouseEvent) => this.mouseOverHandler(e))
    document.addEventListener('mouseout', (e: MouseEvent) => this.mouseOutHandler(e))
  }
}
