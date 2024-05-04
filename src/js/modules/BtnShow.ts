/**
 * Скрытие / показ элементов при нажатии на кнопку.
 * У элементов должен быть класс .hide-elem, у кнопки .btn-show, кнопка должна быть вместе с элементами в одном блоке.
 */
export class BtnShow {
  selectorBtn: string
  selectorBtnText: string
  selectorHideElem: string
  selectorShowElem: string

  constructor() {
    this.selectorBtn = '.btn-show'
    this.selectorBtnText = '.btn-show-text'
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

  private action(btnElem: HTMLElement) {
    btnElem.classList.toggle('active')

    const parent = btnElem.parentElement
    if (parent) {
      const textElem = btnElem.querySelector(this.selectorBtnText)
      const currentText = textElem?.textContent
      const newText = btnElem.dataset.text

      if (currentText && newText && textElem) {
        textElem.textContent = newText
        btnElem.dataset.text = currentText
      }

      this.toggleElem(parent)
    }
  }

  private clickHandler(e: Event) {
    const targetElement = e.target as HTMLElement
    const btnElem = targetElement.closest(this.selectorBtn) as HTMLElement

    if (btnElem) {
      this.action(btnElem)
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
