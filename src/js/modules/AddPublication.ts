import { StepsEnum } from '../constants/steps'

/**
 * Addpublication, отвечает за процесс добавления публикации.
 */
export class AddPublication {
  private changeStep: (step: StepsEnum) => void
  // currentStep: StepsEnum
  private selectedCount: number

  private mainSelector: string
  private contentsSelector: string
  private contentSelector: string
  private itemGoodsSelector: string
  private itemClearSelector: string

  private selectedSelector: string
  private selectedItemsSelector: string
  private allClearSelector: string
  private goodsGallerySelector: string
  private selectedCountSelector: string

  private galleryItemSelector: string
  private galleryItemMoreSelector: string

  private siteBtnSelector: string
  private prevBtnSelector: string
  private previewBtnSelector: string
  private previewActionBtnSelector: string
  private nextBtnSelector: string
  private publicationBtnSelector: string

  private mainElem: HTMLElement
  private contentsElem: HTMLElement
  private selectedElem: HTMLElement
  private selectedItemsElem: HTMLElement
  private goodsGalleryElem: HTMLElement
  private selectedCountElem: HTMLElement

  private siteBtnElem: HTMLElement
  private prevBtnElem: HTMLElement
  private previewBtnElem: HTMLElement
  private previewActionBtnElem: HTMLElement
  private nextBtnElem: HTMLElement
  private publicationBtnElem: HTMLElement

  constructor(changeStep: () => void) {
    this.changeStep = changeStep
    this.selectedCount = 0

    this.mainSelector = '.add-publication'
    this.contentsSelector = `${this.mainSelector}__contents`
    this.contentSelector = `${this.mainSelector}__content`
    this.itemGoodsSelector = `${this.mainSelector}__content-results-list-item`
    this.itemClearSelector = `${this.mainSelector}__content-results-list-item-clear`

    this.selectedSelector = `${this.mainSelector}__selected`
    this.selectedItemsSelector = `${this.mainSelector}__selected-list`
    this.allClearSelector = `${this.selectedSelector}-all-clear`

    this.siteBtnSelector = `${this.mainSelector}__actions-site`
    this.prevBtnSelector = `${this.mainSelector}__actions-prev`
    this.previewBtnSelector = `${this.mainSelector}__actions-preview`
    this.goodsGallerySelector = `${this.mainSelector}__actions-preview-goods-gallery`
    this.selectedCountSelector = `${this.mainSelector}__actions-preview-goods-count`
    this.previewActionBtnSelector = `${this.mainSelector}__actions-preview-action`
    this.nextBtnSelector = `${this.mainSelector}__actions-next`
    this.publicationBtnSelector = `${this.mainSelector}__actions-publication`

    this.galleryItemSelector = '.gallery-card__item'
    this.galleryItemMoreSelector = `${this.galleryItemSelector}-more`

    const mainElem = document.querySelector(this.mainSelector) as HTMLElement
    if (mainElem) this.mainElem = mainElem

    const contentsElem = this.mainElem.querySelector(this.contentsSelector) as HTMLElement
    if (contentsElem) this.contentsElem = contentsElem
    const selectedElem = this.mainElem.querySelector(this.selectedSelector) as HTMLElement
    if (selectedElem) this.selectedElem = selectedElem
    const selectedItemsElem = this.mainElem.querySelector(this.selectedItemsSelector) as HTMLElement
    if (selectedItemsElem) this.selectedItemsElem = selectedItemsElem

    const siteBtnElem = this.mainElem.querySelector(this.siteBtnSelector) as HTMLElement
    if (siteBtnElem) this.siteBtnElem = siteBtnElem
    const prevBtnElem = this.mainElem.querySelector(this.prevBtnSelector) as HTMLElement
    if (prevBtnElem) this.prevBtnElem = prevBtnElem
    const previewActionBtnElem = this.mainElem.querySelector(this.previewActionBtnSelector) as HTMLElement
    if (previewActionBtnElem) this.previewActionBtnElem = previewActionBtnElem
    const previewBtnElem = this.mainElem.querySelector(this.previewBtnSelector) as HTMLElement
    if (previewBtnElem) this.previewBtnElem = previewBtnElem
    const nextBtnElem = this.mainElem.querySelector(this.nextBtnSelector) as HTMLElement
    if (nextBtnElem) this.nextBtnElem = nextBtnElem
    const publicationBtnElem = this.mainElem.querySelector(this.publicationBtnSelector) as HTMLElement
    if (publicationBtnElem) this.publicationBtnElem = publicationBtnElem

    const goodsGalleryElem = this.mainElem.querySelector(this.goodsGallerySelector) as HTMLElement
    if (goodsGalleryElem) this.goodsGalleryElem = goodsGalleryElem
    const selectedCountElem = this.mainElem.querySelector(this.selectedCountSelector) as HTMLElement
    if (selectedCountElem) this.selectedCountElem = selectedCountElem

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private removeItemMore(): void {
    const elem = this.goodsGalleryElem.querySelector(this.galleryItemMoreSelector)

    if (elem) elem.remove()
  }

  private createGalleryItem(id: string, src: string): HTMLElement {
    const parentNode = document.createElement('div')
    parentNode.classList.add(this.galleryItemSelector.substring(1))
    parentNode.dataset.id = id

    const imgNode = document.createElement('img')
    imgNode.src = src

    parentNode.appendChild(imgNode)

    if (this.selectedCount > 2) {
      this.removeItemMore()

      const countElem = document.createElement('span')
      countElem.classList.add(this.galleryItemMoreSelector.substring(1))
      countElem.textContent = `+${this.selectedCount - 2}`

      parentNode.appendChild(countElem)
    }
  
    return parentNode
  }

  private addElem(elem: HTMLElement): void {
    this.selectedCount += 1
    
    this.previewBtnElem.classList.add('active')
    this.goodsGalleryElem.classList.add('active')

    const elementCopy = elem.cloneNode(true)
    this.selectedItemsElem.prepend(elementCopy)

    const img = elem.querySelector('img')
    const id = elem.dataset.id

    if (img && id) {
      const src = img.src
      const newGalleryNode = this.createGalleryItem(id, src)

      this.goodsGalleryElem.appendChild(newGalleryNode)
    }

    elem.classList.add('active')
    this.selectedCountElem.textContent = String(this.selectedCount)
  }

  private removeElem(elem: HTMLElement): void {
    elem.classList.remove('active')

    if (this.selectedCount > 0) {
      this.selectedCount -= 1
    }

    if (this.selectedCount === 0) {
      this.previewBtnElem.classList.remove('active')
      this.goodsGalleryElem.classList.remove('active')
      this.selectedElem.classList.remove('popup--open')

      this.toggleBtnText()
    }

    const id = elem.dataset.id
    const selectedItem = this.selectedItemsElem.querySelector(`[data-id="${id}"]`)
    if (selectedItem) selectedItem.remove()

    const galleryItem = this.goodsGalleryElem.querySelector(`[data-id="${id}"]`)
    if (galleryItem) galleryItem.remove()

    this.removeItemMore()
    
    if (this.selectedCount > 2) {
      const countElem = document.createElement('span')
      countElem.classList.add(this.galleryItemMoreSelector.substring(1))
      countElem.textContent = `+${this.selectedCount - 2}`

      const lastElement = this.goodsGalleryElem.lastElementChild
      if (lastElement) lastElement.appendChild(countElem)
    }

    this.selectedCountElem.textContent = String(this.selectedCount)
  }

  private toggleItemGoods(elem: HTMLElement): void {
    if (elem.classList.contains('active')) {
      this.removeElem(elem)
    } else {
      this.addElem(elem)
    }
  }

  private allClearSelected(): void {
    this.toggleDisplaySelectedBlock()
    this.selectedCount = 0
    this.previewBtnElem.classList.remove('active')
    this.goodsGalleryElem.classList.remove('active')

    const selectedItems: HTMLElement[] | [] = Array.from(this.selectedItemsElem.querySelectorAll(this.itemGoodsSelector))
    selectedItems.forEach(elem => {
      const elemId = elem.dataset.id
      elem.remove()

      const originElem = this.contentsElem.querySelector(`[data-id="${elemId}"]`) as HTMLElement   
      if (originElem) this.removeElem(originElem)
    })

    this.selectedElem.classList.remove('popup--open')
  }

  private toggleBtnText(): void {
    const currentText = this.previewActionBtnElem.textContent?.trim()
    const dataText = this.previewActionBtnElem.dataset.text || ''

    this.previewActionBtnElem.dataset.text = currentText
    this.previewActionBtnElem.textContent = dataText
  }

  private toggleDisplaySelectedBlock(): void {
    this.selectedElem.classList.toggle('popup--open')
    this.toggleBtnText()
  }

  private closePopupEvent (e): void {
    const popupId = e.detail

    if (popupId === 'selected-goods') {
      this.selectedElem.classList.remove('popup--open')
      this.toggleBtnText()
    }
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement
    const parentItemGoods = targetElement.closest(this.itemGoodsSelector) as HTMLElement

    if (parentItemGoods && targetElement.closest(this.contentSelector)) {
      return this.toggleItemGoods(parentItemGoods)
    }

    if (targetElement.closest(this.allClearSelector)) {
      return this.allClearSelected()
    }
    
    if (targetElement.closest(this.previewBtnSelector)) {
      return this.toggleDisplaySelectedBlock()
    }

    if (targetElement.closest(this.itemClearSelector)) {
      const parent = targetElement.closest(this.itemGoodsSelector) as HTMLElement
      const parentId = parent.dataset.id
      const currentElem = this.contentsElem.querySelector(`[data-id="${parentId}"]`) as HTMLElement

      if (currentElem) this.removeElem(currentElem)
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('closePopup', e => this.closePopupEvent(e))
  }
}
