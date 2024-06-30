import { BreakpointWidth } from '../constants'
import { SelectedDensity } from '../types/density'

interface IConstructor {
  selectorContent: string,
  selectorActionContainer: string,
}
export class Density {
  private selectorContent: string
  private selectorActionContainer: string
  private selectorDensity: string

  private selectedDensity: SelectedDensity

  private shopWindowElem: HTMLElement
  private densityElem: HTMLElement

  private matchMedia: MediaQueryList

  constructor({ selectorContent, selectorActionContainer }: IConstructor) {
    this.selectorContent = selectorContent
    this.selectorActionContainer = selectorActionContainer
    this.selectorDensity = '.filter-actions__density'
    this.selectedDensity = SelectedDensity.GRID

    const shopWindowElem = document.querySelector(this.selectorContent)

    if (shopWindowElem) {
      this.shopWindowElem = shopWindowElem as HTMLElement
    }

    const densityElem = document.querySelector(`${this.selectorActionContainer} ${this.selectorDensity}`)

    if (densityElem) {
      this.densityElem = densityElem as HTMLElement
    }

    if (!this.shopWindowElem || !this.densityElem) return

    this.init()
  }

  private init() {
    this.handlers()

    this.matchMedia = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    this.matchMedia.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    if (e.matches) {
      this.selectGrid()
    }
  }

  // private selectTile() {
  //   if (this.selectedDensity === SelectedDensity.TILE) return

  //   this.selectedDensity = SelectedDensity.TILE
  //   this.densityElem.classList.add('shop-window__actions-density--tile')
  //   this.shopWindowElem.classList.add('shop-window--horizontally')
  // }

  private selectGrid() {
    if (this.selectedDensity === SelectedDensity.GRID) return

    this.selectedDensity = SelectedDensity.GRID
    this.densityElem.classList.remove('filter-actions__density--tile')
    this.shopWindowElem.classList.remove('shop-window--horizontally')
  }

  private toggleDensity() {
    if (this.selectedDensity === SelectedDensity.TILE) {
      this.selectedDensity = SelectedDensity.GRID
      this.densityElem.classList.remove('filter-actions__density--tile')
      this.shopWindowElem.classList.remove('shop-window--horizontally')
    } else {
      this.selectedDensity = SelectedDensity.TILE
      this.densityElem.classList.add('filter-actions__density--tile')
      this.shopWindowElem.classList.add('shop-window--horizontally')
    }
  }

  private clickHandler(e: MouseEvent) {   
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.selectorDensity) && this.densityElem.contains(targetElement)) {
      this.toggleDensity()
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
