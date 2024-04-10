/**
 * Скрытие / показ элементов при нажатии на кнопку.
 * У элементов должен быть класс .hide-elem, у кнопки .btn-show, кнопка должна быть вместе с элементами в одном блоке.
 */
export class BtnShow {
  selectorBtn: string
  selectorHideElem: string
  selectorShowElem: string

  constructor() {
    this.selectorBtn = '.btn-show'
    this.selectorHideElem = '.hide-elem'
    this.selectorShowElem = '.show-elem'

    this.init()
  }

  private init() {
    this.handlers()
  }

  private toggleElem(parent: Element) {
    [...parent.querySelectorAll(this.selectorHideElem)].forEach(item => {
      if (item.classList.contains(this.selectorShowElem.substring(1))) {
        item.classList.remove(this.selectorShowElem.substring(1))
      } else item.classList.add(this.selectorShowElem.substring(1))
    })
  }

  private action(targetElement: Element) {
    targetElement.classList.toggle('active')

    const parent = targetElement.parentElement
    if (parent) this.toggleElem(parent)
  }

  private clickHandler(e: Event) {
    const targetElement = e.target as Element

    if (targetElement.closest(this.selectorBtn)) {
      this.action(targetElement)
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
