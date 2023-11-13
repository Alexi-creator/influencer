interface IFilter {
  selectedOptions: string[]
  moreCount: number
}

/**
 * Выбор фильтров
 */
export class Filter {
  selectorFilterAction: string
  selectorFilterWrapper: string
  selectorFiltersWrapper: string
  selectorChips: string
  selectorChipCross: string
  filterActionBtn: HTMLElement | null
  filterWrapper: HTMLElement | null
  filtersWrapper: HTMLElement | null
  chipsWrapper: HTMLElement | null

  filters: Record<string, IFilter>

  constructor() {
    this.selectorFilterAction = '.shop-window__actions-filters'
    this.selectorFilterWrapper = '.shop-window__filtersorting-filter'
    this.selectorChips = '.shop-window__filtersorting-chips'
    this.selectorFiltersWrapper = '.filters'
    this.selectorChipCross = '.chip__cross'

    this.filterActionBtn = document.querySelector(this.selectorFilterAction)
    this.filterWrapper = document.querySelector(this.selectorFilterWrapper)
    this.filtersWrapper = document.querySelector(this.selectorFiltersWrapper)
    this.chipsWrapper = document.querySelector(this.selectorChips)

    if (!this.filterActionBtn || !this.filterWrapper) return

    this.init()
  }

  private init() {
    this.handlers()
    this.collectionOptions()
  }

  private chipTemplate(title: string, options: string, moreCount: number) {
    return `
      <div class="chip">
        <span class="chip__title">${title}:</span>
        <span class="chip__options">${options}</span>
        ${moreCount > 0 ? `<span class="chip__more">и еще ${moreCount}</span>` : ''}
        <svg class="chip__cross">
          <use xlink:href="./img/icons/icons.svg#cross"></use>
        </svg>
      </div>
    `
  }

  private collectionOptions() {
    if (this.filtersWrapper) {
      this.filters = Array.from(this.filtersWrapper.children).reduce((acc, filter) => {
        const title = filter.querySelector('.collapse__head-title')?.textContent?.trim()
        const selectedOptions = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'))
          .map(item => {
            return item.closest('.checkbox')?.querySelector('.checkbox__label')?.textContent?.trim()
          }).sort() || []

        if (title) acc[title] = {
          selectedOptions,
          moreCount: selectedOptions.length - 3,
        }

        return acc
      }, {})

      this.displayChips()
    }
  }

  private changeOptions(targetElement: HTMLInputElement) {
    const { checked } = targetElement
    const title = targetElement.closest('.collapse')?.querySelector('.collapse__head-title')?.textContent?.trim()
    const option = targetElement.closest('.checkbox')?.querySelector('.checkbox__label')?.textContent?.trim()
    
    if (title && option) {
      const options = this.filters[title].selectedOptions

      if (checked) {
        this.filters[title].selectedOptions = [...options, option].sort()
      } else {
        this.filters[title].selectedOptions = options.filter(opt => opt !== option)
      }
  
      this.filters[title].moreCount = this.filters[title].selectedOptions.length - 3

      if (this.chipsWrapper) {
        this.chipsWrapper.innerHTML = ''
        this.displayChips()
        this.toggleChips()
      }
    }
  }

  private displayChips() {
    const filterOptions = Object.entries(this.filters).filter(item => item[1].selectedOptions.length)
    if (filterOptions.length) {
      filterOptions.forEach(([title, { moreCount, selectedOptions }]) => {
        const options = selectedOptions.slice(0, 3).join(', ')
        const template = this.chipTemplate(title, options, moreCount)

        if (this.chipsWrapper) {
          this.chipsWrapper.innerHTML += template
          this.chipsWrapper.classList.add('active')
        }
      })
    }
  }

  private removeChips(targetElement: HTMLElement) {
    const chip = targetElement.closest('.chip')
    const title = chip?.querySelector('.chip__title')?.textContent?.trim().replace(':', '')

    if (title && this.filterWrapper) {
      const filter = Array.from(this.filterWrapper.querySelectorAll('.collapse__head-title'))
        .filter(item => item?.textContent?.trim() === title)

      const parent = filter[0].closest('.filters__item')
      const inputs = parent?.querySelectorAll('input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>
      inputs?.forEach(input => input.checked = false)

      this.filters[title].selectedOptions = []
    }

    chip?.remove()
    this.toggleChips()
  }

  private toggleChips() {
    if (this.chipsWrapper) {
      if (Array.from(this.chipsWrapper?.children || []).length === 0) {
        this.chipsWrapper.classList.remove('active')
      }
    }
  }

  private toggleFilter() {
    this.filterWrapper?.classList.toggle('active')
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.selectorFilterAction)) {
      this.toggleFilter()
    }

    if (targetElement.closest(this.selectorChipCross)) {
      this.removeChips(targetElement)
    }
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.closest(this.selectorFiltersWrapper)) {
      this.changeOptions(targetElement)
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
