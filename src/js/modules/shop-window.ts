import { ToggleDensity } from './toggleDensity'
import { SelectedDensity } from '../types/index'

export class ShopWindow extends ToggleDensity {
  selectorDensity: string
  selectorDensityGoods: string

  constructor() {
    super()

    this.selectorDensity = '.shop-window__actions-density'
    this.selectorDensityGoods = '.shop-window__goods-items'

    this.init()
  }

  init() {
    this.handlers()
  }

  toggleDensityGoods() {
    const blockGoods = document.querySelector(this.selectorDensityGoods)
    if (blockGoods) {
      if (this.selectedDensity === SelectedDensity.TILE) {
        blockGoods.classList.add('shop-window__goods-items--horizontally')
      } else blockGoods.classList.remove('shop-window__goods-items--horizontally')
    }
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    const parentDensity = targetElement.closest(this.selectorDensity) as HTMLElement

    if (parentDensity) {
      this.toggleDensity(parentDensity)
      this.toggleDensityGoods()
    }
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
