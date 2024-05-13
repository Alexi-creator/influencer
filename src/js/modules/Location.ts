export class Location {
  private addressSelector: string
  private addressSelectedSelector: string
  private addressRemoveSelector: string

  private addressElems: HTMLElement[]

  constructor() {
    this.addressSelector = '.location__address'
    this.addressSelectedSelector = `${this.addressSelector}--selected`
    this.addressRemoveSelector = `${this.addressSelector}-remove`
    this.addressElems = Array.from(document.querySelectorAll(this.addressSelector))   

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private selectedAddress(addressElem: HTMLElement): void {
    this.addressElems.forEach(address => {
      address.classList.remove(this.addressSelectedSelector.substring(1))

      if (address === addressElem) {
        address.classList.add(this.addressSelectedSelector.substring(1))
      }
    })
  }

  private removeAddress(addressElem: HTMLElement): void {
    addressElem.remove()

    // запрос на сервер по удаленному элементу
    const value = addressElem.dataset.value
    console.log('value', value)
    
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    const addressElem = targetElement.closest(this.addressSelector) as HTMLElement
    const addressRemoveElem = targetElement.closest(this.addressRemoveSelector) as HTMLElement

    if (addressRemoveElem && addressElem) {
      return this.removeAddress(addressElem)
    }

    if (addressElem && !addressRemoveElem) {
      this.selectedAddress(addressElem)
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
