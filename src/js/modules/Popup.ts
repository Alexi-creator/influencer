import { BreakpointWidth } from '../constants/sizeScreen'

/*
  Popup (модальное окно). Для работы необходимо в разметке указать для каждого popup уникальный Id
  А так же нужно добавить data атрибут (data-popup) с этим же значением как id у popup на элемент по которому будет клик

  this.onlyMobilePopups массив попапов к которым будет добаваляться класс popup--onlymobile,
  данный класс убирает стилизацию попапа как будто его и нет для не мобильных разрешений экрана
*/
export class Popup {
  selector: string
  popupCloseSelector: string

  dataAttributePopup: string
  onlyMobilePopups: string[]
  onlyMobileClass: string
  popupOpenClass: string
  overflowClass: string
  popupOverlayClass: string

  constructor() {
    this.selector = '.popup'
    this.popupCloseSelector = '.popup__close'
  
    this.dataAttributePopup = '[data-popup]'
    this.onlyMobilePopups = ['share']
    this.onlyMobileClass = 'popup--onlymobile'
    this.popupOpenClass = 'popup--open'
    this.overflowClass = 'overflow'
    this.popupOverlayClass = 'popup__overlay'

    this.init()
  }

  private init() {
    this.handlers()

    const matchMedia = window.matchMedia(`(min-width:${BreakpointWidth.TABLET}px)`)
    matchMedia.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    if (e.matches) {
      document.body.classList.remove(this.overflowClass)
    }
  }

  private openPopup(actionEl: HTMLElement) {
    const namePopup = actionEl.dataset.popup

    if (namePopup) {
      const popup = document.getElementById(namePopup)
      const isMobilePopup = popup?.classList.contains(this.onlyMobileClass)

      if ((isMobilePopup && window.innerWidth < BreakpointWidth.TABLET) || !isMobilePopup) {
        popup?.classList.add(this.popupOpenClass)
        document.body.classList.add(this.overflowClass)
      }
    } else {
      throw new Error(`no attribute value: ${this.dataAttributePopup}`)
    }
  }

  private closePopup(actionEl: HTMLElement) {
    const popupEl = actionEl.closest(this.selector)

    document.dispatchEvent(new CustomEvent('closePopup', { detail: popupEl?.id }))
    popupEl?.classList.remove(this.popupOpenClass)
    document.body.classList.remove(this.overflowClass)
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.classList.contains(this.popupOverlayClass) || targetElement.closest(this.popupCloseSelector)) {
      return this.closePopup(targetElement)     
    }

    if (targetElement.closest(this.dataAttributePopup)) {
      this.openPopup(targetElement.closest(this.dataAttributePopup) as HTMLElement)
    } 
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
