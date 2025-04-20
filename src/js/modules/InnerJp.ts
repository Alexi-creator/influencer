interface ProductData {
  brand: string,
  title: string,
}

/**
 * @class InnerJp
 * @description Класс для страницы InnerJP (открытие/закрытие модалки товара по клику на карточку товара)
 */
export class InnerJp {
  private popupElem: HTMLElement
  private brandElem: HTMLElement
  private titleElem: HTMLElement

  private openPopupBtn: HTMLElement

  constructor() {
    const popupElem = document.querySelector('.product-in-modal')
    if (popupElem) this.popupElem = popupElem as HTMLElement

    const brandElem = this.popupElem.querySelector('.product__short-description-title')
    if (brandElem) this.brandElem = brandElem as HTMLElement
    const titleElem = this.popupElem.querySelector('.product__short-description-description')
    if (titleElem) this.titleElem = titleElem as HTMLElement

    const openPopupBtn = document.getElementById('openPopup') as HTMLElement
    if (openPopupBtn) this.openPopupBtn = openPopupBtn

    if (this.popupElem) {
      this.init()
    }
  }

  private init(): void {
    this.handlers()
  }

  private openPopup(): void {
    this.openPopupBtn.click()
  }

  private insertDataInPopup(data: ProductData): void {
    const { brand, title } = data

    this.brandElem.textContent = brand
    this.titleElem.textContent = title
    // TODO доделать для остальных полей продука
  }

  private getAttributeData(parentCard: HTMLElement): void {
    const jsonData = parentCard.dataset.info

    if (jsonData) {
      const data = JSON.parse(jsonData)
      this.insertDataInPopup(data)
      this.openPopup()
    }
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    const parentCard = targetElement.closest('.product-card') as HTMLElement

    if (parentCard) {
      this.getAttributeData(parentCard)
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
  }
}
