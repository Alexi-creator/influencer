/**
 * Класс реагирующий на активацию главного поиска на странице (autocomplete),
 * показ блюра и адаптивного отображения.
 */
export class MainSearch {
  private containerSelector: string
  private autocompleteSelector: string
  private maskSelector: string
  private crossSelector: string

  private isActive: boolean

  private containerElem: HTMLElement
  private autocompleteElem: HTMLElement
  private crossElem: HTMLElement
  private maskElem: HTMLElement

  constructor(containerSelector: string) {
    this.containerSelector = containerSelector
    this.autocompleteSelector = `${this.containerSelector}-input`
    this.maskSelector = `${this.containerSelector}-mask`
    this.crossSelector = `${this.containerSelector}-title-cross`

    this.isActive = false

    const containerElem = document.querySelector(this.containerSelector) as HTMLElement
    if (containerElem) this.containerElem = containerElem

    const autocompleteElem = this.containerElem.querySelector(this.autocompleteSelector) as HTMLElement
    if (autocompleteElem) this.autocompleteElem = autocompleteElem
    const crossElem = this.containerElem.querySelector(this.crossSelector) as HTMLElement
    if (crossElem) this.crossElem = crossElem
    const maskElem = this.containerElem.querySelector(this.maskSelector) as HTMLElement
    if (maskElem) this.maskElem = maskElem
    
    if (!this.containerElem) {
      console.error(`not founded elem: ${this.containerSelector}!`)
      
      return
    }

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private activation(): void {
    this.isActive = true
    this.containerElem.classList.add('active')
    document.body.classList.add('overflow')
  }

  private deactivation(): void {
    this.containerElem.classList.remove('active')
    this.isActive = false
    document.body.classList.remove('overflow')
  }

  private clickHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement

    if (this.crossElem.contains(targetElement) || this.maskElem.contains(targetElement)) {
      this.deactivation()
    }

    if (this.autocompleteElem.contains(targetElement)) {
      this.activation()
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
