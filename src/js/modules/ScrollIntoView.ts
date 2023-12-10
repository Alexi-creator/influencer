/**
 * Класс ScrollIntoView - для плавного скролла при клике на элемент
 * 
 * Для этого нужно на элемент по которому происходит клик добавить класс `.scroll`
 * По дефолту скролл будет до верха страницы.
 * Если нужно прокрутить до конкретного элемента, то нужно на элементе по которому будет клик
 * добавить дата атрибут target с названием класса элемента до которого нужна прокрутка: data-target="header"
 * 
 */
export class ScrollIntoView {
  selector: string

  constructor() {
    this.selector = '.scroll'

    const allElements = document.querySelectorAll(this.selector)

    if (allElements.length === 0) return

    this.init()
  }

  private init() {
    this.handlers()
  }

  private scroll(goalElement?: HTMLElement) {
    if (goalElement) {
      goalElement.scrollIntoView({ behavior: 'smooth' })
    } else {
      document.body.scrollIntoView({ behavior: 'smooth' })
    }
  }

  private searchTarget(targetElement: HTMLElement) {
    const goal = targetElement.dataset.target

    if (goal) {
      const goalElement = document.querySelector(`.${goal}`)

      if (goalElement) return this.scroll(goalElement as HTMLElement)
    }

    this.scroll()   
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    const parentElement = targetElement.closest(this.selector)

    if (parentElement) {
      this.searchTarget(parentElement as HTMLElement)
    }
  }

  private handlers() {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
  }
}
