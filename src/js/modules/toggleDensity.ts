import { SelectedDensity } from '../types/density'

export class ToggleDensity {
  selectedDensity: SelectedDensity

  constructor() {
    this.selectedDensity = SelectedDensity.GRID
  }

  toggleDensity(parent: HTMLElement) {   
    if (this.selectedDensity === SelectedDensity.TILE) {
      this.selectedDensity = SelectedDensity.GRID
      parent.classList.remove('shop-window__actions-density--tile')
    } else {
      this.selectedDensity = SelectedDensity.TILE
      parent.classList.add('shop-window__actions-density--tile')
    }
  }
}
