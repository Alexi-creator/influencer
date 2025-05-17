/**
 * Управление блоком авторизации / регистрации
 */
export class Login {
  private selectorContainer: string
  private selectorBtnSignIn: string
  private selectorBtnSignUp: string

  private containerElem: HTMLElement
  private btnSignInElem: HTMLElement
  private btnSignUpElem: HTMLElement

  constructor() {
    this.selectorContainer = '.login'
    this.selectorBtnSignIn = '.login__choice-sign-in'
    this.selectorBtnSignUp = '.login__choice-sign-up'

    const containerElem = document.querySelector(this.selectorContainer)
    if (containerElem) this.containerElem = containerElem as HTMLElement
    const btnSignInElem = document.querySelector(this.selectorBtnSignIn)
    if (btnSignInElem) this.btnSignInElem = btnSignInElem as HTMLElement
    const btnSignUpElem = document.querySelector(this.selectorBtnSignUp)
    if (btnSignUpElem) this.btnSignUpElem = btnSignUpElem as HTMLElement

    if (!this.btnSignInElem || !this.btnSignUpElem) {
      console.error(`No items found: ${this.selectorBtnSignIn}, ${this.selectorBtnSignUp}`)
      
      return
    }

    this.init()
  }

  private init() {
    this.handlers()
  }

  private toggle(targetElement: HTMLElement) {
    if (targetElement.closest(this.selectorBtnSignIn)) {
      this.containerElem.classList.remove(`${this.selectorContainer.substring(1)}--sign-up`)
      this.containerElem.classList.add(`${this.selectorContainer.substring(1)}--sign-in`)
    } else {
      this.containerElem.classList.remove(`${this.selectorContainer.substring(1)}--sign-in`)
      this.containerElem.classList.add(`${this.selectorContainer.substring(1)}--sign-up`)
    }
  }

  private clickHandler(e: Event) {
    const targetElement = e.target as HTMLElement

    if (targetElement.closest(this.selectorBtnSignIn) || targetElement.closest(this.selectorBtnSignUp)) {
      this.toggle(targetElement)
    }
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}