import { BreakpointWidth } from '../constants'

/**
 * "Управление элементами в header".
 */
export class UsefulLinks {
  selectorActionBtn: string
  selectorUsefulLinks: string
  selectorUsefulLinksCross: string

  usefulLinksElem: HTMLElement

  constructor() {
    this.selectorActionBtn = '.header__nav-more'
    this.selectorUsefulLinks = '.useful-links'
    this.selectorUsefulLinksCross = '.useful-links__title-cross'

    const usefulLinks = document.querySelector(this.selectorUsefulLinks)
    if (usefulLinks) this.usefulLinksElem = usefulLinks as HTMLElement

    if (!this.usefulLinksElem) return

    this.init()
  }

  private init() {
    const mediaQueryDESKTOP = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryDESKTOP.addListener((e) => this.breakpointChecker(e))

    this.handlers()
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    const hasActiveClass = this.usefulLinksElem.classList.contains('active')

    if (hasActiveClass) {
      if (e.matches) {
        document.body.classList.remove('overflow')
      } else document.body.classList.add('overflow')
    }
  }

  private toggle() {
    this.usefulLinksElem.classList.toggle('active')
    document.body.classList.toggle('overflow')
  }

  private clickHandler(e: Event) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.selectorActionBtn) || targetElement.closest(this.selectorUsefulLinksCross)) {
      this.toggle()
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
