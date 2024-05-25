/** Класс для управления локацией, картой */
export class Location {
  private mapId: string
  private mapYandexSelector: string
  private isLoadMap: boolean

  private addressSelector: string
  private addressSelectedSelector: string
  private addressRemoveSelector: string

  private addressElems: HTMLElement[]
  private mapElem: HTMLIFrameElement
  private mapYandexElem: HTMLElement

  constructor() {
    this.mapId = 'maps'
    this.mapYandexSelector = '.map__yandex'
    this.isLoadMap = false

    this.addressSelector = '.location__address'
    this.addressSelectedSelector = `${this.addressSelector}--selected`
    this.addressRemoveSelector = `${this.addressSelector}-remove`

    this.addressElems = Array.from(document.querySelectorAll(this.addressSelector))   

    const mapElem = document.querySelector(`#${this.mapId}`) as HTMLIFrameElement
    if (mapElem) this.mapElem = mapElem
    const mapYandexElem = document.querySelector(this.mapYandexSelector) as HTMLElement
    if (mapYandexElem) this.mapYandexElem = mapYandexElem
    
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

  private async removeAddress(addressElem: HTMLElement): Promise<void> {
    
    // запрос на сервер по удаленному элементу
    const value = addressElem.dataset.value
    console.log('value', value)

    // const res = await api()
    // if (res === 200) {
    //   addressElem.remove()
    // }
    
  }

  private clickHandler(e: MouseEvent): Promise<void> | void {
    const targetElement = e.target as HTMLElement

    const addressElem = targetElement.closest(this.addressSelector) as HTMLElement
    const addressRemoveElem = targetElement.closest(this.addressRemoveSelector) as HTMLElement

    if (!this.isLoadMap && targetElement.closest('[data-popup="map"]')) {
      const srcPath = this.mapElem.dataset.src

      this.mapElem.addEventListener('load', () => {
        this.mapYandexElem.classList.add(`${this.mapYandexSelector.substring(1)}--load`)
      })

      if (srcPath) {
        this.mapElem.src = srcPath
        this.isLoadMap = true
      }
    }

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
