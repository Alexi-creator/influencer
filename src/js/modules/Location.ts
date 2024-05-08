export class Location {
  private selectorLocation: string

  private containerElem: HTMLElement

  constructor() {
    // this.selectorContainer = '.login'

    // const containerElem = document.querySelector(this.selectorContainer)
    // if (containerElem) this.containerElem = containerElem as HTMLElement

    // if (!this.btnSignInElem || !this.btnSignUpElem) {
    //   console.error(`No items found: ${this.selectorBtnSignIn}, ${this.selectorBtnSignUp}`)
      
    //   return
    // }

    // this.init()
  }

  private init() {
    this.handlers()
  }

  private clickHandler(e: Event) {

  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}