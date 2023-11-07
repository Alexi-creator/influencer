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

    this.filterActionBtn = document.querySelector(this.selectorFilterAction)
    this.filterWrapper = document.querySelector(this.selectorFilterWrapper)
    this.filtersWrapper = document.querySelector(this.selectorFiltersWrapper)
    this.chipsWrapper = document.querySelector(this.selectorChips)

    if (!this.filterActionBtn || !this.filterWrapper) return

    this.init()
  }

  init() {
    this.handlers()
    this.collectionOptions()
  }

  collectionOptions() {
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

  changeOptions(targetElement: HTMLInputElement) {
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
    }  
  }

  displayChips() {
    const filterOptions = Object.entries(this.filters).filter(item => item[1].selectedOptions.length)
    if (filterOptions.length) {
      // console.log('filterOptions', filterOptions)
      Object.fromEntries(filterOptions)
      // отображаем чипсы filterOptions
    }
  }

  toggleFilter() {
    this.filterWrapper?.classList.toggle('active')
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.selectorFilterAction)) {
      this.toggleFilter()
    }
  }

  changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.closest(this.selectorFiltersWrapper)) {
      this.changeOptions(targetElement)
    }
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
