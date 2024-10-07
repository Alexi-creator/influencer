interface IConstructor {
  selectSizeId: string
  selectAmountId: string
}

/**
 * Product работа на странице продукта (пересчет цены при изменении количества товара).
 */
export class Product {
  private selectSizeId: string
  private selectAmountId: string

  private sizeCount: Map<string, string>
  private selectSizeValue: string
  private selectAmountValue: string

  private selectSizeElem: HTMLElement
  private selectAmountElem: HTMLElement
  
  private amountSelectTitleElem: Element
  private amountOptionsElem: Element
  private viseableOneElem: Element
  private viseableMoreElem: Element
  private actionsElem: Element
  private addCartElem: Element
  private buyElem: Element
  private linkCartElem: Element
  private countBlockElem: Element

  constructor({ selectSizeId = '', selectAmountId = '' }: IConstructor) {
    this.selectSizeId = selectSizeId
    this.selectAmountId = selectAmountId

    const selectSizeElem = document.getElementById(this.selectSizeId)
    if (selectSizeElem) this.selectSizeElem = selectSizeElem
    const selectAmountElem = document.getElementById(this.selectAmountId)
    if (selectAmountElem) this.selectAmountElem = selectAmountElem

    if (!this.selectSizeElem && !this.selectAmountElem) return
    
    this.sizeCount = new Map()
    this.selectSizeValue = this.selectSizeElem.querySelector('input')?.value as string
    this.selectAmountValue = this.selectAmountElem.querySelector('input')?.value as string

    const amountSelectTitleElem = this.selectAmountElem.querySelector('.select__title')
    if (amountSelectTitleElem) this.amountSelectTitleElem = amountSelectTitleElem
    const amountOptionsElem = this.selectAmountElem.querySelector('.select__options')
    if (amountOptionsElem) this.amountOptionsElem = amountOptionsElem

    const viseableOneElem = document.querySelector('.product__viseable--one')
    if (viseableOneElem) this.viseableOneElem = viseableOneElem
    const viseableMoreElem = document.querySelector('.product__viseable--more')
    if (viseableMoreElem) this.viseableMoreElem = viseableMoreElem

    const actionsElem = document.querySelector('.product__short-description-sales-price-actions')
    if (actionsElem) this.actionsElem = actionsElem
    const addCartElem = document.querySelector('.product__short-description-sales-add')
    if (addCartElem) this.addCartElem = addCartElem
    const buyElem = document.querySelector('.product__short-description-sales-buy')
    if (buyElem) this.buyElem = buyElem
    const linkCartElem = document.querySelector('.product__short-description-sales-cart')
    if (linkCartElem) this.linkCartElem = linkCartElem
    const countBlockElem = document.querySelector('.product__short-description-sales-change-count')
    if (countBlockElem) this.countBlockElem = countBlockElem

    this.init()
  }

  private init(): void {
    this.handlers()
    this.initOptions()
    this.createOptions()
  }

  private initOptions(): void {
    const options = Array.from(this.selectSizeElem.querySelectorAll('.select__options-item')) as HTMLElement[]
    
    options.forEach(opt => {
      const size = opt.dataset.value as string
      const countElem = opt.querySelector('[data-count]') as HTMLElement
      const count = countElem.dataset.count as string

      this.sizeCount.set(size, count)
    })
  }

  private createOptions(): void {
    this.amountOptionsElem.innerHTML = ''
    this.amountSelectTitleElem.innerHTML = '1 шт.'

    const currentCount = Number(this.sizeCount.get(this.selectSizeValue))
  
    for (let i = 1; i <= currentCount; i++) {
      const liElement = document.createElement('li')
      liElement.classList.add('select__options-item')
      if (i === 1) liElement.classList.add('active')
      liElement.setAttribute('data-value', String(i))
      liElement.setAttribute('role', 'button')
      liElement.setAttribute('tabindex', '0')
      liElement.textContent = `${i} шт.`
    
      this.amountOptionsElem.appendChild(liElement)
    }
  }

  private changeViseable(): void {
    if (Number(this.selectAmountValue) === 1) {
      this.viseableMoreElem.classList.add('hide')
      this.viseableOneElem.classList.remove('hide')
    } else {
      this.viseableMoreElem.classList.remove('hide')
      this.viseableOneElem.classList.add('hide')
    }
  }

  private calculate(): void {
    
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    if (this.addCartElem.contains(targetElement)) {
      this.actionsElem.classList.add('active')
      this.addCartElem.classList.add('hide')
      this.buyElem.classList.add('hide')
      this.linkCartElem.classList.remove('hide')
      this.countBlockElem.classList.remove('hide')
    }
  }

  private handleSelectChange(e: CustomEvent<{ selectName: string, value: string }>): void {
    const { selectName, value } = e.detail
    
    if (selectName === this.selectSizeId) {
      this.selectSizeValue = value
      this.selectAmountValue = '1'
      this.changeViseable()
      this.createOptions()
    }

    if (selectName === this.selectAmountId) {
      this.selectAmountValue = value
      this.calculate()
      this.changeViseable()
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('select-change', (e) => this.handleSelectChange(e as CustomEvent<{ selectName: string, value: string }>))
  }
}
