interface IConstructor {
  selectSizeId: string
  selectAmountId: string
}

/**
 * Product отображение блока выбора количества товара, пересчет цены за ед товара при выбранном количестве.
 */
export class Product {
  private selectSizeId: string
  private selectAmountId: string

  private countBuy: number

  private sizeCount: Map<string, string>
  private selectSizeValue: string
  private selectAmountValue: string

  private discountMap: Map<number, string>

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

  private incrementElem: Element
  private decrementElem: Element
  private countElem: Element

  private bodyDiscountTableElem: Element
  private price: Element

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

    this.countBuy = 1

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

    const incrementElem = document.querySelector('.product__short-description-sales-increment')
    if (incrementElem) this.incrementElem = incrementElem
    const decrementElem = document.querySelector('.product__short-description-sales-decrement')
    if (decrementElem) this.decrementElem = decrementElem
    const countElem = document.querySelector('.product__short-description-sales-count')
    if (countElem) this.countElem = countElem

    const bodyDiscountTableElem = document.getElementById('bodyDiscountTable')
    if (bodyDiscountTableElem) this.bodyDiscountTableElem = bodyDiscountTableElem
    const price = document.querySelector('.product__info-price-item-new-count')
    if (price) this.price = price
    
    this.init()
  }

  private init(): void {
    this.handlers()
    this.initOptions()
    this.createOptions()
    this.mapDiscountPrice()
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

  private mapDiscountPrice(): void {
    const numbers = this.bodyDiscountTableElem.querySelectorAll('.number')
    const result = new Map()

    numbers.forEach((price, index) => {
      result.set(index + 1, price.textContent?.trim())
    })

    this.discountMap = result
  }

  private changeViseablePrice(): void {
    if (Number(this.selectAmountValue) === 1) {
      this.viseableMoreElem.classList.add('hide')
      this.viseableOneElem.classList.remove('hide')
    } else {
      this.viseableMoreElem.classList.remove('hide')
      this.viseableOneElem.classList.add('hide')
    }
  }

  private counter(mode: 'increment' | 'decrement'): void {
    if (mode === 'increment') {
      if (this.countBuy < Number(this.sizeCount.get(this.selectSizeValue))) {
        this.countBuy += 1
        this.countElem.innerHTML = String(this.countBuy)
      }
    }

    if (mode === 'decrement') {
      if (this.countBuy > 1) {
        this.countBuy -= 1
        this.countElem.innerHTML = String(this.countBuy)
      }
    }
  }

  private changeViseableCount(): void {
    this.actionsElem.classList.add('active')
    this.addCartElem.classList.add('hide')
    this.buyElem.classList.add('hide')
    this.linkCartElem.classList.remove('hide')
    this.countBlockElem.classList.remove('hide')
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    if (this.addCartElem.contains(targetElement)) {
      this.changeViseableCount()

      return
    }

    if (this.incrementElem.contains(targetElement)) {
      this.counter('increment')
      

      return
    }

    if (this.decrementElem.contains(targetElement)) {
      this.counter('decrement')

      return
    }
  }

  private handleSelectChange(e: CustomEvent<{ selectName: string, value: string }>): void {
    const { selectName, value } = e.detail
    
    if (selectName === this.selectSizeId) {
      this.selectSizeValue = value
      this.selectAmountValue = '1'
      this.countElem.innerHTML = '1'
      this.countBuy = 1
      this.changeViseablePrice()
      this.createOptions()

      const newPrice = this.discountMap.get(1)
      
      if (newPrice) {
        this.price.innerHTML = newPrice
      }
    }

    if (selectName === this.selectAmountId) {
      this.selectAmountValue = value
      this.changeViseablePrice()

      const valueNumber = Number(value)
      const discountIndex = Math.min(valueNumber, this.discountMap.size)
      const newPrice = this.discountMap.get(discountIndex)
      
      if (newPrice) {
        this.price.innerHTML = newPrice
      }
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('select-change', (e) => this.handleSelectChange(e as CustomEvent<{ selectName: string, value: string }>))
  }
}
