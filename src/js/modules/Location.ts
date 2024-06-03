// import { request } from '../utils'

import { BreakpointWidth } from '../constants'

const enum DeliveryEnum {
  courier = 'courier',
  pickup = 'pickup',
}

interface IOptions {
  label: string
  value: string
}

/** Класс для управления локацией, картой */
export class Location {
  private mapId: string
  private searchPickupId: string
  private courierAddressId: string

  private isLoadMap: boolean
  private deliveryType: DeliveryEnum
  
  private mapSelector: string
  private headerSelector: string
  private searchInputSelector: string
  private mapYandexSelector: string
  private addressSelector: string
  private addressSelectedSelector: string
  private addressRemoveSelector: string
  private radioDeliveryName: string

  private addressElems: HTMLElement[]
  private iframeMapElem: HTMLIFrameElement
  private mapElem: HTMLElement
  private mapYandexElem: HTMLElement
  private searchPickupElem: HTMLElement
  private courierAddressElem: HTMLElement
  private headerElem: HTMLElement
  private searchInputElem: HTMLInputElement

  constructor() {
    this.mapId = '#maps'
    this.searchPickupId = '#search-pickup'
    this.courierAddressId = '#courier'

    this.isLoadMap = false
    this.deliveryType = DeliveryEnum.pickup
    
    this.headerSelector = '.header'
    this.mapSelector = '.map'
    this.searchInputSelector = '.map__address-actions-input input'
    this.mapYandexSelector = '.map__yandex'
    this.addressSelector = '.location__address'
    this.addressSelectedSelector = `${this.addressSelector}--selected`
    this.addressRemoveSelector = `${this.addressSelector}-remove`
    this.radioDeliveryName = 'choose-delivery'

    this.addressElems = Array.from(document.querySelectorAll(this.addressSelector))   

    const iframeMapElem = document.querySelector(this.mapId) as HTMLIFrameElement
    if (iframeMapElem) this.iframeMapElem = iframeMapElem
    const searchPickupElem = document.querySelector(this.searchPickupId) as HTMLElement
    if (searchPickupElem) this.searchPickupElem = searchPickupElem
    const courierAddressElem = document.querySelector(this.courierAddressId) as HTMLElement
    if (courierAddressElem) this.courierAddressElem = courierAddressElem
    const mapElem = document.querySelector(this.mapSelector) as HTMLElement
    if (mapElem) this.mapElem = mapElem
    const mapYandexElem = document.querySelector(this.mapYandexSelector) as HTMLElement
    if (mapYandexElem) this.mapYandexElem = mapYandexElem
    const searchInputElem = document.querySelector(this.searchInputSelector) as HTMLInputElement
    if (searchInputElem) this.searchInputElem = searchInputElem
    const headerElem = document.querySelector(this.headerSelector) as HTMLElement
    if (headerElem) this.headerElem = headerElem
    
    this.init()
  }

  private init(): void {
    this.handlers()

    this.mapElem.classList.add(`${this.mapSelector.substring(1)}--${DeliveryEnum.pickup}`)

    const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryList.addListener((e) => this.breakpointChecker(e))

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('geolocation', position.coords.latitude, position.coords.longitude) // выводит координаты местоположения пользователя
    }, function(error) {
      console.log(error.message) // выводит сообщение об ошибке
    })
  }

  private breakpointChecker(e: MediaQueryListEvent): void {
    if (e.matches) {
      this.searchPickupElem.classList.remove('popup--open')
      this.courierAddressElem.classList.remove('popup--open')
    }
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
    const value = addressElem.dataset.value
    console.log('remove address', value)
    
    // запрос на сервер по удаленному элементу
    // const res = await request(url, options)
    // if (res === 200) {
    //   addressElem.remove()
    // }
  }

  private openPopupSearch(): void {
    this.searchPickupElem.classList.add('popup--open')
  }
  private openPopupCourier(): void {
    this.courierAddressElem.classList.add('popup--open')
  }

  selectedOption(options: IOptions) {
    console.log('options', options)
    
  }

  private changeDelivery(value: DeliveryEnum): void {
    if (value === DeliveryEnum.courier) {
      this.mapElem.classList.remove(`${this.mapSelector.substring(1)}--${DeliveryEnum.pickup}`)
      this.mapElem.classList.add(`${this.mapSelector.substring(1)}--${DeliveryEnum.courier}`)
    } else {
      this.mapElem.classList.remove(`${this.mapSelector.substring(1)}--${DeliveryEnum.courier}`)
      this.mapElem.classList.add(`${this.mapSelector.substring(1)}--${DeliveryEnum.pickup}`)
    }

    this.deliveryType = value
  }

  private loadMap(): void {
    const srcPath = this.iframeMapElem.dataset.src

    this.iframeMapElem.addEventListener('load', () => {
      this.mapYandexElem.classList.add(`${this.mapYandexSelector.substring(1)}--load`)
    })

    if (srcPath) {
      this.iframeMapElem.src = srcPath
      this.isLoadMap = true
    }
  }

  private clickHandler(e: MouseEvent): Promise<void> | void {
    const targetElement = e.target as HTMLElement

    const addressElem = targetElement.closest(this.addressSelector) as HTMLElement
    const addressRemoveElem = targetElement.closest(this.addressRemoveSelector) as HTMLElement

    if (!this.isLoadMap && targetElement.closest('[data-popup="map"]')) {
      this.loadMap()
    }

    if (addressRemoveElem && addressElem) {
      return this.removeAddress(addressElem)
    }

    if (addressElem && !addressRemoveElem) {
      this.selectedAddress(addressElem)
    }
  }

  private focusHandler(e: FocusEvent): void {
    if (e.target === this.searchInputElem && window.innerWidth < BreakpointWidth.DESKTOP ) {
      if (this.deliveryType === DeliveryEnum.pickup) {
        this.openPopupSearch()
      }
      if (this.deliveryType === DeliveryEnum.courier) {
        this.openPopupCourier()
      }

      this.searchInputElem.blur()
    }
  }

  private changeHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement
    const name = targetElement.name
    const value = targetElement.value as DeliveryEnum
    
    if (name === this.radioDeliveryName) {
      this.changeDelivery(value)
    }
  }

  private handlers(): void {
    this.headerElem.addEventListener('click', (e) => this.clickHandler(e))
    this.headerElem.addEventListener('focusin', (e) => this.focusHandler(e))
    this.headerElem.addEventListener('change', (e) => this.changeHandler(e))
  }
}
