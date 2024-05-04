import { BreakpointWidth } from '../constants'

type CallbackType = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void

interface IOptions {
  root?: HTMLElement | null,
  rootMargin?: string,
  mobileRootMargin?: string,
  desktopRootMargin?: string,
  threshold?: number | number[]
}

interface IConstructor {
  element: HTMLElement
  callback: CallbackType
  options: IOptions
}

interface IDefaultOptions {
  root?: HTMLElement | null,
  rootMargin?: string,
  threshold?: number | number[]
}

/**
 * Класс IntersectionObserver - для слежения за элементами относительно экрана
 * 
 */
export class CustomIntersectionObserver {
  private element: HTMLElement
  private callback: CallbackType
  private options: IOptions

  private defaultOptions: IDefaultOptions

  private observer: IntersectionObserver
  private matchMedia: MediaQueryList

  constructor({ element, callback, options }: IConstructor) {
    if (!element) return

    if (element) {
      this.element = element
    }

    this.callback = callback
    this.options = options

    this.defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    this.init()
  }

  private init(): void {
    if (this.options.mobileRootMargin && this.options.desktopRootMargin) {
      this.matchMedia = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
      this.matchMedia.addListener((e) => this.breakpointChecker(e))
    }

    const options = this.preparedOptions()
    this.observer = new IntersectionObserver(this.callback, options)
    this.observer.observe(this.element)
  }

  private preparedOptions() {
    let rootMargin
    if (this.options.mobileRootMargin && this.options.desktopRootMargin) {
      rootMargin = window.innerWidth >= BreakpointWidth.DESKTOP ? this.options.desktopRootMargin : this.options.mobileRootMargin
    }

    return rootMargin ? { ...this.defaultOptions, rootMargin, ...this.options } : { ...this.defaultOptions, ...this.options }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private breakpointChecker(e: MediaQueryListEvent): void {
    this.reconnection()
  }

  private reconnection(): void {
    this.observer.disconnect()
    const options = this.preparedOptions()

    this.observer = new IntersectionObserver(this.callback, options)
    this.observer.observe(this.element)
  }
}
