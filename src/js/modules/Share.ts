export class Share {
  private selector: string
  private els: Element[]

  constructor() {
    this.selector = '.share'
    this.els = [...document.querySelectorAll(this.selector)]

    if (this.els.length === 0) return

    this.init()
  }

  private init() {
    this.handlers()
  }

  private closePopupEvent(e) {
    const popupEl = document.getElementById(e.detail)   
    const shareEl = popupEl?.closest('.share')

    if (shareEl) {
      shareEl.classList.remove('share--open')
      shareEl.classList.add('share--close')
    }
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as Element
    
    if (targetElement.closest('.share__open')) {
      targetElement.closest(this.selector)?.classList.remove('share--close')

      return targetElement.closest(this.selector)?.classList.add('share--open')
    }
    if (targetElement.closest('.share__close')) {
      targetElement.closest(this.selector)?.classList.remove('share--open')
      targetElement.closest(this.selector)?.classList.add('share--close')
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('closePopup', (e) => this.closePopupEvent(e))
  }
}
