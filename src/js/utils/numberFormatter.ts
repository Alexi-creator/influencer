export class NumberFormatter {
  private numberElements: NodeListOf<HTMLElement>

  constructor() {
    this.numberElements = document.querySelectorAll('.number')
    
    if (this.numberElements) {
      this.init()
    }
  }

  private init() {
    this.formatNumbers()
  }

  formatNumbers(): void {
    this.numberElements.forEach((element) => {
      const originalNumber = parseFloat(element.textContent!)
      const formattedNumber = originalNumber.toLocaleString('ru')
      element.textContent = formattedNumber
    })
  }
}
