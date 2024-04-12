type IBreakpointsSettings = Record<number, number>

interface IConstructor {
  selectorContainer: string
  breakpointsSettings: IBreakpointsSettings
  tagName?: string
}

/**
 * Сетка Masonry простой вариант без учета высоты элементов.
 */
export class Masonry {
  private selectorContainer: string
  private breakpointsSettings: IBreakpointsSettings
  private tagName: string

  private containersElem: HTMLElement[]
  private masonryAll: Map<HTMLElement, Node[]>

  constructor({ selectorContainer, breakpointsSettings, tagName }: IConstructor) {
    this.selectorContainer = selectorContainer
    this.breakpointsSettings = breakpointsSettings
    this.tagName = tagName || 'div'

    const containersElem = [...document.querySelectorAll(this.selectorContainer)]
    if (containersElem.length > 0) this.containersElem = containersElem as HTMLElement[]

    if (this.containersElem.length === 0 || !Object.keys(breakpointsSettings).length) return

    this.init()
  }

  private init() {
    Object.keys(this.breakpointsSettings).forEach(breakpoint => {
      const mediaQueryList = window.matchMedia(`(min-width:${breakpoint}px)`)
      mediaQueryList.addListener(() => this.breakpointChecker())
    })

    this.masonryAll = new Map()
    
    // копия всех элементов
    this.containersElem.forEach(parent => {
      this.masonryAll.set(parent, [...parent.children].map(child => child.cloneNode(true)))
    })
    
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
    
    return this.breakpointsSettings[currentSettings?.at(-1) || currentSettings[0] || Object.keys(this.breakpointsSettings)[0]]
  }

  private build() {
    const columnsCount = this.getColumnsCount()
    
    this.masonryAll.forEach((child, parent) => {
      parent.innerHTML = ''

      for (let i = 0; i < columnsCount; i++) {
        const columnElem = document.createElement(this.tagName)
        columnElem.className = 'masonry-column'
        parent.appendChild(columnElem)
      }

      const columnsElem = parent.children
      const childrenCount = columnsElem.length - 1

      let counter = 0

      child.forEach(item => {
        columnsElem[counter].appendChild(item)
      
        counter === childrenCount ? counter = 0 : counter += 1
      })
    })
  }
}
