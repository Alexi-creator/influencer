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
  private templateAddressId: string

  private isLoadMap: boolean
  private deliveryType: DeliveryEnum

  private pickupSelected: IOptions | null
  private courierSelected: IOptions | null
  
  private mapSelector: string
  private courierSelector: string
  private courierFullAddress: string
  private mapPickupBtnSelector: string
  private mapCourierBtnSelector: string
  private searchPickupSelector: string
  private searchInputSelector: string
  private searchPickupBtnSelector: string
  private pickupInputSelector: string
  private courierInputSelector: string
  private headerSelector: string
  private mapYandexSelector: string
  private addressSelector: string
  private addressSelectedSelector: string
  private locationAddressesSelector: string
  private addressRemoveSelector: string
  private radioDeliveryName: string

  private addressElems: HTMLElement[]
  private iframeMapElem: HTMLIFrameElement
  private templateAddressElem: HTMLTemplateElement
  private mapElem: HTMLElement
  private mapYandexElem: HTMLElement
  private mapPickupBtnElem: HTMLButtonElement
  private mapCourierBtnElem: HTMLButtonElement
  private searchPickupElem: HTMLElement
  private searchPickupBtnElem: HTMLButtonElement
  private searchInputElem: HTMLInputElement
  private pickupInputElem: HTMLInputElement
  private courierInputElem: HTMLInputElement
  private courierAddressElem: HTMLElement
  private headerElem: HTMLElement
  private locationAddressesElem: HTMLElement
  private courierFullAddressElem: HTMLElement

  constructor() {
    this.mapId = '#maps'
    this.searchPickupId = '#search-pickup'
    this.courierAddressId = '#courier'
    this.templateAddressId = '#address'

    this.isLoadMap = false
    this.deliveryType = DeliveryEnum.pickup
    
    this.headerSelector = '.header'
    this.mapSelector = '.map'
    this.courierSelector = '.courier'
    this.searchPickupSelector = '.search-pickup'
    this.pickupInputSelector = '.map__autocomplete--pickup input'
    this.courierInputSelector = '.map__autocomplete--courier input'
    this.searchInputSelector = `${this.searchPickupSelector} input`
    this.mapYandexSelector = '.map__yandex'
    this.addressSelector = '.location__address'
    this.addressSelectedSelector = `${this.addressSelector}--selected`
    this.addressRemoveSelector = `${this.addressSelector}-remove`
    this.locationAddressesSelector = '.location__addresses'
    this.radioDeliveryName = 'choose-delivery'
    this.courierFullAddress = `${this.courierSelector}__actions-inputs-full`

    this.searchPickupBtnSelector = `${this.searchPickupSelector}__btn`
    this.mapPickupBtnSelector = `${this.mapSelector}__btn--pickup`
    this.mapCourierBtnSelector = `${this.mapSelector}__btn--courier`

    this.addressElems = Array.from(document.querySelectorAll(this.addressSelector))   

    const iframeMapElem = document.querySelector(this.mapId) as HTMLIFrameElement
    if (iframeMapElem) this.iframeMapElem = iframeMapElem
    const templateAddressElem = document.querySelector(this.templateAddressId) as HTMLTemplateElement
    if (templateAddressElem) this.templateAddressElem = templateAddressElem
    const searchPickupElem = document.querySelector(this.searchPickupId) as HTMLElement
    if (searchPickupElem) this.searchPickupElem = searchPickupElem
    const searchInputElem = this.searchPickupElem.querySelector(this.searchInputSelector) as HTMLInputElement
    if (searchInputElem) this.searchInputElem = searchInputElem
    const searchPickupBtnElem = this.searchPickupElem.querySelector(this.searchPickupBtnSelector) as HTMLButtonElement
    if (searchPickupBtnElem) this.searchPickupBtnElem = searchPickupBtnElem
    const courierAddressElem = document.querySelector(this.courierAddressId) as HTMLElement
    if (courierAddressElem) this.courierAddressElem = courierAddressElem
    const mapElem = document.querySelector(this.mapSelector) as HTMLElement
    if (mapElem) this.mapElem = mapElem
    const mapYandexElem = document.querySelector(this.mapYandexSelector) as HTMLElement
    if (mapYandexElem) this.mapYandexElem = mapYandexElem
    const mapPickupBtnElem = this.mapElem.querySelector(this.mapPickupBtnSelector) as HTMLButtonElement
    if (mapPickupBtnElem) this.mapPickupBtnElem = mapPickupBtnElem
    const mapCourierBtnElem = this.mapElem.querySelector(this.mapCourierBtnSelector) as HTMLButtonElement
    if (mapCourierBtnElem) this.mapCourierBtnElem = mapCourierBtnElem
    const pickupInputElem = document.querySelector(this.pickupInputSelector) as HTMLInputElement
    if (pickupInputElem) this.pickupInputElem = pickupInputElem
    const courierInputElem = document.querySelector(this.courierInputSelector) as HTMLInputElement
    if (courierInputElem) this.courierInputElem = courierInputElem
    const headerElem = document.querySelector(this.headerSelector) as HTMLElement
    if (headerElem) this.headerElem = headerElem
    const locationAddressesElem = document.querySelector(this.locationAddressesSelector) as HTMLElement
    if (locationAddressesElem) this.locationAddressesElem = locationAddressesElem

    const courierFullAddressElem = document.querySelector(this.courierFullAddress) as HTMLElement
    if (courierFullAddressElem) this.courierFullAddressElem = courierFullAddressElem
    
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

  private addAddress(type: DeliveryEnum): void {
    let isExistAddress: boolean = true

    if (this.pickupSelected) {
      isExistAddress = this.addressElems.some(address => address.dataset.value === this.pickupSelected?.value)
    }

    if (this.courierSelected) {
      isExistAddress = this.addressElems.some(address => address.dataset.value === this.courierSelected?.value)
    }
    
    if (!isExistAddress) {
      const clone = this.templateAddressElem.content.cloneNode(true) as DocumentFragment

      const wrapper = clone.querySelector('.location__address') as HTMLElement
      const method = clone.querySelector('.location__address-option') as HTMLElement
      const address = clone.querySelector('.location__address-address') as HTMLElement
  
      if (wrapper && method && address) {
        if (type === DeliveryEnum.pickup && this.pickupSelected) {
          address.textContent = this.pickupSelected.label
          method.textContent = 'Пункт выдачи'
          wrapper.dataset.value = this.pickupSelected.value
        }

        if (type === DeliveryEnum.courier && this.courierSelected) {
          address.textContent = this.courierSelected.label
          method.textContent = 'Доставка по адресу'
          wrapper.dataset.value = this.courierSelected.value
        }
      }
      
      this.locationAddressesElem.prepend(clone)
      this.addressElems = Array.from(document.querySelectorAll(this.addressSelector))
    }
  }

  private async removeAddress(addressElem: HTMLElement): Promise<void> {
    const value = addressElem.dataset.value
    console.log('remove address', value)
    
    // запрос на сервер по удаленному элементу
    // const res = await request(url, options)
    // if (res === 200) {
    //   addressElem.remove()
    // }

    addressElem.remove()
    this.addressElems = Array.from(document.querySelectorAll(this.addressSelector)) 
  }

  private openPopup(popup: HTMLElement): void {
    popup.classList.add('popup--open')
  }

  public selectedOption = (options: IOptions): void => {
    console.log('selected option autocomplete', options)

    if (this.deliveryType === DeliveryEnum.pickup) {
      if (options.value) {
        this.searchPickupBtnElem.disabled = false
        this.mapPickupBtnElem.disabled = false
        this.pickupSelected = options

        if (window.innerWidth < BreakpointWidth.DESKTOP) {
          this.pickupInputElem.value = options.label
        } else {
          this.searchInputElem.value = options.label
        }
      } else {
        this.searchPickupBtnElem.disabled = true
        this.mapPickupBtnElem.disabled = true
        this.pickupSelected = { label: '', value: '' }

        if (window.innerWidth < BreakpointWidth.DESKTOP) {
          this.pickupInputElem.value = ''
        } else {
          this.searchInputElem.value = ''
        }
      }
    }

    if (this.deliveryType === DeliveryEnum.courier) {
      if (options.value) {
        this.mapCourierBtnElem.disabled = false
        this.courierSelected = options
        this.courierFullAddressElem.innerHTML = ''
        this.courierFullAddressElem.innerHTML = options.label
      } else {
        this.mapCourierBtnElem.disabled = true
        this.courierSelected = { label: '', value: '' }
        this.courierFullAddressElem.innerHTML = ''
      }
    }
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
      this.removeAddress(addressElem)
    }

    if (addressElem && !addressRemoveElem) {
      this.selectedAddress(addressElem)
    }

    if (this.mapPickupBtnElem.contains(targetElement)) {
      this.addAddress(DeliveryEnum.pickup)
    }

    if (this.mapCourierBtnElem.contains(targetElement) && window.innerWidth < BreakpointWidth.DESKTOP) {
      this.openPopup(this.courierAddressElem)
    }
  }

  private focusHandler(e: FocusEvent): void {
    if (e.target === this.pickupInputElem && window.innerWidth < BreakpointWidth.DESKTOP ) {
      if (this.deliveryType === DeliveryEnum.pickup) {
        this.openPopup(this.searchPickupElem)
        this.pickupInputElem.blur()
      }
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
