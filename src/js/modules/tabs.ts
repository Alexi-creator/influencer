export class Tabs {
  selector: string

  constructor() {
    this.selector = '.'

    this.init()
  }

  init() {
    this.handlers()
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    console.log('targetElement', targetElement)
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}