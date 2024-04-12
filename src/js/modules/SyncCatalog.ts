import { BreakpointWidth } from '../constants'

/**
 * Синхронизация категорий для страницы категорий, переключение категорий.
 */
export class SyncCatalog {
  private selectorMobile: string
  private selectorDesktop: string

  private containerMobile: HTMLElement
  private containerDesktop: HTMLElement

  constructor() {
    this.selectorMobile = '.catalog__mobile'
    this.selectorDesktop = '.catalog__desktop'

    const containerMobile = document.querySelector(this.selectorMobile)
    if (containerMobile) this.containerMobile = containerMobile as HTMLElement
    const containerDesktop = document.querySelector(this.selectorDesktop)
    if (containerDesktop) this.containerDesktop = containerDesktop as HTMLElement

    if (!this.containerMobile || !this.containerDesktop) return

    this.init()
  }

  private init() {
    // const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    // mediaQueryList.addListener((e) => this.breakpointChecker(e))

    this.handlers()
  }

  // private breakpointChecker(e: MediaQueryListEvent) {
  //   if (e.matches) {

  //   }
  // }

  private syncCatalog(targetElement: Element) {
    const isDesktop = window.innerWidth >= BreakpointWidth.DESKTOP

    console.log('isDesktop', isDesktop)
    console.log('targetElement', targetElement)
    
  }

  // private checkBreakpoint(targetElement: HTMLElement) {
  //   const isDesktop = window.innerWidth >= BreakpointWidth.DESKTOP

  //   synkCatalog
  // }

  private clickHandler(e: Event) {
    const targetElement = e.target as Element
    // tabs__tab--active" data-tab-path="cloth"

    this.syncCatalog(targetElement)
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
