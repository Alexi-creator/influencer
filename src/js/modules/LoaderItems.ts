import { request } from '../utils/request'

interface IConstructor {
  resourceUrl: string
  wrapperId: string
  btnId: string
}

/**
 * LoaderItems - общий класс для подгрузки элементов в список, например товаров
 */
export class LoaderItems {
  private resourceUrl: string
  private wrapperId: string
  private btnId: string

  private wrapperIdElem: Element
  private btnIdElem: Element

  constructor({ resourceUrl, wrapperId, btnId }: IConstructor) {
    this.resourceUrl = resourceUrl
    this.wrapperId = wrapperId
    this.btnId = btnId

    const wrapperIdElem = document.getElementById(this.wrapperId)
    if (wrapperIdElem) this.wrapperIdElem = wrapperIdElem
    const btnIdElem = document.getElementById(this.btnId)
    if (btnIdElem) this.btnIdElem = btnIdElem

    if (!this.wrapperIdElem && !this.btnIdElem) return
    
    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private async load(): Promise<void> {
    const res = await request(this.resourceUrl, {})
    console.log('res', res)
    
  }

  private clickHandler(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement

    if (this.btnIdElem.contains(targetElement)) {
      console.log('load btn')

      this.load()
    }
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
