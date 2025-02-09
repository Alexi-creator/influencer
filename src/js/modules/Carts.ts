const enum ActionEnum {
  decrement = 'decrement',
  increment = 'increment',
}

/**
 * Управление корзинами
 */
export class Carts {
 private mainSelector: string
 private cartListSelector: string
 private numberPiecesSelector: string
 private orderBtnSelector: string
 private chooseAllSelector: string
 private oldSumNumberSelector: string
 private newSumNumberSelector: string
 private deleteCartBtn: string
 private orderCartBtn: string

 private cartItemSelector: string
 private cartInputSelector: string
 private minusBtnSelector: string
 private plusBtnSelector: string
 private chooseSelector: string
 private itemOldPriceSelector: string
 private itemNewPriceSelector: string
 private deleteItemBtnSelector: string

 private totalCartsPriceSelector: string

 private lang: string
 private formatter: Intl.NumberFormat

 private totalCartsPriceElem: HTMLElement

  constructor() {
    this.mainSelector = '.cart'
    this.cartListSelector = `${this.mainSelector}__items`
    this.numberPiecesSelector = `${this.mainSelector}__control-bottom-results-group-amount-number`
    this.orderBtnSelector = `${this.mainSelector}__control-bottom-control-btn-order`
    this.chooseAllSelector = `${this.mainSelector}__control-top-choose-all`
    this.oldSumNumberSelector = `${this.mainSelector}__control-bottom-results-group-sum-old`
    this.newSumNumberSelector = `${this.mainSelector}__control-bottom-results-group-sum-new`
    this.deleteCartBtn = `${this.mainSelector}__control-bottom-control-btn-del`
    this.orderCartBtn = `${this.mainSelector}__control-bottom-control-btn-order`

    this.cartItemSelector = '.cart-item'
    this.minusBtnSelector = `${this.cartItemSelector}__control-minus`
    this.plusBtnSelector = `${this.cartItemSelector}__control-plus`
    this.cartInputSelector = `${this.cartItemSelector}__control-amount-input`
    this.chooseSelector = `${this.cartItemSelector}__navigate-choose`
    this.itemOldPriceSelector = `${this.cartItemSelector}__navigate-price-old-sum`
    this.itemNewPriceSelector = `${this.cartItemSelector}__navigate-price-new-sum`
    this.deleteItemBtnSelector = `${this.cartItemSelector}__delete`

    this.totalCartsPriceSelector = '.carts-sum-class'

    const totalCartsPriceElem = document.querySelector(this.totalCartsPriceSelector) as HTMLElement
    if (totalCartsPriceElem) this.totalCartsPriceElem = totalCartsPriceElem

    this.init()
  }

  private init(): void {
    this.lang = document.documentElement.lang
    this.formatter = new Intl.NumberFormat(this.lang, {
      style: 'currency',
      currency: 'RUB', // TODO сделать мапу чтобы подстраиваться в зависимости от локали
      minimumFractionDigits: 0
    })

    this.handlers()
  }

  private changeCountItem(targetElement: HTMLElement, action: ActionEnum): void {
    const cartElem = targetElement.closest(this.mainSelector) as HTMLElement
    const cartItemElem = targetElement.closest(this.cartItemSelector) as HTMLElement

    const oldPricePerOne: number = Number(cartItemElem.dataset.oldPrice)
    const newPricePerOne: number = Number(cartItemElem.dataset.newPrice)

    const oldPriceItemElem = cartItemElem.querySelector(this.itemOldPriceSelector) as HTMLElement
    const newPriceItemElem = cartItemElem.querySelector(this.itemNewPriceSelector) as HTMLElement
  
    if (cartElem && cartItemElem) {
      const inputElem = cartItemElem.querySelector(this.cartInputSelector) as HTMLInputElement
  
      if (inputElem) {
        const [val, text] = inputElem.value.split(' ')
        const currentValue = Number(val)
        let newCount: number = 1
  
        if (action === ActionEnum.decrement && currentValue > 1) {
          newCount = currentValue - 1
        } else if (action === ActionEnum.increment) {
          newCount = currentValue + 1
        }

        inputElem.value = `${newCount} ${text}`
        oldPriceItemElem.textContent = this.formatter.format(oldPricePerOne * newCount)
        newPriceItemElem.textContent = this.formatter.format(newPricePerOne * newCount)
  
        const numberPiecesElem = cartElem.querySelector(this.numberPiecesSelector)
  
        if (numberPiecesElem) {
          const currentNumberPieces = Number(numberPiecesElem.textContent?.trim())
  
          if (action === ActionEnum.decrement && currentValue > 0) {
            numberPiecesElem.textContent = String(currentNumberPieces - 1)
          } else if (action === ActionEnum.increment) {
            numberPiecesElem.textContent = String(currentNumberPieces + 1)
          }
        }

        this.calculateTotalCartPrice(cartElem)
      }
    }
  }

  private calculateTotalPrice(): void {
    const allCarts = [...document.querySelectorAll(this.mainSelector)] as HTMLElement[]

    const totalPrice = allCarts.reduce((acc, cart) => {
      const cartSumElem = cart.querySelector(this.newSumNumberSelector)
      const sumCount = Number(cartSumElem?.textContent?.replace(/\D/g, '')) || 0

      return acc += sumCount
    }, 0)

    this.totalCartsPriceElem.textContent = totalPrice.toLocaleString(this.lang)
  }

  private calculateTotalCartPrice(cartElem: HTMLElement): void {
    const totalOldSumElem = cartElem.querySelector(this.oldSumNumberSelector)
    const totalNewSumElem = cartElem.querySelector(this.newSumNumberSelector)

    const cartListElem = cartElem.querySelector(this.cartListSelector) as HTMLElement
    const checkboxElems = [...cartListElem.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[]
    const isCheckedInputs = checkboxElems.filter(checkbox => checkbox.checked)
    
    const totalPice = isCheckedInputs.reduce((acc, checkbox) => {
      const cartItemElem = checkbox.closest(this.cartItemSelector) as HTMLElement
      const oldPriceElem = cartItemElem.querySelector(this.itemOldPriceSelector)
      const newPriceElem = cartItemElem.querySelector(this.itemNewPriceSelector)

      if (oldPriceElem && newPriceElem) {
        const oldPrice = Number(oldPriceElem.textContent?.replace(/\D/g, '')) || 0
        const newPrice = Number(newPriceElem.textContent?.replace(/\D/g, '')) || 0

        acc.totalOldPrice += oldPrice
        acc.totalNewPrice += newPrice
      }

      return acc
    }, { totalOldPrice: 0, totalNewPrice: 0 })

    if (totalOldSumElem && totalNewSumElem) {
      totalOldSumElem.textContent = this.formatter.format(totalPice.totalOldPrice)
      totalNewSumElem.textContent = this.formatter.format(totalPice.totalNewPrice)
    }

    this.calculateTotalPrice()
  }

  private selectAllItem(targetElement: HTMLInputElement): void {
    const cartElem = targetElement.closest(this.mainSelector) as HTMLElement
    const cartListElem = cartElem.querySelector(this.cartListSelector) as HTMLElement
    const checkboxes = [...cartListElem.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[]
    const orderBtnElem = cartElem.querySelector(this.orderBtnSelector) as HTMLButtonElement

    const isChecked = targetElement.checked
    
    if (isChecked) {
      checkboxes.forEach(checkbox => checkbox.checked = true)
      orderBtnElem.disabled = false
    } else {
      checkboxes.forEach(checkbox => checkbox.checked = false)
      orderBtnElem.disabled = true
    }

    this.calculateTotalCartPrice(cartElem)
  }

  private selectItem(targetElement: HTMLInputElement): void {
    const cartElem = targetElement.closest(this.mainSelector) as HTMLElement
    const cartListElem = targetElement.closest(this.cartListSelector) as HTMLElement
    const allCheckboxElem = cartElem.querySelector('input[name="allCheckbox"]') as HTMLInputElement
    const orderBtnElem = cartElem.querySelector(this.orderBtnSelector) as HTMLButtonElement

    const isChecked = targetElement.checked
    const checkboxes = [...cartListElem.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[]
    const isEveryNotChecked = checkboxes.every(item => item.checked === false)
    const isEveryChecked = checkboxes.every(item => item.checked === true)

    if (cartElem && cartListElem && orderBtnElem) {
      if (isChecked) {
        orderBtnElem.disabled = false
      }
      else {
        if (isEveryNotChecked) {
          orderBtnElem.disabled = true
        }
      }
    }

    allCheckboxElem.checked = isEveryChecked
    this.calculateTotalCartPrice(cartElem)
  }

  private removeItem(targetElement: HTMLElement): void {
    const cartElem = targetElement.closest(this.mainSelector) as HTMLElement
    const cartItemElem = targetElement.closest(this.cartItemSelector) as HTMLElement

    if (cartItemElem) {
      cartItemElem.remove()
      this.calculateTotalCartPrice(cartElem)
    }
  }

  private removeCart(targetElement: HTMLElement): void {
    const cartElem = targetElement.closest(this.mainSelector) as HTMLElement

    if (cartElem) {
      cartElem.remove()
      this.calculateTotalPrice()
    }
  }

  private orderCart(targetElement: HTMLElement): void {
    const cartElem = targetElement.closest(this.mainSelector) as HTMLElement

    if (cartElem) {
      // TODO доделать логику оформления когда будет известна механика
    }
  }

  private clickHandler(e: Event): void {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.minusBtnSelector)) {
      this.changeCountItem(targetElement, ActionEnum.decrement)
    }

    if (targetElement.closest(this.plusBtnSelector)) {
      this.changeCountItem(targetElement, ActionEnum.increment)
    }

    if (targetElement.closest(this.deleteItemBtnSelector)) {
      this.removeItem(targetElement)
    }

    if (targetElement.closest(this.deleteCartBtn)) {
      this.removeCart(targetElement)
    }

    if (targetElement.closest(this.orderCartBtn)) {
      this.orderCart(targetElement)
    }
  }

  private changeHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement

    if (targetElement.closest(this.chooseSelector)) {
      this.selectItem(targetElement)
    }    

    if (targetElement.closest(this.chooseAllSelector)) {
      this.selectAllItem(targetElement)
    }    
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
    document.addEventListener('change', (e) => this.changeHandler(e))
  }
}
