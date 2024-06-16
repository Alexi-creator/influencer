import { BreakpointWidth } from '../constants/sizeScreen'

/*
  Popup (модальное окно). Для работы необходимо в разметке указать для каждого popup уникальный Id
  А так же нужно добавить data атрибут (data-popup) с этим же значением как id у popup на элемент по которому будет клик для открытия этого попапа

  Для открытия popup только на определенных разрешениях, нужно на элемент popup добавить дата атрибут media с размером data-media="1200"
  Для закрытия popup нужно указать класс '.popup__close' на элементе по которому будет клик (в случае если элемент находится в текущем попапе)
  Если если элемент по которому будет клик находится не в попапе то добавить атрибут с id popup data-close-popup="id popup"
*/
export class Popup {
  private selector: string
  private popupCloseSelector: string

  private dataAttributePopup: string
  private dataAttributeClosePopup: string
  private popupOpenClass: string
  private overflowClass: string
  private popupOverlayClass: string

  constructor() {
    this.selector = '.popup'
    this.popupCloseSelector = '.popup__close'
  
    this.dataAttributePopup = '[data-popup]'
    this.dataAttributeClosePopup = '[data-close-popup]'
    this.popupOpenClass = 'popup--open'
    this.overflowClass = 'overflow'
    this.popupOverlayClass = 'popup__overlay'

    this.init()
  }

  private init() {
    this.handlers()

    const breakpoints = [BreakpointWidth.TABLET, BreakpointWidth.DESKTOP]
    breakpoints.forEach(breakpoint => {
      const mediaQueryList = window.matchMedia(`(min-width:${breakpoint}px)`)
      mediaQueryList.addListener((e) => this.breakpointChecker(e))
    })
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    const currentMedia = e.media.replace(/\D/g, '')
    const openPopups: HTMLElement[] = Array.from(document.querySelectorAll(`${this.selector}--open`))

    openPopups.forEach(popup => {
      const popupMedia = popup.dataset.media

      if (Number(currentMedia) >= Number(popupMedia)) {
        this.closePopup(popup)
      }
    })
  }

  private openPopup(actionEl: HTMLElement) {
    const popup = document.getElementById(actionEl.dataset.popup || '')

    if (popup) {
      let isNeedOpen = true
      const media = Number(popup.dataset.media)

      if (media && (media < window.innerWidth)) {
        isNeedOpen = false
      }

      if (isNeedOpen) {
        popup.classList.add(this.popupOpenClass)
        document.body.classList.add(this.overflowClass)

        document.dispatchEvent(new CustomEvent('openPopup', { detail: popup?.id }))
      }
    } else {
      throw new Error(`no attribute value: ${this.dataAttributePopup}`)
    }
  }

  private checkOpenedPopups() {
    const allPopups = [...document.querySelectorAll(this.selector)]

    return allPopups.some(popup => popup.classList.contains('popup--open'))
  }

  private closePopup(actionEl: HTMLElement) {
    const popupEl = actionEl.closest(this.selector) || document.getElementById(actionEl?.dataset?.closePopup || '')
    popupEl?.classList.remove(this.popupOpenClass)

    if (!this.checkOpenedPopups()) {
      document.body.classList.remove(this.overflowClass)
    }

    document.dispatchEvent(new CustomEvent('closePopup', { detail: popupEl?.id }))
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.dataAttributeClosePopup) && targetElement.closest(this.dataAttributePopup)) {
      this.closePopup(targetElement)

      return this.openPopup(targetElement.closest(this.dataAttributePopup) as HTMLElement)
    }

    if (targetElement.classList.contains(this.popupOverlayClass) ||
      targetElement.closest(this.popupCloseSelector) ||
      targetElement.closest(this.dataAttributeClosePopup)
    ) {
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
