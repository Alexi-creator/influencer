import { BreakpointWidth } from '../constants'

const enum StatusEvent {
  OPEN = 'open',
  CLOSE = 'close',
}

/**
 * Управление превью блоком
 */
export class ShopPreview {
  private actionSelector: string
  private popupId: string

  private actionElem: HTMLElement
  private popupElem: HTMLElement
  
  constructor() {
    this.actionSelector = '.shop-preview__actions'
    this.popupId = 'share'

    const actionElem = document.querySelector(this.actionSelector)
    if (actionElem) this.actionElem = actionElem as HTMLElement

    const popupElem = document.getElementById(this.popupId)
    if (popupElem) this.popupElem = popupElem as HTMLElement

    if (!this.actionElem) return

    this.init()
  }

  private init(): void {
    this.handlers()

    const breakpoints = [BreakpointWidth.DESKTOP, BreakpointWidth.FULLHD]
    breakpoints.forEach(breakpoint => {
      const mediaQueryList = window.matchMedia(`(min-width:${breakpoint}px)`)
      mediaQueryList.addListener(() => this.breakpointChecker())
    })

    const observer = new MutationObserver(mutationsList => {
      for(const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.changeActive()
        }
      }
    })
    observer.observe(this.actionElem, { attributes: true })
  }

  private breakpointChecker() {
    this.changeActive()
  }

  private changeActive(): void {
    if (this.actionElem.classList.contains('shop-preview__actions--active') &&
      window.innerWidth >= BreakpointWidth.DESKTOP &&
      window.innerWidth < BreakpointWidth.FULLHD) {
      this.popupElem.dataset.media = String(BreakpointWidth.FULLHD)
      this.popupElem.classList.remove('popup--onlymobile')
    } else {
      this.popupElem.dataset.media = String(BreakpointWidth.DESKTOP)
      this.popupElem.classList.add('popup--onlymobile')
    }
  }

  private eventPopup(e, status: StatusEvent): void {
    if (e.detail === 'share') {
      if (status === StatusEvent.OPEN) {
        this.actionElem.classList.add('shop-preview__actions--over')
      }
      if (status === StatusEvent.CLOSE) {
        this.actionElem.classList.remove('shop-preview__actions--over')
      }
    }
  }

  private handlers(): void {
    document.addEventListener('openPopup', (e) => this.eventPopup(e, StatusEvent.OPEN))
    document.addEventListener('closePopup', (e) => this.eventPopup(e, StatusEvent.CLOSE))
  }
}
