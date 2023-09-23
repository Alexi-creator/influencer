export class Share {
  selector: string
  els: NodeListOf<Element>
  error: boolean

  constructor() {
    this.selector = '.share'
    this.els = document.querySelectorAll(this.selector)
    this.error = this.els.length === 0

    if (this.error) return

    this.init()
  }

  init() {
    this.handlers()
  }

  closePopupEvent(e) {
    const popupEl = document.getElementById(e.detail)   
    const shareEl = popupEl?.closest('.share')

    if (shareEl) {
      shareEl.classList.remove('share--open')
      shareEl.classList.add('share--close')
    }
  }

  clickHandler(e: MouseEvent) {
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

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('closePopup', (e) => this.closePopupEvent(e))
  }
}