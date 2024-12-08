import { request } from '../utils'

/**
 * Comments, отвечает за комментарии (лайк и ответ).
 */
export class Comments {
  private commentSelector: string
  private actionsSelector: string
  private likeSelector: string
  private answerBtnSelector: string
  private countSelector: string
  private answerWrapperSelector: string
  private sendAnswerSelector: string
  private answerNewSelector: string

  private templateAnswerId: string
  private templateAnswerElem: HTMLTemplateElement
  
  private url: string
  private isAuth: boolean

  constructor(url: string) {
    if (!url) {
      console.error('Url not passed to Сomments.ts !!!')
      
      return
    }

    this.commentSelector = '.comments__item'
    this.actionsSelector = `${this.commentSelector}-actions`
    this.likeSelector = `${this.commentSelector}-actions-like`
    this.answerBtnSelector = `${this.commentSelector}-actions-btn`
    this.countSelector = `${this.commentSelector}-actions-count`
    this.answerWrapperSelector = `${this.commentSelector}-answer-wrapper`
    this.answerNewSelector = `${this.commentSelector}-answer-new`
    this.sendAnswerSelector = `${this.commentSelector}-answer-new-btn`

    this.templateAnswerId = '#answer-template'

    const templateAnswerElem = document.querySelector(this.templateAnswerId) as HTMLTemplateElement
    if (templateAnswerElem) this.templateAnswerElem = templateAnswerElem

    this.url = url
    this.isAuth = document.documentElement.classList.contains('isAuth')

    this.init()
  }

  private init(): void {
    this.handlers()
  }

  private createAnswerNode(): Node {
    return this.templateAnswerElem.content.cloneNode(true)
  }

  private insertAnswerBlock(targetElement: HTMLElement): void {
    const parentElem = targetElement.closest(this.commentSelector)
    const answerElem = parentElem?.querySelector(this.answerWrapperSelector)

    const newAnswerElem = answerElem?.querySelector(`:scope > ${this.answerNewSelector}`)

    if (newAnswerElem) {
      newAnswerElem.remove()

      return
    }

    const newNode = this.createAnswerNode()

    if (answerElem) {
      if (answerElem.firstChild) {
        answerElem.insertBefore(newNode, answerElem.firstChild)
      } else {
        answerElem.appendChild(newNode)
      }
    }
  }

  private async sendAnswer(targetElement: HTMLElement): Promise<void> {
    const parentElem = targetElement.closest(this.answerNewSelector)
    const textAreaElem = parentElem?.querySelector('textarea')

    // TODO доделать отправку как будет готов бэк
    if (textAreaElem) {
      const value = textAreaElem.value
      // request(`${this.url}`, {})
      console.log('value', value)
    }
  }

  private changeCount(isFavorite: boolean, btn: HTMLElement): void {
    const parentElem = btn.closest(this.actionsSelector)
    const countElem = parentElem?.querySelector(this.countSelector)
    
    if (countElem) {
      const currentCount = Number(countElem.innerHTML.trim())
      const newCount = isFavorite ? currentCount - 1 : currentCount + 1
      
      countElem.innerHTML = String(newCount)
    }
  }

  private async likeAction(btn: HTMLElement): Promise<void> {
    const isFavorite = btn.classList.contains(`${this.likeSelector.substring(1)}--favorite`)
    this.changeCount(isFavorite, btn)

    btn.classList.toggle(`${this.likeSelector.substring(1)}--favorite`)
    
    const { status } = await request(`${this.url}`, {})

    if (status === 200) {
      console.log('like success')
    }
  }

  private clickHandler(e: Event): void {
    const targetElement = e.target as HTMLElement
    
    if (this.isAuth) {
      if (targetElement.closest(this.answerBtnSelector)) {
        this.insertAnswerBlock(targetElement)
  
        return
      }

      if (targetElement.closest(this.sendAnswerSelector)) {
        this.sendAnswer(targetElement)

        return
      }
  
      const btn = targetElement.closest(this.likeSelector) as HTMLElement
  
      if (btn) {
        this.likeAction(btn)
      }
    }
    
  }

  private handlers(): void {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
