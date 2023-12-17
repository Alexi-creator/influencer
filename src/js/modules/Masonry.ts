import { BreakpointWidth } from '../constants/sizeScreen'

type IBreakpointsSettings = Record<number, number>

interface IConstructor {
  selectorContainer: string
  breakpointsSettings: IBreakpointsSettings
}

/**
 * Сетка Masonry
 */
export class Masonry {
  private selectorContainer: string
  private breakpointsSettings: IBreakpointsSettings
  private items: Node[]

  private containerElem: HTMLElement

  constructor({ selectorContainer, breakpointsSettings }: IConstructor) {
    this.selectorContainer = selectorContainer
    this.breakpointsSettings = breakpointsSettings
    this.items = []

    const containerElem = document.querySelector(this.selectorContainer)
    if (containerElem) this.containerElem = containerElem as HTMLElement

    if (!this.containerElem || !Object.keys(breakpointsSettings).length) return

    this.init()
  }

  private init() {
    Object.keys(this.breakpointsSettings).forEach(breakpoint => {
      const mediaQueryList = window.matchMedia(`(min-width:${breakpoint}px)`)
      mediaQueryList.addListener(() => this.breakpointChecker())
    })

    // копия всех элементов
    Array.from(this.containerElem.children).forEach(item => this.items.push(item.cloneNode(true)))
    
    this.build()
  }

  private breakpointChecker() {    
    this.build()
  }

  private getColumnsCount() {
    const windowWidth = window.innerWidth
    const currentSettings = Object.keys(this.breakpointsSettings)
      .map(breakpoint => Number(breakpoint))
      .filter(elem => elem <= windowWidth)
    
    return this.breakpointsSettings[currentSettings?.at(-1) || currentSettings[0] || BreakpointWidth.MOBILE]
  }

  private build() {
    const columnsCount = this.getColumnsCount()
    
    // очищаем родительский контейнер
    this.containerElem.innerHTML = ''

    for (let i = 0; i < columnsCount; i++) {
      const columnElem = document.createElement('div')
      columnElem.className = 'filters__column'
      this.containerElem.appendChild(columnElem)
    }

    const columnsElem = this.containerElem.children
    const childrenCount = columnsElem.length - 1
    let counter = 0

    this.items.forEach(item => {
      columnsElem[counter].appendChild(item)
      
      counter === childrenCount ? counter = 0 : counter += 1
    })
  }
}
