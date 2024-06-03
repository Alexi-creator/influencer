import { request, debounce } from '../utils'

interface IOptions {
  label: string
  value: string
}

interface IConstructor {
  id: string
  url?: string | undefined
  callback?: (arg: IOptions) => void
}

/**
 * Autocomplete с возможностью ввода и запросов за данными.
 */
export class Autocomplete {
  private id: string
  private url: string | undefined
  private callback: ((arg: IOptions) => void) | undefined

  private containerSelector: string
  private inputWrapperSelector: string
  private optionsSelector: string
  private itemSelector: string

  private options: IOptions[] | [] // Все опции
  private searchOptions: IOptions[] | [] // Опции которые попадают под поиск
  private selectedOption: IOptions
  private isOpen: boolean

  private containerElem: HTMLElement
  private inputWrapperElem: HTMLElement
  private inputElem: HTMLInputElement
  private optionsElem: HTMLElement
  private hiddenInputElem: HTMLInputElement

  private debounce: (userInput: string) => void

  constructor({ id, url, callback }: IConstructor) {
    this.id = id
    this.url = url
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

    const prepareOptions = this.searchOptions.map(({ label, value }) => {
      return `<li class="autocomplete__options-item" data-value="${value}" tabindex="0">${label}</li>`
    }).join('')
    console.log('prepareOptions', prepareOptions)

    this.optionsElem.innerHTML = prepareOptions
  }

  private collectedInitialOptions(): void {
    const allOptionsElem = Array.from(this.containerElem.querySelectorAll(this.itemSelector)) as HTMLElement[]
    
    const preparedOptions = allOptionsElem.reduce<IOptions[]>((acc, opt) => {
      const label = opt.innerHTML
      const value = opt.dataset.value

      if (label && value) {
        return [...acc, { label, value }]
      }

      return acc
    }, [])

    this.options = preparedOptions
  }

  private toggle(): void {
    this.isOpen = !this.isOpen
    this.containerElem.classList.toggle('active')
  }

  private selected(targetElement: HTMLElement): void {
    const value = targetElement.dataset.value
    const label = targetElement.innerHTML

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
    // TODO переделать под реальное API
    this.containerElem.classList.add('load')
    const response = await request(`${this.url}?search=${userInput}`, {})
    this.containerElem.classList.remove('load')


    if (response.error) {
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
      if (userInput && userInput.length > 2) {
        this.debounce(userInput)
      } else {
        this.searchOptions = []
        this.renderOptions()
      }

      return
    }

    const match = new RegExp(userInput, 'i')
    const matches: IOptions[] = this.options.filter(option => match.test(option.label))

    this.searchOptions = matches
    this.renderOptions()    
  }

  private clickHandler(e: Event) : void{
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

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('input', (e) => this.inputHandler(e))
    // document.addEventListener('blur', (e) => this.blurHandler(e))
  }
}
