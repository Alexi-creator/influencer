
export class Login {
  private selectorMobile: string

  private containerMobile: HTMLElement

  constructor() {
    this.selectorMobile = '.catalog__mobile'

    // const containerMobile = document.querySelector(this.selectorMobile)
    // if (containerMobile) this.containerMobile = containerMobile as HTMLElement

    // if (!this.containerMobile || !this.containerDesktop) return

    this.init()
  }

  private init() {
    this.handlers()
  }

  private clickHandler(e: Event) {
    const targetElement = e.target as HTMLElement
    console.log('targetElement', targetElement)
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}