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
  private selectorIconCross: string
  private selectedCount: number
  
  private isOpen: boolean
  private category: string | undefined

  // dom элементы
  private container: HTMLElement
  private filterActionBtn: Element
  private filterWrapper: HTMLElement
  private filtersWrapper: HTMLElement
  private chipsWrapper: HTMLElement
  private submitBtn: Element
  private btnCount: Element
  private filterCross: HTMLElement
  private clearBtn: HTMLElement

  // объект с состоянием фильтров (выбранные позиции, кол-во выбранных)
  private filters: Record<string, IFilter>

  constructor({ selectorMain, selectorContainer, selectorActionBtn }: { selectorMain: string, selectorContainer: string, selectorActionBtn: string }) {
    this.selectorContainer = selectorContainer
    this.selectorActionBtn = selectorActionBtn

    this.selectorFilterWrapper = `${selectorMain}__form-filter`
    this.selectorFiltersWrapper = `${selectorMain}__form-filter-filters`
    this.selectorChips = `${selectorMain}__form-chips`
    this.selectorFilterCross = `${selectorMain}__form-filter-cross`
    this.selectorChipCross = '.chip__cross'
    this.selectorClearBtn = `${selectorMain}__form-filter-clear`
    this.selectorSubmitBtn = `${selectorMain}__form-filter-submit`
    this.selectorBtnCount = `${selectorMain}__actions-filters-count`
    this.selectorIconCross = `${selectorMain}__actions-icon--cross`
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
    const btnCount = this.filterActionBtn.querySelector(this.selectorBtnCount)
    if (btnCount) this.btnCount = btnCount as HTMLElement
    const submitBtn = this.filterWrapper.querySelector(this.selectorSubmitBtn)
    if (submitBtn) this.submitBtn = submitBtn as HTMLElement
    const clearBtn = this.filterWrapper.querySelector(this.selectorClearBtn)
    if (clearBtn) this.clearBtn = clearBtn as HTMLElement
    const filterCross = this.container.querySelector(this.selectorFilterCross)
    if (filterCross) this.filterCross = filterCross as HTMLElement

    this.category = this.selectorContainer.split('-').pop()

    if (!this.filterActionBtn || !this.container) return

    this.init()
  }

  private init(): void {
    this.handlers()
    this.collectionOptions()

    const mediaQueryList = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryList.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent): void {
    if (!this.container.classList.contains('hide')) {
      if (e.matches && this.isOpen) return document.body.classList.remove('overflow')
      if (!e.matches && this.isOpen) document.body.classList.add('overflow')
    }
  }

  private chipTemplate(title: string, options: string, moreCount: number): string {
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

  private collectionOptions(): void {
    this.filters = Array.from(this.filtersWrapper.querySelectorAll('.filters__item')).reduce((acc, filter) => {
      const title = filter.querySelector('.collapse__head-title')?.textContent?.trim()
      const selectedOptionsCheckbox = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'))
        .map(item => {
          return item.closest('.checkbox')?.querySelector('.checkbox__label')?.textContent?.trim()
        }).sort() || []

      // для checkbox
      if (title) acc[title] = {
        selectedOptions: selectedOptionsCheckbox,
        moreCount: selectedOptionsCheckbox.length - 3,
      }

      // const selectedRangeMin = filter.querySelector('input[data-min]') as HTMLInputElement
      // const selectedRangeMax = filter.querySelector('input[data-max]') as HTMLInputElement
      
      // // для ползунка прайса
      // if (title && (selectedRangeMin || selectedRangeMax)) acc[title] = {
      //   selectedOptions: [`от ${selectedRangeMin?.value} до ${selectedRangeMax?.value}`],
      //   moreCount: 0,
      // }

      return acc
    }, {})

    this.displayChips()
    this.changeCount()
  }

  private changeCount(): void {
    const selectedCount = Object.entries(this.filters).reduce((acc, filter) => acc += filter[1].selectedOptions.length, 0)
    this.selectedCount = selectedCount
    
    const countBtn = this.submitBtn.querySelector('.btn__suffix') as HTMLElement
    
    if (selectedCount) {
      this.filterActionBtn.classList.add('btn--tag', 'btn--tag-checked', 'hide-icon')
      this.filterActionBtn.classList.remove('btn--color-grey', 'hide-count')

      this.btnCount.innerHTML = String(selectedCount)
      this.btnCount.classList.add(`${this.selectorBtnCount.substring(1)}--active`)

      countBtn.innerHTML = `(${selectedCount})`
    } else {
      this.filterActionBtn.classList.remove('btn--tag', 'btn--tag-checked', 'hide-icon')
      this.filterActionBtn.classList.add('btn--color-grey', 'hide-count')

      this.btnCount.innerHTML = ''
      this.btnCount.classList.remove(`${this.selectorBtnCount.substring(1)}--active`)

      countBtn.innerHTML = ''
    }
  }

  private changeOptions(targetElement: HTMLInputElement): void {
    const { checked } = targetElement
    
    const title = targetElement.closest('.collapse')?.querySelector('.collapse__head-title')?.textContent?.trim()
    const option = targetElement.closest('.checkbox')?.querySelector('.checkbox__label')?.textContent?.trim()
    const range = targetElement.classList.contains('range__input')
    
    if (title && option) {
      const options = this.filters[title].selectedOptions

      if (checked) {
        this.filters[title].selectedOptions = [...options, option].sort()
      } else {
        this.filters[title].selectedOptions = options.filter(opt => opt !== option)
      }
  
      this.filters[title].moreCount = this.filters[title].selectedOptions.length - 3
    }

    // для ползунка
    if (range && title) {
      const value = targetElement.value

      if ('min' in targetElement.dataset) {
        const maxValue = targetElement.closest('.range__inputs')?.querySelector<HTMLInputElement>('.range__input-max')?.value
        this.filters[title].selectedOptions = [`от ${value} до ${maxValue}`]
      }

      if ('max' in targetElement.dataset) {
        const minValue = targetElement.closest('.range__inputs')?.querySelector<HTMLInputElement>('.range__input-min')?.value
        this.filters[title].selectedOptions = [`от ${minValue} до ${value}`]
      }
    }

    this.chipsWrapper.innerHTML = ''
    this.displayChips()
    this.toggleChips()
    this.changeCount()
  }

  private displayChips(): void {
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

  private removeChips(targetElement: HTMLElement): void {   
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
    this.changeCount()
    this.toggleChips()
  }

  private toggleChips(): void {
    if (this.chipsWrapper) {
      if (Array.from(this.chipsWrapper.children || []).length === 0) {
        this.chipsWrapper.classList.remove('active')
      }
    }
  }

  private toggleFilter(): void {    
    if (this.isOpen) {
      this.filterWrapper.classList.remove('active')
      this.filterActionBtn.classList.remove('active')

      if (this.selectedCount) {
        this.filterActionBtn.classList.add('hide-icon')
        this.filterActionBtn.classList.remove('hide-count')
      } 

      this.isOpen = false
      document.body.classList.remove('overflow')
    } else {
      this.filterWrapper.classList.add('active')
      this.filterActionBtn.classList.add('active')

      if (this.selectedCount) {
        this.filterActionBtn.classList.remove('hide-icon')
        this.filterActionBtn.classList.add('hide-count')
      }

      this.isOpen = true      
      window.innerWidth < BreakpointWidth.DESKTOP && document.body.classList.add('overflow')
    }
  }

  private clearAllFilters(): void {
    Object.entries(this.filters).forEach(elem => {
      elem[1].selectedOptions = []
      elem[1].moreCount = -3
    })
    
    const inputs = this.filtersWrapper.querySelectorAll('input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>
    inputs?.forEach(input => input.checked = false)

    if (this.chipsWrapper) {
      this.chipsWrapper.innerHTML = ''
      this.chipsWrapper.classList.remove('active')
    }

    this.changeCount()
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    // клик по крестику в кнопке фильтра (сброс сортировок)      
    // if (targetElement.closest(this.selectorIconCross) && this.filterActionBtn.contains(targetElement)) {    
    //   this.clearAllFilters()
    //   return this.toggleFilter()
    // }

    // открытие / закрытие блока с фильтрами
    if (this.filterActionBtn.contains(targetElement) || this.filterCross.contains(targetElement)) {
      return this.toggleFilter()
    }

    // удаление чипсов и фильтров
    if (targetElement.closest(this.selectorChipCross) && this.container.contains(targetElement)) {
      return this.removeChips(targetElement)
    }

    // очистка всех фильтров
    if (targetElement.classList.contains('clear-filters') && this.isOpen) {      
      return this.clearAllFilters()
    }
  }

  private changeHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement
    this.changeOptions(targetElement)
  }

  private checkPopup<T extends string>(e: CustomEvent<T>): void {
    if (this.isOpen) {
      const category = e.detail.split('-').pop()

      if (category === this.category) {        
        document.body.classList.add('overflow')
      }

      if (category === 'clearFilter' && window.innerWidth < BreakpointWidth.DESKTOP) {
        document.body.classList.add('overflow')
      }
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('closePopup', (e) => this.checkPopup(e as CustomEvent<string>))
    this.filterWrapper.addEventListener('change', (e) => this.changeHandler(e))
  }
}
