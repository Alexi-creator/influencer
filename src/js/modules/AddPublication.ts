import { StepsEnum } from '../constants/steps'

/**
 * Addpublication, отвечает за процесс добавления публикации.
 */
export class AddPublication {
  private stepsMap: Map<StepsEnum, HTMLElement>
  private stepsMapArr: [StepsEnum, HTMLElement][]
  private onChangeStep: (step: StepsEnum) => void
  
  private selectedCount: number
  private addedImgCount: number
  private currentStep: StepsEnum

  private mainSelector: string
  private stepContentSelector: string
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
  
  private actionsWrapperSelector: string
  private siteBtnSelector: string
  private prevBtnSelector: string
  private previewBtnSelector: string
  private previewActionBtnSelector: string
  private nextBtnSelector: string
  private publicationBtnSelector: string

  private selectedContentSelector: string
  private selectedCollapseCountSelector: string

  private uploadSelector: string
  private uploadInputSelector: string
  private uploadFilesSelector: string
  private uploadFileImgsSelector: string
  private uploadDescrSelector: string
  private uploadInfoSelector: string
  private uploadSettingsSelector: string

  private mainElem: HTMLElement
  private stepsArrElem: HTMLElement[]
  private contentsElem: HTMLElement
  private selectedElem: HTMLElement
  private selectedItemsElem: HTMLElement
  private goodsGalleryElem: HTMLElement
  private selectedCountElem: HTMLElement

  private actionsWrapperElem: HTMLElement
  private siteBtnElem: HTMLElement
  private prevBtnElem: HTMLButtonElement
  private previewBtnElem: HTMLElement
  private previewActionBtnElem: HTMLElement
  private nextBtnElem: HTMLButtonElement
  private publicationBtnElem: HTMLElement

  private selectedContentElem: HTMLElement
  private selectedCollapseCountElem: HTMLElement

  private uploadElem: HTMLElement
  private uploadInputElem: HTMLElement
  private uploadFilesElem: HTMLElement
  private uploadDescrElem: HTMLElement
  private uploadInfoElem: HTMLElement
  private uploadSettingsElem: HTMLElement

  constructor(stepsMap: Map<StepsEnum, HTMLElement>, onChangeStep: (step: StepsEnum) => void) {
    this.stepsMap = stepsMap
    this.stepsMapArr = Array.from(this.stepsMap)
    this.onChangeStep = onChangeStep
    this.selectedCount = 0
    this.addedImgCount = 0
    this.currentStep = StepsEnum.choose

    this.mainSelector = '.add-publication'
    this.stepContentSelector = `${this.mainSelector}__step-content`
    this.contentsSelector = `${this.mainSelector}__contents`
    this.contentSelector = `${this.mainSelector}__content`
    this.itemGoodsSelector = `${this.mainSelector}__content-results-list-item`
    this.itemClearSelector = `${this.mainSelector}__content-results-list-item-clear`

    this.selectedSelector = `${this.mainSelector}__selected`
    this.selectedItemsSelector = `${this.mainSelector}__selected-list`
    this.allClearSelector = `${this.selectedSelector}-all-clear`

    this.actionsWrapperSelector = `${this.mainSelector}__actions`
    this.siteBtnSelector = `${this.mainSelector}__actions-site`
    this.prevBtnSelector = `${this.mainSelector}__actions-prev`
    this.previewBtnSelector = `${this.mainSelector}__actions-preview`
    this.goodsGallerySelector = `${this.mainSelector}__actions-preview-goods-gallery`
    this.selectedCountSelector = `${this.mainSelector}__actions-preview-goods-count`
    this.previewActionBtnSelector = `${this.mainSelector}__actions-preview-action`
    this.nextBtnSelector = `${this.mainSelector}__actions-next`
    this.publicationBtnSelector = `${this.mainSelector}__actions-publication`

    this.selectedContentSelector = `${this.mainSelector}__filling-selected-content`
    this.selectedCollapseCountSelector = `${this.mainSelector}__filling-selected-count`

    this.uploadSelector = `${this.mainSelector}__filling-field-upload`
    this.uploadInputSelector = `${this.mainSelector}__filling-field-upload-input`
    this.uploadFilesSelector = `${this.mainSelector}__filling-field-upload-files`
    this.uploadFileImgsSelector = `${this.mainSelector}__filling-field-upload-files-img`
    this.uploadDescrSelector = `${this.mainSelector}__filling-field-upload-descr`
    this.uploadInfoSelector = `${this.mainSelector}__filling-field-upload-info`
    this.uploadSettingsSelector = `${this.mainSelector}__filling-field-upload-settings`

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

    const actionsWrapperElem = this.mainElem.querySelector(this.actionsWrapperSelector) as HTMLElement
    if (actionsWrapperElem) this.actionsWrapperElem = actionsWrapperElem
    const siteBtnElem = this.mainElem.querySelector(this.siteBtnSelector) as HTMLElement
    if (siteBtnElem) this.siteBtnElem = siteBtnElem
    const prevBtnElem = this.mainElem.querySelector(this.prevBtnSelector) as HTMLButtonElement
    if (prevBtnElem) this.prevBtnElem = prevBtnElem
    const previewActionBtnElem = this.mainElem.querySelector(this.previewActionBtnSelector) as HTMLElement
    if (previewActionBtnElem) this.previewActionBtnElem = previewActionBtnElem
    const previewBtnElem = this.mainElem.querySelector(this.previewBtnSelector) as HTMLElement
    if (previewBtnElem) this.previewBtnElem = previewBtnElem
    const nextBtnElem = this.mainElem.querySelector(this.nextBtnSelector) as HTMLButtonElement
    if (nextBtnElem) this.nextBtnElem = nextBtnElem
    const publicationBtnElem = this.mainElem.querySelector(this.publicationBtnSelector) as HTMLElement
    if (publicationBtnElem) this.publicationBtnElem = publicationBtnElem

    const selectedContentElem = this.mainElem.querySelector(this.selectedContentSelector) as HTMLElement
    if (selectedContentElem) this.selectedContentElem = selectedContentElem
    const selectedCollapseCountElem = this.mainElem.querySelector(this.selectedCollapseCountSelector) as HTMLElement
    if (selectedCollapseCountElem) this.selectedCollapseCountElem = selectedCollapseCountElem

    const uploadElem = this.mainElem.querySelector(this.uploadSelector) as HTMLElement
    if (uploadElem) this.uploadElem = uploadElem
    const uploadInputElem = this.mainElem.querySelector(this.uploadInputSelector) as HTMLElement
    if (uploadInputElem) this.uploadInputElem = uploadInputElem
    const uploadFilesElem = this.mainElem.querySelector(this.uploadFilesSelector) as HTMLElement
    if (uploadFilesElem) this.uploadFilesElem = uploadFilesElem
    const uploadDescrElem = this.mainElem.querySelector(this.uploadDescrSelector) as HTMLElement
    if (uploadDescrElem) this.uploadDescrElem = uploadDescrElem
    const uploadInfoElem = this.mainElem.querySelector(this.uploadInfoSelector) as HTMLElement
    if (uploadInfoElem) this.uploadInfoElem = uploadInfoElem
    const uploadSettingsElem = this.mainElem.querySelector(this.uploadSettingsSelector) as HTMLElement
    if (uploadSettingsElem) this.uploadSettingsElem = uploadSettingsElem

    const goodsGalleryElem = this.mainElem.querySelector(this.goodsGallerySelector) as HTMLElement
    if (goodsGalleryElem) this.goodsGalleryElem = goodsGalleryElem
    const selectedCountElem = this.mainElem.querySelector(this.selectedCountSelector) as HTMLElement
    if (selectedCountElem) this.selectedCountElem = selectedCountElem

    this.stepsArrElem = Array.from(this.mainElem.querySelectorAll(this.stepContentSelector))

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
    if (this.selectedCount === 0) {
      this.nextBtnElem.disabled = false
    }

    this.selectedCount += 1
    this.previewBtnElem.classList.add('active')
    this.goodsGalleryElem.classList.add('active')

    this.selectedItemsElem.prepend(elem.cloneNode(true))

    const img = elem.querySelector('img')
    const id = elem.dataset.id

    if (img && id) {
      const src = img.src
      const newGalleryNode = this.createGalleryItem(id, src)

      this.goodsGalleryElem.appendChild(newGalleryNode)
    }

    elem.classList.add('active')
    this.selectedCountElem.textContent = String(this.selectedCount)
    this.selectedCollapseCountElem.textContent = String(this.selectedCount)

    this.selectedContentElem.prepend(elem.cloneNode(true))
  }

  private removeElem(elem: HTMLElement): void {
    elem.classList.remove('active')

    if (this.selectedCount > 0) {
      this.selectedCount -= 1
    }

    if (this.selectedCount === 0) {
      if (this.selectedElem.classList.contains('popup--open')) this.toggleBtnText()

      this.previewBtnElem.classList.remove('active')
      this.goodsGalleryElem.classList.remove('active')
      this.selectedElem.classList.remove('popup--open')
      this.nextBtnElem.disabled = true

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
    this.selectedCollapseCountElem.textContent = String(this.selectedCount)

    this.selectedContentElem.querySelector(`[data-id="${id}"]`)?.remove()
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

  private changeStep (variant: 'next' | 'prev'): void {
    const currentStepNumber = this.stepsArrElem.findIndex(elem => elem.classList.contains(`${this.mainSelector.substring(1)}__${this.currentStep}`))

    const stepOffset = variant === 'next' ? 1 : -1
    const newStepNumber = currentStepNumber + stepOffset

    this.stepsArrElem[currentStepNumber]?.classList.remove('active')
    this.stepsArrElem[newStepNumber]?.classList.add('active')

    this.currentStep = this.stepsMapArr[newStepNumber]?.[0]
    this.onChangeStep(this.currentStep)

    if (variant === 'next') {
      this.nextBtnElem.disabled = true
      this.prevBtnElem.classList.add('active')

      if (newStepNumber > 0) {
        this.siteBtnElem.classList.remove('active')
        this.previewBtnElem.classList.remove('active')
        this.actionsWrapperElem.classList.remove(`${this.actionsWrapperSelector.substring(1)}--first-step`)
      }
    }

    if (variant === 'prev') {
      this.nextBtnElem.disabled = false

      if (newStepNumber === 0) {
        this.prevBtnElem.classList.remove('active')
        this.siteBtnElem.classList.add('active')
        this.previewBtnElem.classList.add('active')
        this.actionsWrapperElem.classList.add(`${this.actionsWrapperSelector.substring(1)}--first-step`)
      }
    }
  }

  private addImages(targetElement: HTMLInputElement): void {
    const files = targetElement.files || []
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = (event) => {
          if (this.addedImgCount < 8) {
            const src = event.target?.result
            
            if (src && typeof src === 'string') {
              const imgNode = document.createElement('img')
              imgNode.src = src
              imgNode.alt = `preview-${file.name}`
              imgNode.className = this.uploadFileImgsSelector.substring(1)
              imgNode.dataset.id = `preview-${file.name}`
  
              this.uploadFilesElem.appendChild(imgNode)
              this.addedImgCount += 1
              this.uploadElem.classList.add('active')
              this.uploadFilesElem.classList.add('active')
              this.uploadInfoElem.classList.add('active')
              this.uploadSettingsElem.classList.add('active')
              this.uploadDescrElem.classList.add('hide')

              if (this.addedImgCount === 8) {
                this.uploadInputElem.classList.add('input-text--disabled')
              }
            }
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  private changeHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement
    
    if (targetElement.closest(this.mainSelector)) {
      return this.addImages(targetElement)
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

      if (currentElem) return this.removeElem(currentElem)
    }

    if (this.nextBtnElem.contains(targetElement)) {
      return this.changeStep('next')
    }

    if (this.prevBtnElem.contains(targetElement)) {
      this.changeStep('prev')
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('closePopup', e => this.closePopupEvent(e))
    document.addEventListener('change', e => this.changeHandler(e))
  }
}
