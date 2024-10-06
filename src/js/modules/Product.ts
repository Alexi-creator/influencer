/**
 * Product работа на странице продукта (пересчет цены при изменении количества товара).
 */
export class Product {
  private selectorContainer: string
  private selectorText: string

  constructor() {
    this.selectorContainer = '.ticker'
    this.selectorText = `${this.selectorContainer}__text`

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private clickHandler(e: MouseEvent) {
    console.log(e)
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
