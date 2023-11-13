import { SelectedDensity } from '../types/density'

export class Density {
  selectorDensity: string
  selectedDensity: SelectedDensity

  constructor() {
    this.selectorDensity = '.shop-window__actions-density'
    this.selectedDensity = SelectedDensity.GRID

    this.init()
  }

  init() {
    this.handlers()
  }

  toggleDensityGoods() {
    const blockGoods = document.querySelector('.shop-window__goods-items')
    if (blockGoods) {
      if (this.selectedDensity === SelectedDensity.TILE) {
        blockGoods.classList.add('shop-window__goods-items--horizontally')
      } else blockGoods.classList.remove('shop-window__goods-items--horizontally')
    }
  }

  toggleDensity(parent: HTMLElement) {   
    if (this.selectedDensity === SelectedDensity.TILE) {
      this.selectedDensity = SelectedDensity.GRID
      parent.classList.remove('shop-window__actions-density--tile')
    } else {
      this.selectedDensity = SelectedDensity.TILE
      parent.classList.add('shop-window__actions-density--tile')
    }

    this.toggleDensityGoods()
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    const parentDensity = targetElement.closest(this.selectorDensity) as HTMLElement

    if (parentDensity) {
      this.toggleDensity(parentDensity)
    }
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
