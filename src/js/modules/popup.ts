/*
  Popup (модальное окно). Для работы необходимо в разметке указать для каждого popup уникальный Id
  А так же нужно добавить data атрибут (data-popup) с этим же значением как id у popup на элемент по которому будет клик

  this.onlyMobilePopups массив попапов к которым будет добаваляться класс popup--onlymobile,
  данный класс убирает стилизацию попапа как будто его и нет для не мобильных разрешений экрана
*/
export class Popup {
  selector: string
  dataAttributePopup: string
  onlyMobilePopups: string[]

  constructor() {
    this.selector = '.popup'
    this.dataAttributePopup = '[data-popup]'
    this.onlyMobilePopups = ['share']

    this.init()
  }

  init() {
    this.handlers()
  }

  openPopup(actionEl: HTMLElement) {
    const namePopup = actionEl.dataset.popup

    if (namePopup) {
      return document.getElementById(namePopup)?.classList.add('popup--open')
    } else {
      throw new Error(`no attribute value: ${this.dataAttributePopup}`)
    }
  }

  closePopup(actionEl: HTMLElement) {
    const popupEl = actionEl.closest(this.selector)

    document.dispatchEvent(new CustomEvent('closePopup', { detail: popupEl?.id }))
    return popupEl?.classList.remove('popup--open')
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.classList.contains('popup__overlay') || targetElement.closest('.popup__close')) {
      return this.closePopup(targetElement)     
    }

    if (targetElement.closest(this.dataAttributePopup)) {
      this.openPopup(targetElement.closest(this.dataAttributePopup) as HTMLElement)
    } 
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
