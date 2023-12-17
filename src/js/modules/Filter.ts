import { BreakpointWidth } from '../constants'

interface IFilter {
  selectedOptions: string[]
  moreCount: number
}

/**
 * Выбор фильтров
 */
export class Filter {
  private selectorFilterBtn: string
  private selectorFilterWrapper: string
  private selectorFiltersWrapper: string
  private selectorFilterCross: string
  private selectorChips: string
  private selectorChipCross: string
  private selectorClearBtn: string
  private selectorSubmitBtn: string
  private defaultContentBtn: string
  private selectorBtnIcon: string
  private svgCross: string

  private selectorSortWrapper: string

  private filterActionBtn: HTMLElement | null
  private filterWrapper: HTMLElement | null
  private filtersWrapper: HTMLElement | null
  private chipsWrapper: HTMLElement | null
  private submitBtn: HTMLElement | null
  private sortWrapper: HTMLElement | null

  private filters: Record<string, IFilter>

  constructor() {
    this.selectorFilterBtn = '.shop-window__actions-filters'
    this.selectorFilterWrapper = '.shop-window__filtersorting-filter'
    this.selectorFilterCross = '.shop-window__filtersorting-filter-cross'
    this.selectorChips = '.shop-window__filtersorting-chips'
    this.selectorFiltersWrapper = '.filters'
    this.selectorChipCross = '.chip__cross'
    this.selectorClearBtn = '.shop-window__filtersorting-filter-clear'
    this.selectorSubmitBtn = '.shop-window__filtersorting-filter-submit'
    this.selectorBtnIcon = '.shop-window__actions-filters-icon'
    this.svgCross = '<svg><use xlink:href="./img/icons/icons.svg#cross"></use></svg>'

    this.selectorSortWrapper = '.shop-window__filtersorting-sorting'

    this.filterActionBtn = document.querySelector(this.selectorFilterBtn)
    this.filterWrapper = document.querySelector(this.selectorFilterWrapper)
    this.filtersWrapper = document.querySelector(this.selectorFiltersWrapper)
    this.chipsWrapper = document.querySelector(this.selectorChips)
    this.submitBtn = document.querySelector(this.selectorSubmitBtn)
    this.sortWrapper = document.querySelector(this.selectorSortWrapper)

    this.defaultContentBtn = ''

    if (!this.filterActionBtn || !this.filterWrapper) return

    this.init()
  }

  private init() {
    if (this.filterActionBtn) {
      this.defaultContentBtn = this.filterActionBtn.innerHTML
    }

    this.handlers()
    this.collectionOptions()

    const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryList.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    const isOpen = this.filterWrapper?.classList.contains('active')

    if (e.matches && isOpen) return document.body.classList.remove('overflow')
    if (!e.matches && isOpen) document.body.classList.add('overflow')
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
      this.filters = Array.from(this.filtersWrapper.querySelectorAll('.filters__item')).reduce((acc, filter) => {
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
      this.changeIcon()
    }
  }

  private changeIcon() {
    const selectedCount = Object.entries(this.filters).reduce((acc, filter) => acc += filter[1].selectedOptions.length, 0)
    const btnIconElement = this.filterActionBtn?.querySelector(this.selectorBtnIcon)
    const isOpen = this.filterWrapper?.classList.contains('active')

    const countBtn = this.submitBtn?.querySelector('.btn__suffix')
    if (countBtn) {
      countBtn.innerHTML = `(${selectedCount})`
    }

    if (this.filterActionBtn) {
      if (selectedCount && btnIconElement && this.filterActionBtn) {
        this.filterActionBtn.classList.add('btn--tag', 'btn--tag-checked')
        this.filterActionBtn.classList.remove('btn--color-grey')

        if (isOpen) {
          btnIconElement.innerHTML = this.svgCross
        } else {
          btnIconElement.innerHTML = String(selectedCount)
        }
      } else {
        this.filterActionBtn.innerHTML = this.defaultContentBtn
        this.filterActionBtn.classList.remove('btn--tag', 'btn--tag-checked')
        this.filterActionBtn.classList.add('btn--color-grey')
      }
    }
  }

  private clearAllFilters() {
    Object.entries(this.filters).forEach(elem => {
      elem[1].selectedOptions = []
      elem[1].moreCount = -3
    })
    
    const inputs = this.filtersWrapper?.querySelectorAll('input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>
    inputs?.forEach(input => input.checked = false)

    if (this.chipsWrapper) {
      this.chipsWrapper.innerHTML = ''
      this.chipsWrapper.classList.toggle('active')
    }

    this.changeIcon()
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
        this.changeIcon()
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
    this.changeIcon()
  }

  private toggleChips() {
    if (this.chipsWrapper) {
      if (Array.from(this.chipsWrapper?.children || []).length === 0) {
        this.chipsWrapper.classList.remove('active')
      }
    }
  }

  private toggleFilter() {
    if (window.innerWidth < BreakpointWidth.DESKTOP) {
      document.body.classList.toggle('overflow')

      if (this.sortWrapper?.classList.contains('active')) {
        document.body.classList.add('overflow')
      }
    }

    this.filterWrapper?.classList.toggle('active')
    this.changeIcon()
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.selectorFilterBtn)) {
      this.toggleFilter()
    }

    if (targetElement.closest(this.selectorChipCross)) {
      this.removeChips(targetElement)
    }

    if (targetElement.closest(this.selectorClearBtn)) {
      this.clearAllFilters()
    }

    if (targetElement.closest(this.selectorFilterCross)) {
      this.toggleFilter()
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
