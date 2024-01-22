import { BreakpointWidth } from '../constants'

interface ISelectors {
  categoriesSelector: string
  filterWrapperSelector: string
}

/**
 * Перемещение категорий
 */
export class MoveCategories {
  private selectors: ISelectors[]
  private allCategories: Map<HTMLElement, HTMLElement>
  private menuSelector: string
  private filterCategorySelector: string
  private filterCollapseSelector: string

  constructor(selectors: ISelectors[]) {
    this.selectors = selectors
    this.allCategories = new Map<HTMLElement, HTMLElement>()

    this.menuSelector = '.shop-window__menu'
    this.filterCategorySelector = '.filters__item--categories'
    this.filterCollapseSelector = '.filters__collapse'

    if (!this.selectors) return

    this.selectors.forEach(({ categoriesSelector, filterWrapperSelector }) => {
      const menu = document.querySelector(`${categoriesSelector} ${this.menuSelector}`) as HTMLElement
      const filter = document.querySelector(`${filterWrapperSelector} ${this.filterCategorySelector} ${this.filterCollapseSelector}`) as HTMLElement

      if (menu && filter) {
        this.allCategories.set(menu, filter)
      }
    })

    this.init()
  }

  private init() {
    const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryList.addListener((e) => this.breakpointChecker(e))
    
    if (window.innerWidth < BreakpointWidth.DESKTOP) {
      this.move('moveFromMenu')
    }
  }

  private move(mode: 'moveFromFilter' | 'moveFromMenu') {
    this.allCategories.forEach((filter, menu) => {
      if (mode === 'moveFromFilter') {
        const cloneNode = filter.firstElementChild
        if (cloneNode) {
          menu.appendChild(cloneNode.cloneNode(true))
          filter.innerHTML = ''
        }
      } else {
        const cloneNode = menu.firstElementChild
        if (cloneNode) {
          filter.appendChild(cloneNode.cloneNode(true))
          menu.innerHTML = ''
        }
      }
    })
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    if (e.matches) {
      this.move('moveFromFilter')
    } else {
      this.move('moveFromMenu')
    }
  }
}
