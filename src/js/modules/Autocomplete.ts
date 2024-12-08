import { request, debounce } from '../utils'

interface IOptions {
  label: string
  value: string
  href?: string
  imgLink?: string
  subtitle?: string
}

interface IConstructor {
  id: string
  url?: string | undefined
  mod?: 'search' | undefined
  callback?: (arg: IOptions) => void
}

/**
 * Autocomplete с возможностью ввода и запросов за данными.
 */
export class Autocomplete {
  private id: string
  private url: string | undefined
  private mod: 'search' | undefined
  private callback: ((arg: IOptions) => void) | undefined

  private containerSelector: string
  private inputWrapperSelector: string
  private optionsSelector: string
  private itemSelector: string

  private options: IOptions[] | [] = [] // Все опции
  private searchOptions: IOptions[] | [] = [] // Опции которые попадают под поиск
  private selectedOption: IOptions | null = null
  private isOpen: boolean

  private containerElem: HTMLElement
  private inputWrapperElem: HTMLElement
  private inputElem: HTMLInputElement
  private optionsElem: HTMLElement
  private hiddenInputElem: HTMLInputElement

  private debounce: (userInput: string) => void
  private fetchController: AbortController | null = null

  constructor({ id, url, mod, callback }: IConstructor) {
    this.id = id
    this.url = url
    this.mod = mod
    this.callback = callback

    this.isOpen = false
  
    this.containerSelector = '.autocomplete'
    this.inputWrapperSelector = `${this.containerSelector}__input`
    this.optionsSelector = `${this.containerSelector}__options`
    this.itemSelector = `${this.containerSelector}__options-item`

    const containerElem = document.querySelector(`#${this.id}`) as HTMLElement
    if (containerElem) this.containerElem = containerElem    

    const inputWrapperElem = this.containerElem.querySelector(this.inputWrapperSelector) as HTMLElement
    if (inputWrapperElem) this.inputWrapperElem = inputWrapperElem
    const inputElem = this.inputWrapperElem.querySelector('input') as HTMLInputElement
    if (inputElem) this.inputElem = inputElem
    const hiddenInputElem = this.containerElem.querySelector('input[hidden]') as HTMLInputElement
    if (hiddenInputElem) this.hiddenInputElem = hiddenInputElem
    const optionsElem = this.containerElem.querySelector(this.optionsSelector) as HTMLElement
    if (optionsElem) this.optionsElem = optionsElem

    this.init()
  }

  private init() {
    this.handlers()
    this.collectedInitialOptions()
    this.debounce = debounce(this.fetchOptions, 200)
  }

  private renderOptions() {
    this.optionsElem.innerHTML = ''
    let prepareOptions
    
    if (this.mod === 'search') {
      // prepareOptions = this.searchOptions.map(({ label, value, href, imgLink, subtitle }) => {
      prepareOptions = this.searchOptions.map((opt: IOptions) => {
        return `<a href="${opt?.href}" class="autocomplete__options-item" data-value="${opt?.value}" tabindex="0">
        <img class="autocomplete__options-item-img" src="${opt?.imgLink}">
        <div class="autocomplete__options-item-title">${opt?.label}</div>
        <div class="autocomplete__options-item-subtitle">${opt?.subtitle}</div>
      </a>`
      }).join('')
    } else {
      prepareOptions = this.searchOptions.map(({ label, value }) => {
        return `<li class="autocomplete__options-item" data-value="${value}" tabindex="0">${label}</li>`
      }).join('')
    }

    this.optionsElem.innerHTML = prepareOptions
  }

  private collectedInitialOptions(): void {
    const allOptionsElem = Array.from(this.containerElem.querySelectorAll(this.itemSelector)) as (HTMLElement | HTMLAnchorElement)[]
    let preparedOptions: IOptions[]

    if (this.mod === 'search') {
      preparedOptions = allOptionsElem.reduce<IOptions[]>((acc, opt) => {
        const label = opt.querySelector(`${this.itemSelector}-title`)?.innerHTML 
        const value = opt.dataset.value
        const href = opt instanceof HTMLAnchorElement ? opt.href : undefined
        const img = opt.querySelector(`${this.itemSelector}-img`) as HTMLImageElement
        const imgLink = img.src
        const subtitle = opt.querySelector(`${this.itemSelector}-subtitle`)?.innerHTML

        if (label && value && href && imgLink && subtitle) {
          acc.push({ label, value, href, imgLink, subtitle })
        }
      
        return acc
      }, [])
    } else {
      preparedOptions = allOptionsElem.reduce<IOptions[]>((acc, opt) => {
        const label = opt.innerHTML
        const value = opt.dataset.value
      
        if (label && value) {
          acc.push({ label, value })
        }
      
        return acc
      }, [])
    }

    this.options = preparedOptions || []
  }

  private toggle(): void {
    this.isOpen = !this.isOpen
    this.containerElem.classList.toggle('active')
  }

  private selected(targetElement: HTMLElement): void {
    let value
    let label

    if (this.mod === 'search') {
      const parent = targetElement.closest(this.itemSelector) as HTMLElement
      const title =  parent?.querySelector(`${this.itemSelector}-title`) as HTMLElement
      
      value = parent?.dataset.value
      label = title?.innerHTML
    } else {
      value = targetElement.dataset.value
      label = targetElement.innerHTML
    }

    if (label) this.inputElem.value = label
    if (value) this.hiddenInputElem.value = value

    if (value && label) {
      this.selectedOption = { label, value }
    }

    if (this.callback && label && value) {
      this.callback({ label, value })
    }

    const options = Array.from(this.optionsElem.children) as HTMLElement[]
    options.forEach(opt => {
      opt.classList.remove('active')

      if (opt.dataset.value === value) opt.classList.add('active')
    })

    this.toggle()
  }

  private async fetchOptions(userInput: string): Promise<void> {
    this.fetchController = new AbortController()

    // TODO переделать под реальное API
    this.containerElem.classList.add('load')
    const response = await request(`${this.url}?search=${userInput}`, { fetchController: this.fetchController })
    this.containerElem.classList.remove('load')

    if (response.error && response.error.name !== 'AbortError') {
      console.error('Error fetching data:', response.error)

      return
    }
  
    if (Array.isArray(response.data)) {
      this.searchOptions = response.data as IOptions[]
      this.renderOptions()
    }
  }

  private async searchMatch(userInput: string): Promise<void> {
    // Если передан url значит опции нужно подгружать
    if (this.url) {
      if (this.fetchController) {
        this.fetchController?.abort()
      }

      if (userInput && userInput.length > 2) {
        this.debounce(userInput)
      } else {
        this.searchOptions = []
        this.renderOptions()
      }

      return
    }

    const match = new RegExp(userInput, 'i')
    const matches: IOptions[] = this.options.filter(option => match.test(option?.label))

    this.searchOptions = matches
    this.renderOptions()    
  }

  private clickHandler(e: Event): void {
    const targetElement = e.target as HTMLElement
    
    if (this.inputWrapperElem.contains(targetElement) || (!this.containerElem.contains(targetElement) && this.isOpen)) {
      this.toggle()
    }

    if (this.containerElem.contains(targetElement) && targetElement.closest(this.itemSelector)) {
      this.selected(targetElement)
    }
  }

  private inputHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement
    
    if (this.containerElem.contains(targetElement)) {
      this.searchMatch(targetElement.value)

      if (!this.isOpen) this.toggle()
    }
  }

  private setInput(targetElement: HTMLInputElement) {
    targetElement.value = this.selectedOption?.label ?? ''
  }

  private blurHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.value.length === 0 && this.selectedOption?.label) {
      this.setInput(targetElement)
    }    
  }

  private clearHandler(): void {
    this.selectedOption = null
    this.hiddenInputElem.value = ''

    if (this.callback) {
      this.callback({ label: '', value: '' })
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('input', (e) => this.inputHandler(e))
    this.inputElem.addEventListener('blur', (e) => this.blurHandler(e))
    this.inputElem.addEventListener('search', () => this.clearHandler())
  }
}
