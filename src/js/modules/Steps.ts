import { StepsEnum } from '../constants/steps'

/**
 * Steps, отвечает за отображение текущего процесса (н-р на странице добавления публикации).
 */
export class Steps {
  private mainSelector: string
  private itemSelector: string
  private currentSelector: string
  private passedSelector: string
  private currentNameStep: StepsEnum
  private currentNumberStep: number

  public stepsMap: Map<StepsEnum, HTMLElement>

  constructor() {
    this.mainSelector = '.steps'
    this.itemSelector = `${this.mainSelector}__item`
    this.currentSelector = `${this.mainSelector}__item--current`
    this.passedSelector = `${this.mainSelector}__item--passed`

    const mainElem = document.querySelector(this.mainSelector) as HTMLElement
    if (!mainElem) console.error(`this selector: ${this.mainSelector} has not been founded!`)

    this.stepsMap = new Map()
    this.currentNumberStep = 0

    this.init()
  }

  private init(): void {
    const stepsElem: HTMLElement[] = Array.from(document.querySelectorAll(this.itemSelector))

    stepsElem.forEach((elem, index) => {
      const nameStep = elem.dataset.step as StepsEnum
      this.stepsMap.set(nameStep, elem)

      const hasCurrentSelector = elem.classList.contains(this.currentSelector.substring(1))

      if (!this.currentNameStep && hasCurrentSelector) {
        this.currentNameStep = nameStep
        this.currentNumberStep = index
      }
    })
    this.selected(this.currentNameStep)
  }

  public selected = (nameStep: StepsEnum): void => {
    this.currentNameStep = nameStep
    const stepsArr = Array.from(this.stepsMap)

    this.currentNumberStep = stepsArr.findIndex(elem => elem[0] === nameStep)

    stepsArr.forEach(([name, elem], index) => {
      if (name === nameStep) {
        elem.classList.add(this.currentSelector.substring(1))
      } else {
        elem.classList.remove(this.currentSelector.substring(1))
      }
      
      if (this.currentNumberStep > index) {
        elem.classList.add(this.passedSelector.substring(1))
      }
    })
  }
}
