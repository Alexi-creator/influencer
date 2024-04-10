/**
 * Синхронизация категорий для страницы категорий, переключение категорий.
 */
export class Categories {
  constructor() {
    this.init()
  }

  private init() {
    this.handlers()
  }

  // private selectItem(item: Element) {
  //   // item.classList.add('active')
  // }

  // private selectContent(item: Element) {
    
  // }

  private changeMenu(item: Element) {
    // this.selectItem(item)
    // this.selectContent(item)
  }

  private clickHandler(e: Event) {
    const targetElement = e.target as Element

    // const parent = targetElement.closest()
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
