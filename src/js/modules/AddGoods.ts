import { httpStatus } from '../constants'

/**
 * Добавление товара с другого сайта (для добавления публикации) во вкладки "пользовательские" и "все товары"
 */
export class AddGoods {
  private mainSelector: string
  private addBtnSelector: string
  private submitHiddenBtnSelector: string

  private uploadInputWrapperSelector: string
  private uploadImgSelector: string
  private uploadTextSelector: string

  private plugPreviewSelector: string
  private imgPreviewSelector: string

  private previewItemSelector: string
  private previewItemImgSelector: string
  private previewItemTitleSelector: string
  private previewItemPriceSelector: string
  private previewItemDescrSelector: string

  private confirmSelector: string
  private confirmCardSelector: string
  private confirmSubmitBtnSelector: string

  private resultListSelector: string
  private allTab: string
  private userTab: string

  private formElem: HTMLFormElement
  private addBtnElem: HTMLButtonElement
  private submitHiddenBtnElem: HTMLButtonElement

  private uploadInputWrapperElem: HTMLElement
  private uploadInputElem: HTMLInputElement
  private uploadImgElem: HTMLElement
  private uploadTextElem: HTMLElement

  private plugPreviewElem: HTMLElement
  private imgPreviewElem: HTMLElement

  private previewItemImgElem: HTMLImageElement
  private previewItemTitleElem: HTMLElement
  private previewItemPriceElem: HTMLElement
  private previewItemDescrElem: HTMLElement
  
  private confirmElem: HTMLElement
  private confirmCardElem: HTMLElement
  private confirmSubmitBtnElem: HTMLButtonElement

  private confirmPopupElem: HTMLElement
  private listItemTemplate: HTMLTemplateElement
  
  private allTabElem: HTMLElement
  private userTabElem: HTMLElement

  private hasUploadedImg: boolean
  private nameInputs: string[]
  
  private state: Record<string, string>

  constructor() {
    this.mainSelector = '.add-goods-from-site__form'
    this.addBtnSelector = `${this.mainSelector}-btn`
    this.submitHiddenBtnSelector = `${this.mainSelector}-submit-btn`

    this.uploadInputWrapperSelector = `${this.mainSelector}-field-upload-input`
    this.uploadImgSelector = `${this.mainSelector}-field-upload-img`
    this.uploadTextSelector = `${this.mainSelector}-field-upload-text`

    this.plugPreviewSelector = `${this.mainSelector}-field-preview-plug`
    this.imgPreviewSelector = `${this.mainSelector}-field-preview-img`

    this.previewItemSelector = '.publication-item'
    this.previewItemImgSelector = `${this.previewItemSelector}__img`
    this.previewItemTitleSelector = `${this.previewItemSelector}__title`
    this.previewItemPriceSelector = `${this.previewItemSelector}__price-number`
    this.previewItemDescrSelector = `${this.previewItemSelector}__descr`

    this.confirmSelector = '.confirm-add-goods'
    this.confirmCardSelector = `${this.confirmSelector}__card`
    this.confirmSubmitBtnSelector = `${this.confirmSelector}__submit-btn`

    this.resultListSelector = '.add-publication__content-results-list'
    this.allTab = `.add-publication__actions-all ${this.resultListSelector}`
    this.userTab = `.add-publication__actions-user ${this.resultListSelector}`

    const formElem = document.querySelector(this.mainSelector) as HTMLFormElement
    if (formElem) this.formElem = formElem
    const addBtnElem = this.formElem.querySelector(this.addBtnSelector) as HTMLButtonElement
    if (addBtnElem) this.addBtnElem = addBtnElem
    const submitHiddenBtnElem = this.formElem.querySelector(this.submitHiddenBtnSelector) as HTMLButtonElement
    if (submitHiddenBtnElem) this.submitHiddenBtnElem = submitHiddenBtnElem

    if (!this.formElem) return

    const uploadInputWrapperElem = this.formElem.querySelector(this.uploadInputWrapperSelector) as HTMLElement
    if (uploadInputWrapperElem) this.uploadInputWrapperElem = uploadInputWrapperElem
    const uploadInputElem = this.formElem.querySelector('input[name="add-image"]') as HTMLInputElement
    if (uploadInputElem) this.uploadInputElem = uploadInputElem
    const uploadImgElem = this.formElem.querySelector(this.uploadImgSelector) as HTMLElement
    if (uploadImgElem) this.uploadImgElem = uploadImgElem
    const uploadTextElem = this.formElem.querySelector(this.uploadTextSelector) as HTMLElement
    if (uploadTextElem) this.uploadTextElem = uploadTextElem
    
    const plugPreviewElem = this.formElem.querySelector(this.plugPreviewSelector) as HTMLElement
    if (plugPreviewElem) this.plugPreviewElem = plugPreviewElem
    const imgPreviewElem = this.formElem.querySelector(this.imgPreviewSelector) as HTMLElement
    if (imgPreviewElem) this.imgPreviewElem = imgPreviewElem

    const previewItemImgElem = this.formElem.querySelector(this.previewItemImgSelector) as HTMLImageElement
    if (previewItemImgElem) this.previewItemImgElem = previewItemImgElem
    const previewItemTitleElem = this.formElem.querySelector(this.previewItemTitleSelector) as HTMLElement
    if (previewItemTitleElem) this.previewItemTitleElem = previewItemTitleElem
    const previewItemPriceElem = this.formElem.querySelector(this.previewItemPriceSelector) as HTMLElement
    if (previewItemPriceElem) this.previewItemPriceElem = previewItemPriceElem
    const previewItemDescrElem = this.formElem.querySelector(this.previewItemDescrSelector) as HTMLElement
    if (previewItemDescrElem) this.previewItemDescrElem = previewItemDescrElem

    const confirmElem = document.querySelector(this.confirmSelector) as HTMLElement
    if (confirmElem) this.confirmElem = confirmElem
    const confirmCardElem = this.confirmElem.querySelector(this.confirmCardSelector) as HTMLElement
    if (confirmCardElem) this.confirmCardElem = confirmCardElem
    const confirmSubmitBtnElem = this.confirmElem.querySelector(this.confirmSubmitBtnSelector) as HTMLButtonElement
    if (confirmSubmitBtnElem) this.confirmSubmitBtnElem = confirmSubmitBtnElem

    const confirmPopupElem = document.getElementById('popup-confirm-from-site') as HTMLElement
    if (confirmPopupElem) this.confirmPopupElem = confirmPopupElem

    const listItemTemplate = document.getElementById('list-item-template') as HTMLTemplateElement
    if (listItemTemplate) this.listItemTemplate = listItemTemplate
    const allTabElem = document.querySelector(this.allTab) as HTMLElement
    if (allTabElem) this.allTabElem = allTabElem
    const userTabElem = document.querySelector(this.userTab) as HTMLElement
    if (userTabElem) this.userTabElem = userTabElem

    this.hasUploadedImg = false

    // TODO в константы
    this.nameInputs = ['link-goods', 'name-goods', 'price-goods']
    this.state = {
      'link-goods': '',
      'name-goods': '',
      'price-goods': '',
    }

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private createListItemNode(id: string): Node {
    const clone = this.listItemTemplate.content.cloneNode(true) as HTMLElement
    const liElement = clone.querySelector('li')
    liElement?.setAttribute('data-id', id) // TODO подставить значение с бэка

    const targetElem = this.imgPreviewElem.firstElementChild

    if (targetElem) {
      const copyNode = targetElem.cloneNode(true)
      liElement?.insertBefore(copyNode, liElement.firstChild)
    }

    return clone
  }

  public handleSubmit = (response, data): void => {
    console.log('response', response)
    console.log('data', data)

    // if (response?.status === httpStatus.Created) {
      console.log('success')
      this.confirmPopupElem.classList.remove('popup--open')
      document.body.classList.remove('overflow')

      const clone = this.listItemTemplate.content.cloneNode(true) as HTMLElement
      const liElement = clone.querySelector('li')
      liElement?.setAttribute('data-id', 'test-backend') // TODO подставить значение с бэка

      const copyNodeForAllTab = this.createListItemNode('test-backend')
      this.allTabElem.appendChild(copyNodeForAllTab)
      
      const copyNodeForUserTab = this.createListItemNode('test-backend')
      this.userTabElem.appendChild(copyNodeForUserTab)

      this.clearForm()
      this.imgPreviewElem.classList.remove('active')
      this.plugPreviewElem.classList.remove('hide')

      const currentText = this.uploadTextElem.textContent
      const dataText = this.uploadTextElem.dataset.text
      this.uploadTextElem.textContent = dataText ||''
      this.uploadTextElem.dataset.text = currentText || ''

      this.uploadInputWrapperElem.classList.remove('hide')
      this.uploadImgElem.classList.remove('active')
      this.uploadTextElem.classList.remove('active')

      this.hasUploadedImg = false
    // }

    this.confirmSubmitBtnElem.classList.remove('active')
  }

  private clearForm(): void {
    Object.keys(this.state).forEach(key => {
      this.state[key] = ''
    })

    const inputElems = [...this.formElem.querySelectorAll('input[type="text"]')] as HTMLInputElement[]
    inputElems.forEach(input => {
      input.value = ''
    })
  }

  private addImage(src: string): void {
    const createImgNode = (): Node => {
      const imgNode = document.createElement('img')
      imgNode.src = src
      imgNode.alt = 'from-site'

      return imgNode
    }

    this.applyState()

    const previewUploadImg = createImgNode()
    this.uploadInputWrapperElem.classList.add('hide')

    this.uploadImgElem.classList.add('active')
    this.uploadImgElem.innerHTML = ''
    this.uploadImgElem.appendChild(previewUploadImg)

    if (!this.hasUploadedImg) {
      const currentText = this.uploadTextElem.textContent
      const dataText = this.uploadTextElem.dataset.text
      this.uploadTextElem.textContent = dataText ||''
      this.uploadTextElem.dataset.text = currentText || ''

      this.hasUploadedImg = true
    }

    this.uploadTextElem.classList.add('active')

    this.previewItemImgElem.innerHTML = ''
    const previewItemImg = createImgNode()
    this.previewItemImgElem.appendChild(previewItemImg)

    this.plugPreviewElem.classList.add('hide')
    this.imgPreviewElem.classList.add('active')
  }

  private selectImage(fileInput: HTMLInputElement): void {
    // Устанавливаем максимальный размер файла (в байтах)
    const maxFileSize = 5 * 1024 * 1024 // 5 MB

    const files = fileInput.files || []
    const imgFile = files[0]

    if (imgFile.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const src = event.target?.result

        if (src && typeof src === 'string') {
          this.addImage(src)
        }
      }

      if (imgFile.size < maxFileSize) {
        reader.readAsDataURL(imgFile)
      }
    }
  }

  private applyState() {
    // const { 'link-goods': link, 'name-goods': name, 'price-goods': price } = this.state
    const { 'name-goods': name, 'price-goods': price } = this.state

    this.previewItemTitleElem.textContent = name
    this.previewItemPriceElem.textContent = price
  }

  private setState(targetElement: HTMLInputElement): void {
    const name = targetElement.name
    const value = targetElement.value

    this.state = { ...this.state, [name]: value }

    this.applyState()
  }

  private copyCard(): void {
    const targetElem = this.imgPreviewElem.firstElementChild

    if (targetElem) {
      const copyNode = targetElem.cloneNode(true)
      this.confirmCardElem.innerHTML = ''
      this.confirmCardElem.appendChild(copyNode)
    }
  }

  private submitForm(): void {
    this.confirmSubmitBtnElem.classList.add('active')
    this.submitHiddenBtnElem.click()
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    if (this.uploadTextElem.contains(targetElement)) {
      this.uploadInputElem.click()
    }

    if (this.addBtnElem.contains(targetElement)) {
      this.copyCard()
    }

    if (this.confirmSubmitBtnElem.contains(targetElement)) {
      this.submitForm()
    }
  }

  private changeHandler(e: Event): void {
    const targetElement = e.target as HTMLInputElement    

    if (this.uploadInputElem.contains(targetElement)) {
      this.selectImage(targetElement)
    }
    
    if (this.nameInputs.includes(targetElement.name)) {
      this.setState(targetElement)
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e: MouseEvent) => this.clickHandler(e))
    this.formElem.addEventListener('change', e => this.changeHandler(e))
  }
}
