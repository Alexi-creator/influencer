/**
 * Ticker бегущая строка при наведении, если текст не помещается в блоке.
 */
export class Ticker {
  // селекторы
  private selectorContainer: string
  private selectorText: string

  constructor() {
    this.selectorContainer = '.ticker'
    this.selectorText = `${this.selectorContainer}__text`

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private setActivation(ticker: HTMLElement, isActive: true | false): void {
    if (isActive) {
      ticker.classList.add('active')
    } else {
      ticker.classList.remove('active')
    }
  }

  private checkTextLength(ticker: HTMLElement): void {
    const containerLength = ticker.clientWidth
    const textLength = ticker.querySelector(this.selectorText)?.clientWidth || 0
    
    if (textLength > containerLength) this.setActivation(ticker, true)
  }

  private mouseoverHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement
    const parent = targetElement.closest(this.selectorContainer) as HTMLElement

    if (parent) this.checkTextLength(parent)
  }

  private mouseoutHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement
    const parent = targetElement.closest(this.selectorContainer) as HTMLElement

    if (parent) this.setActivation(parent, false)
  }

  private handlers(): void {
    document.addEventListener('mouseover', (e) => this.mouseoverHandler(e))
    document.addEventListener('mouseout', (e) => this.mouseoutHandler(e))
  }
}
