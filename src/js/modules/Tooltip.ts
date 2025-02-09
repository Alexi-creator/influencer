import tippy from 'tippy.js'

/**
 * Управление тултипами
 */
export class Tooltip {
 private mainSelector: string
 
  // TODO Сделать более универсальным под разные тултипы!
  constructor() {
    this.mainSelector = '[data-tooltip]'

    this.init()
  }

  private init(): void {
    const allTooltips = [...document.querySelectorAll(this.mainSelector)] as HTMLElement[]

    allTooltips.forEach(tooltip => {
      tippy(tooltip, {
        content: tooltip.dataset.tooltip,
        arrow: false,
        interactive: true,
        allowHTML: true,
      })
    })
  }
}
