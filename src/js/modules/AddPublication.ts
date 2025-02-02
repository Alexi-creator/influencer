import { StepsEnum, httpStatus, BreakpointWidth } from '../constants'
import { CustomSwiper } from './CustomSwiper'

import { IStateForm } from './Form'

import Cropper from 'cropperjs'

interface IFillingFormData {
  'title-goods': string
  'tags': string
  'media-link': string
  'description': string
  'add-picture': File[]
}

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

  private fillingFormSelector: string
  private selectedContentSelector: string
  private selectedCollapseCountSelector: string

  private uploadSelector: string
  private uploadInputSelector: string
  private uploadFilesSelector: string
  private uploadFileImgsSelector: string
  private uploadDescrSelector: string
  private uploadInfoSelector: string
  private uploadSettingsSelector: string

  private fillingFormSubmitSelector: string
  private createdPopupSelector: string

  private selectedCollapseSelector: string
  private selectedToggleSelector: string
  private cropperPopupSelector: string
  private cropperImagesSelector: string
  private cropperImgSelector: string
  private cropperSelectedWrapperSelector: string
  private cropperBtnSelector: string

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

  private fillingFormElem: HTMLFormElement
  private selectedContentElem: HTMLElement
  private selectedCollapseCountElem: HTMLElement

  private uploadElem: HTMLElement
  private uploadInputElem: HTMLElement
  private uploadFilesElem: HTMLElement
  private uploadDescrElem: HTMLElement
  private uploadInfoElem: HTMLElement
  private uploadSettingsElem: HTMLElement

  private fillingFormSubmitElem: HTMLElement
  private createdPopupElem: HTMLElement

  private selectedToggleElem: HTMLElement
  private cropperPopupElem: HTMLElement
  private cropperImagesElem: HTMLElement
  private cropperSelectedWrapperElem: HTMLElement
  private cropperBtnElem: HTMLElement
  
  private currentCropper: Cropper | null
  private currentCroppedImgId: string
  
  private publicationSelector: string
  private publicationTitleSelector: string
  private publicationDescrSelector: string
  private publicationHashtagsSelector: string
  private publicationPriceCountSelector: string
  private publicationSetItemsLeftSelector: string
  private publicationSetItemsRightSelector: string
  private publicationGoodsCountNumberSelector: string
  private publicationPreviewGalleryCardSelector: string

  private publicationItemSelector: string
  private publicationItemPriceSelector: string
  private publicationItemDescrSelector: string

  private publicationItemsPopupContentSelector: string

  private swiperAddPublicationSelector: string
  private swiperWrapperSelector: string

  private publicationTitleElem: HTMLElement
  private publicationDescrElem: HTMLElement
  private publicationHashtagsElem: HTMLElement
  private publicationPriceCountElem: HTMLElement
  private publicationSetItemsLeftElem: HTMLElement
  private publicationSetItemsRightElem: HTMLElement
  private publicationGoodsCountNumberElem: HTMLElement
  private publicationPreviewGalleryCardElem: HTMLElement

  private publicationItemsPopupContentElem: HTMLElement

  private previewSwiper: CustomSwiper
  private swiperWrapperElem: HTMLElement

  constructor(stepsMap: Map<StepsEnum, HTMLElement>, onChangeStep: (step: StepsEnum) => void) {
    this.stepsMap = stepsMap
    this.onChangeStep = onChangeStep

    this.stepsMapArr = Array.from(this.stepsMap)
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

    this.fillingFormSelector = `${this.mainSelector}__filling`
    this.selectedContentSelector = `${this.mainSelector}__filling-selected-content`
    this.selectedCollapseCountSelector = `${this.mainSelector}__filling-selected-count`

    this.uploadSelector = `${this.mainSelector}__filling-field-upload`
    this.uploadInputSelector = `${this.mainSelector}__filling-field-upload-input`
    this.uploadFilesSelector = `${this.mainSelector}__filling-field-upload-files`
    this.uploadFileImgsSelector = `${this.mainSelector}__filling-field-upload-files-img`
    this.uploadDescrSelector = `${this.mainSelector}__filling-field-upload-descr`
    this.uploadInfoSelector = `${this.mainSelector}__filling-field-upload-info`
    this.uploadSettingsSelector = `${this.mainSelector}__filling-field-upload-settings`
    
    this.selectedCollapseSelector = `${this.mainSelector}__filling-selected collapse__head`
    this.selectedToggleSelector = `${this.mainSelector}__filling-selected-toggle`
    this.cropperPopupSelector = `${this.mainSelector}__filling-cropper`

    this.fillingFormSubmitSelector = `${this.mainSelector}__filling-submit`
    this.createdPopupSelector = `${this.mainSelector}__created-popup`
    
    this.cropperImagesSelector = '.cropper-publication__images'
    this.cropperImgSelector = '.cropper-publication__img'
    this.cropperSelectedWrapperSelector = '.cropper-publication__selected-wrapper'
    this.cropperBtnSelector = '.cropper-publication__btn'
    
    this.galleryItemSelector = '.gallery-card__item'
    this.galleryItemMoreSelector = `${this.galleryItemSelector}-more`

    this.publicationSelector = '.publication'
    this.publicationTitleSelector = `${this.publicationSelector}__title`
    this.publicationDescrSelector = `${this.publicationSelector}__descr`
    this.publicationHashtagsSelector = `${this.publicationSelector}__hashtags`
    this.publicationPriceCountSelector = `${this.publicationSelector}__price-count`
    this.publicationSetItemsLeftSelector = `${this.publicationSelector}__set-items-left`
    this.publicationSetItemsRightSelector = `${this.publicationSelector}__set-items-right`
    this.publicationGoodsCountNumberSelector = `${this.publicationSelector}__goods-count-number`
    this.publicationPreviewGalleryCardSelector = `${this.publicationSelector}__goods .gallery-card`

    this.publicationItemSelector = '.publication-item'
    this.publicationItemPriceSelector = `${this.publicationItemSelector}__price-number`
    this.publicationItemDescrSelector = `${this.publicationItemSelector}__descr`

    this.publicationItemsPopupContentSelector = '.publication-items-popup-content'

    this.swiperAddPublicationSelector = '.swiper-add-publication'
    this.swiperWrapperSelector = `${this.swiperAddPublicationSelector} .swiper-wrapper`

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

    const fillingFormElem = this.mainElem.querySelector(this.fillingFormSelector) as HTMLFormElement
    if (fillingFormElem) this.fillingFormElem = fillingFormElem
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

    const fillingFormSubmitElem = this.mainElem.querySelector(this.fillingFormSubmitSelector) as HTMLButtonElement
    if (fillingFormSubmitElem) this.fillingFormSubmitElem = fillingFormSubmitElem
    const createdPopupElem = this.mainElem.querySelector(this.createdPopupSelector) as HTMLButtonElement
    if (createdPopupElem) this.createdPopupElem = createdPopupElem

    const cropperPopupElem = this.mainElem.querySelector(this.cropperPopupSelector) as HTMLElement
    if (cropperPopupElem) this.cropperPopupElem = cropperPopupElem
    const selectedToggleElem = this.mainElem.querySelector(this.selectedToggleSelector) as HTMLElement
    if (selectedToggleElem) this.selectedToggleElem = selectedToggleElem

    const cropperImagesElem = this.mainElem.querySelector(this.cropperImagesSelector) as HTMLElement
    if (cropperImagesElem) this.cropperImagesElem = cropperImagesElem
    const cropperSelectedWrapperElem = this.mainElem.querySelector(this.cropperSelectedWrapperSelector) as HTMLElement
    if (cropperSelectedWrapperElem) this.cropperSelectedWrapperElem = cropperSelectedWrapperElem
    const cropperBtnElem = this.mainElem.querySelector(this.cropperBtnSelector) as HTMLElement
    if (cropperBtnElem) this.cropperBtnElem = cropperBtnElem

    const goodsGalleryElem = this.mainElem.querySelector(this.goodsGallerySelector) as HTMLElement
    if (goodsGalleryElem) this.goodsGalleryElem = goodsGalleryElem
    const selectedCountElem = this.mainElem.querySelector(this.selectedCountSelector) as HTMLElement
    if (selectedCountElem) this.selectedCountElem = selectedCountElem

    const publicationTitleElem = this.mainElem.querySelector(this.publicationTitleSelector) as HTMLElement
    if (publicationTitleElem) this.publicationTitleElem = publicationTitleElem
    const publicationDescrElem = this.mainElem.querySelector(this.publicationDescrSelector) as HTMLElement
    if (publicationDescrElem) this.publicationDescrElem = publicationDescrElem
    const publicationHashtagsElem = this.mainElem.querySelector(this.publicationHashtagsSelector) as HTMLElement
    if (publicationHashtagsElem) this.publicationHashtagsElem = publicationHashtagsElem
    const publicationPriceCountElem = this.mainElem.querySelector(this.publicationPriceCountSelector) as HTMLElement
    if (publicationPriceCountElem) this.publicationPriceCountElem = publicationPriceCountElem
    const publicationSetItemsLeftElem = this.mainElem.querySelector(this.publicationSetItemsLeftSelector) as HTMLElement
    if (publicationSetItemsLeftElem) this.publicationSetItemsLeftElem = publicationSetItemsLeftElem
    const publicationSetItemsRightElem = this.mainElem.querySelector(this.publicationSetItemsRightSelector) as HTMLElement
    if (publicationSetItemsRightElem) this.publicationSetItemsRightElem = publicationSetItemsRightElem
    const publicationGoodsCountNumberElem = this.mainElem.querySelector(this.publicationGoodsCountNumberSelector) as HTMLElement
    if (publicationGoodsCountNumberElem) this.publicationGoodsCountNumberElem = publicationGoodsCountNumberElem
    const publicationPreviewGalleryCardElem = this.mainElem.querySelector(this.publicationPreviewGalleryCardSelector) as HTMLElement
    if (publicationPreviewGalleryCardElem) this.publicationPreviewGalleryCardElem = publicationPreviewGalleryCardElem

    const publicationItemsPopupContentElem = document.body.querySelector(this.publicationItemsPopupContentSelector) as HTMLElement
    if (publicationItemsPopupContentElem) this.publicationItemsPopupContentElem = publicationItemsPopupContentElem

    const swiperWrapperElem = this.mainElem.querySelector(this.swiperWrapperSelector) as HTMLElement
    if (swiperWrapperElem) this.swiperWrapperElem = swiperWrapperElem

    this.stepsArrElem = Array.from(this.mainElem.querySelectorAll(this.stepContentSelector))

    this.init()
  }

  private init(): void {
    this.handlers()

    const mediaQueryDESKTOP = window.matchMedia(`(min-width:${BreakpointWidth.DESKTOP}px)`)
    mediaQueryDESKTOP.addListener((e) => this.breakpointChecker(e))
  }

  private breakpointChecker(e: MediaQueryListEvent): void {
    if (e.matches) {
      this.cropperPopupElem.classList.remove('popup--no-overlay')
    } else this.cropperPopupElem.classList.add('popup--no-overlay')
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

  private closePopupEvent(e): void {
    const popupId = e.detail

    if (popupId === 'selected-goods') {
      this.selectedElem.classList.remove('popup--open')
      this.toggleBtnText()
    }
  }

  private insertTags(tags: string): void {
    const splitTags = tags.split(' ')
    splitTags.forEach((tag: string) => {
      const preparedTag = tag.startsWith('#') ? tag : `#${tag}`

      const itemNode = document.createElement('li')
      const linkNode = document.createElement('a')

      linkNode.href = preparedTag
      linkNode.textContent = preparedTag

      itemNode.appendChild(linkNode)

      this.publicationHashtagsElem.appendChild(itemNode)
    })
  }

  private collectTotalPrice(): string {
    const goods: Element[] = [...this.selectedContentElem.querySelectorAll(this.itemGoodsSelector)]

    const totalPrice = goods.reduce((acc, elem) => {
      const priceElem = elem.querySelector(this.publicationItemPriceSelector)
      const price = Number(priceElem?.textContent?.trim()?.replace(' ', ''))

      if (price) {
        return acc + price
      }

      return acc
    }, 0)

    const fotmattedPrice = new Intl.NumberFormat('ru-RU').format(totalPrice)
    
    return String(fotmattedPrice)
  }

  private addSelectedGoods(): void {
    const selectedGoods: Element[] = [...this.selectedContentElem.querySelectorAll(this.publicationItemSelector)]
    selectedGoods.forEach((elem, index) => {
      const clonedElem = elem.cloneNode(true) as Element
      const descrElem = clonedElem.querySelector(this.publicationItemDescrSelector)
      
      if (descrElem) descrElem.remove()

      if (index % 2 === 0) {
        this.publicationSetItemsLeftElem.appendChild(clonedElem)
      } else {
        this.publicationSetItemsRightElem.appendChild(clonedElem)
      }

      const clonedForPopupElem = elem.cloneNode(true) as Element
      const cloneDescrElem = clonedForPopupElem.querySelector(this.publicationItemDescrSelector)
      
      if (cloneDescrElem) cloneDescrElem.remove()
      this.publicationItemsPopupContentElem.appendChild(clonedForPopupElem)
    })

    const galleryItems = Array.from(this.goodsGalleryElem.children)
    galleryItems.forEach(item => {
      this.publicationPreviewGalleryCardElem.appendChild(item.cloneNode(true))
    })
    this.publicationGoodsCountNumberElem.textContent = String(selectedGoods.length)
  }

  private createSlide(src: string): Node {
    const slideNode = document.createElement('div')
    slideNode.classList.add('swiper-slide')

    const imgNode = document.createElement('img')
    imgNode.src = src

    slideNode.appendChild(imgNode)

    return slideNode
  }

  private removeSelectedGoodsAndImg(): void {
    this.previewSwiper.destroy()
    this.swiperWrapperElem.innerHTML = ''

    this.publicationSetItemsLeftElem.innerHTML = ''
    this.publicationSetItemsRightElem.innerHTML = ''
    this.publicationItemsPopupContentElem.innerHTML = ''
    this.publicationPreviewGalleryCardElem.innerHTML = ''
  }

  private addSwiper() {
    const images = [...this.uploadFilesElem.children] as HTMLImageElement[]

    if (images) {
      images.forEach(({ src }) => {
        const slideNode = this.createSlide(src)
        this.swiperWrapperElem.appendChild(slideNode)
      })
    }

    try {
      this.previewSwiper = new CustomSwiper({
        target: this.swiperAddPublicationSelector,
      })
    } catch (error) {
      console.log(error)
    }
  }

  private fillPreview(data: IFillingFormData): void {
    this.publicationTitleElem.textContent = data['title-goods']
    this.publicationDescrElem.textContent = data.description
    this.insertTags(data.tags)

    this.publicationPriceCountElem.textContent = this.collectTotalPrice()
    this.addSelectedGoods()
    this.addSwiper()
  }

  public handleSubmit = (response): void => {
    if (response && response.status === httpStatus.Created) {
      this.publicationBtnElem.classList.remove('active')
      this.prevBtnElem.classList.remove('active')

      this.onChangeStep(StepsEnum.created)
      this.createdPopupElem.classList.add('popup--open')
      document.body.classList.add('overflow')
      
      // TODO добавить ссылку в попап (посмотреть публикацию)
    }
  }

  private publication(): void {
    // TODO проверить что уходят изображения которые именно обрезали

    this.fillingFormSubmitElem.click()
  }
  
  private handleStep() {
    if (this.currentStep === StepsEnum.preview) {
      const formData = new FormData(this.fillingFormElem)

      const preparedData = Array.from(formData.entries()).reduce((acc, [key, value]) => {
        acc[key] = value

        return acc
      }, {}) as IFillingFormData

      this.fillPreview(preparedData)
    }
  }

  private changeStep(variant: 'next' | 'prev'): void {
    const currentStepNumber = this.stepsArrElem.findIndex(elem => elem.classList.contains(`${this.mainSelector.substring(1)}__${this.currentStep}`))

    const stepOffset = variant === 'next' ? 1 : -1
    const newStepNumber = currentStepNumber + stepOffset

    this.stepsArrElem[currentStepNumber]?.classList.remove('active')
    this.stepsArrElem[newStepNumber]?.classList.add('active')

    this.currentStep = this.stepsMapArr[newStepNumber]?.[0]
    this.onChangeStep(this.currentStep)
    this.handleStep()

    if (variant === 'next') {
      this.nextBtnElem.disabled = true
      this.prevBtnElem.classList.add('active')

      if (newStepNumber > 0) {
        this.siteBtnElem.classList.remove('active')
        this.previewBtnElem.classList.remove('active')
        this.actionsWrapperElem.classList.remove(`${this.actionsWrapperSelector.substring(1)}--first-step`)
      }

      if (newStepNumber === 2) {
        this.nextBtnElem.classList.remove('active')
        this.publicationBtnElem.classList.add('active')
      }
    }

    if (variant === 'prev') {
      this.nextBtnElem.disabled = false
      this.nextBtnElem.classList.add('active')
      this.publicationBtnElem.classList.remove('active')

      if (newStepNumber === 0) {
        this.prevBtnElem.classList.remove('active')
        this.siteBtnElem.classList.add('active')
        this.previewBtnElem.classList.add('active')
        this.actionsWrapperElem.classList.add(`${this.actionsWrapperSelector.substring(1)}--first-step`)
      }

      if (newStepNumber === 1) {
        this.removeSelectedGoodsAndImg()
      }
    }
  }

  private createImgNode(name: string, className: string, src: string): Node {
    const imgNode = document.createElement('img')
    imgNode.src = src
    imgNode.alt = `preview-${name}`
    imgNode.className = className
    imgNode.dataset.id = `preview-${name}`

    return imgNode
  }

  private addImages(targetElement: HTMLInputElement): void {
    const files = targetElement.files || []

    // Устанавливаем максимальный размер файла (в байтах)
    const maxFileSize = 5 * 1024 * 1024 // 5 MB
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = (event) => {
          if (this.addedImgCount < 8) {
            const src = event.target?.result
            
            if (src && typeof src === 'string') {
              const imgNode = this.createImgNode(file.name, this.uploadFileImgsSelector.substring(1), src)
  
              this.uploadFilesElem.appendChild(imgNode)
              this.addedImgCount += 1
              this.uploadElem.classList.add('active')
              this.uploadFilesElem.classList.add('active')
              this.uploadInfoElem.classList.add('active')
              this.uploadSettingsElem.classList.add('active')
              this.uploadDescrElem.classList.add('hide')

              const previewImgNode = this.createImgNode(file.name, this.cropperImgSelector.substring(1), src)
              this.cropperImagesElem.appendChild(previewImgNode)
              const areaImgNode = this.createImgNode(file.name, 'cropper-publication__selected-img', src)
              this.cropperSelectedWrapperElem.appendChild(areaImgNode)

              if (this.addedImgCount === 8) {
                this.uploadInputElem.classList.add('input-text--disabled')
                targetElement.disabled = true
              }
            }
          }
        }

        if (file.size < maxFileSize) {
          reader.readAsDataURL(file)
        }
      }
    }

    this.uploadInputElem.classList.remove('active')
    document.body.classList.remove('overflow')
  }

  public checkValidFillingForm = (stateForm: IStateForm): void => {
    if (stateForm.isValid) {
      this.nextBtnElem.disabled = false
    } else this.nextBtnElem.disabled = true
  }

  private toggleUpload(e: Event): void {
    if (window.innerWidth >= BreakpointWidth.DESKTOP) {
      e.preventDefault()

      this.uploadInputElem.classList.toggle('active')
      document.body.classList.toggle('overflow')
    } else {
      this.uploadInputElem.classList.remove('active')
      document.body.classList.remove('overflow')
    }
  }

  private toggleCollapseText(): void {
    const currentText = this.selectedToggleElem.textContent?.trim()
    const newText = this.selectedToggleElem.dataset.text

    if (currentText && newText) {
      this.selectedToggleElem.textContent = newText
      this.selectedToggleElem.dataset.text = currentText
    }
  }

  private changeHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement
    
    if (targetElement.closest(this.mainSelector)) {
      return this.addImages(targetElement)
    }
  }

  private crop(): void {
    const croppedImg = this.currentCropper?.getCroppedCanvas().toDataURL('image/png')
    const previewImg = this.uploadFilesElem.querySelector(`[data-id="${this.currentCroppedImgId}"]`) as HTMLImageElement

    if (previewImg && croppedImg) {
      previewImg.src = croppedImg
    }
  }

  private selectCropImg(e: Event): void {
    const targetElement = e.target as HTMLInputElement
    const id = targetElement.dataset.id
    
    if (id) {
      Array.from(this.cropperImagesElem.children).forEach(child => {
        child.classList.remove('active')
      })
      targetElement.classList.add('active')

      if (this.currentCropper) {
        this.currentCropper.destroy()
      }

      const children = Array.from(this.cropperSelectedWrapperElem.children) as HTMLImageElement[]
      children.forEach((child: HTMLImageElement) => {
        if (child.dataset.id === id) {
          child.classList.add('active')

          const cropper = new Cropper(child, {
            zoomable: false,
          })
          this.currentCropper = cropper
          this.currentCroppedImgId = id
        } else {
          child.classList.remove('active')
        }
      })
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
      return this.changeStep('prev')
    }

    if (this.publicationBtnElem.contains(targetElement)) {
      return this.publication()
    }

    if (this.uploadInputElem.contains(targetElement)) {
      return this.toggleUpload(e)
    }

    if (this.uploadSettingsElem.contains(targetElement) && window.innerWidth >= BreakpointWidth.DESKTOP) {
      return this.cropperPopupElem.classList.remove('popup--no-overlay')
    }

    if (targetElement.closest(this.selectedCollapseSelector)) {
      return this.toggleCollapseText()
    }

    if (targetElement.closest(this.cropperImgSelector)) {
      return this.selectCropImg(e)
    }

    if (this.cropperBtnElem.contains(targetElement)) {
      return this.crop()
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    document.addEventListener('closePopup', e => this.closePopupEvent(e))
    document.addEventListener('change', e => this.changeHandler(e))
  }
}
