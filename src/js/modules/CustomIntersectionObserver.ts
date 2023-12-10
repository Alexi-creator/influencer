type CallbackType = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void

interface IOptions {
  root?: HTMLElement | null,
  rootMargin?: string,
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
  element: HTMLElement
  callback: CallbackType
  options: IOptions

  defaultOptions: IDefaultOptions

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

  private init() {
    const observer = new IntersectionObserver(this.callback, { ...this.defaultOptions, ...this.options })
    observer.observe(this.element)
  }
}
