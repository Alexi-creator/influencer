import { BreakpointWidth } from '../constants'

interface IFilter {
  selectedOptions: string[]
  moreCount: number
}

/**
 * Выбор фильтров
 */
export class Filter {
  // селекторы
  private selectorContainer: string
  private selectorFilterWrapper: string
  private selectorFiltersWrapper: string
  private selectorActionBtn: string
  private selectorFilterCross: string
  private selectorChips: string
  private selectorChipCross: string
  private selectorClearBtn: string
  private selectorSubmitBtn: string
  private selectorBtnCount: string
  // private selectorSortWrapper: string
  private isOpen: boolean

  // dom элементы
  private container: HTMLElement
  private filterActionBtn: Element
  private filterWrapper: HTMLElement
  private filtersWrapper: HTMLElement
  private chipsWrapper: HTMLElement
  private submitBtn: Element
  // private sortWrapper: HTMLElement
  private btnCount: Element
  private filterCross: HTMLElement
  private clearBtn: HTMLElement

  // объект с состоянием фильтров (выбранные позиции, кол-во выбранных)
  private filters: Record<string, IFilter>

  constructor({ selectorContainer, selectorActionBtn }: { selectorContainer: string, selectorActionBtn: string }) {
    this.selectorContainer = selectorContainer
    this.selectorActionBtn = selectorActionBtn

    // this.selectorSortWrapper = '.shop-window__form-sorting'
    this.selectorFilterWrapper = '.shop-window__form-filter',
    this.selectorFiltersWrapper = '.shop-window__form-filter-filters'
    this.selectorChips = '.shop-window__form-chips',
    this.selectorFilterCross = '.shop-window__form-filter-cross'
    this.selectorChipCross = '.chip__cross'
    this.selectorClearBtn = '.shop-window__form-filter-clear'
    this.selectorSubmitBtn = '.shop-window__form-filter-submit'
    this.selectorBtnCount = '.shop-window__actions-filters-count'
    this.isOpen = false

    const container = document.querySelector(this.selectorContainer)
    if (container) this.container = container as HTMLElement
    const filterActionBtn = document.querySelector(this.selectorActionBtn)
    if (filterActionBtn) this.filterActionBtn = filterActionBtn as HTMLElement

    const filterWrapper = this.container.querySelector(this.selectorFilterWrapper)
    if (filterWrapper) this.filterWrapper = filterWrapper as HTMLElement
    const filtersWrapper = this.container.querySelector(this.selectorFiltersWrapper)
    if (filtersWrapper) this.filtersWrapper = filtersWrapper as HTMLElement
    const chipsWrapper = this.container.querySelector(this.selectorChips)
    if (chipsWrapper) this.chipsWrapper = chipsWrapper as HTMLElement
    // const sortWrapper = this.container.querySelector(this.selectorSortWrapper)
    // if (sortWrapper) this.sortWrapper = sortWrapper as HTMLElement
    const btnCount = this.filterActionBtn.querySelector(this.selectorBtnCount)
    if (btnCount) this.btnCount = btnCount as HTMLElement
    const submitBtn = this.filterWrapper.querySelector(this.selectorSubmitBtn)
    if (submitBtn) this.submitBtn = submitBtn as HTMLElement
    const clearBtn = this.filterWrapper.querySelector(this.selectorClearBtn)
    if (clearBtn) this.clearBtn = clearBtn as HTMLElement
    const filterCross = this.container.querySelector(this.selectorFilterCross)
    if (filterCross) this.filterCross = filterCross as HTMLElement

    if (!this.filterActionBtn || !this.container) return

    this.init()
  }

  private init() {
    this.handlers()
    this.collectionOptions()

    const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryList.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    if (!this.container.classList.contains('hide')) {      
      if (e.matches && this.isOpen) return document.body.classList.remove('overflow')
      if (!e.matches && this.isOpen) document.body.classList.add('overflow')
    }
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
      this.changeCount()
    }
  }

  private changeCount() {
    const selectedCount = Object.entries(this.filters).reduce((acc, filter) => acc += filter[1].selectedOptions.length, 0)
    
    const countBtn = this.submitBtn.querySelector('.btn__suffix') as HTMLElement
    
    if (selectedCount) {
      this.filterActionBtn.classList.add('btn--tag', 'btn--tag-checked')
      this.filterActionBtn.classList.remove('btn--color-grey')

      this.btnCount.innerHTML = String(selectedCount)
      this.btnCount.classList.add(`${this.selectorBtnCount.substring(1)}--active`)

      countBtn.innerHTML = `(${selectedCount})`
    } else {
      this.filterActionBtn.classList.remove('btn--tag', 'btn--tag-checked')
      this.filterActionBtn.classList.add('btn--color-grey')
      this.btnCount.classList.remove(`${this.selectorBtnCount.substring(1)}--active`)

      countBtn.innerHTML = ''
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
        this.changeCount()
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

    if (title) {
      const filter = Array.from(this.filterWrapper.querySelectorAll('.collapse__head-title'))
        .filter(item => item?.textContent?.trim() === title)

      const parent = filter[0].closest('.filters__item')
      const inputs = parent?.querySelectorAll('input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>
      inputs?.forEach(input => input.checked = false)

      this.filters[title].selectedOptions = []
    }

    chip?.remove()
    this.toggleChips()
    this.changeCount()
  }

  private toggleChips() {
    if (this.chipsWrapper) {
      if (Array.from(this.chipsWrapper.children || []).length === 0) {
        this.chipsWrapper.classList.remove('active')
      }
    }
  }

  private toggleFilter() {
    if (this.isOpen) {
      this.filterWrapper.classList.remove('active')
      this.isOpen = false
      document.body.classList.remove('overflow')
    } else {
      this.filterWrapper.classList.add('active')
      this.isOpen = true      
      window.innerWidth < BreakpointWidth.DESKTOP && document.body.classList.add('overflow')
    }
  }

  public closeFilters() {
    this.filterWrapper.classList.remove('active')
    this.chipsWrapper.classList.remove('active')
  }

  private clearAllFilters() {
    Object.entries(this.filters).forEach(elem => {
      elem[1].selectedOptions = []
      elem[1].moreCount = -3
    })
    
    const inputs = this.filtersWrapper.querySelectorAll('input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>
    inputs?.forEach(input => input.checked = false)

    if (this.chipsWrapper) {
      this.chipsWrapper.innerHTML = ''
      this.chipsWrapper.classList.toggle('active')
    }

    this.changeCount()
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement

    // открытие / закрытие блока с фильтрами
    if (this.filterActionBtn.contains(targetElement) || this.filterCross.contains(targetElement)) {
      return this.toggleFilter()
    }

    // удаление чипсов и фильтров
    if (targetElement.closest(this.selectorChipCross) && this.container.contains(targetElement)) {
      return this.removeChips(targetElement)
    }

    // очистка всех фильтров
    if (this.clearBtn.contains(targetElement)) {
      return this.clearAllFilters()
    }
  }

  private changeHandler(e: Event) {
    const targetElement = e.target as HTMLInputElement

    if (this.filtersWrapper.contains(targetElement)) {
      this.changeOptions(targetElement)
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
    this.filterWrapper.addEventListener('change', (e) => this.changeHandler(e))
  }
}
