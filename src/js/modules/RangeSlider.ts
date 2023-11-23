import noUiSlider from 'nouislider'

type SliderInstance = ReturnType<typeof noUiSlider.create>

interface IOptions {
  start: number[],
  connect?: boolean,
  range: {
    'min': number,
    'max': number
  },
  step: number
}

interface ISettingsSlider {
  entitySlider?: SliderInstance
  initOptions: IOptions
  inputsElem?: [HTMLInputElement, HTMLInputElement]
}


/**
 * Абстракция для создания и управления range slider (ползунок диапозон значений)
 */
export class RangeSlider {
  selectorParent: string
  selectorSlider: string
  selectorMinInput: string
  selectorMaxInput: string

  allSliders: Map<HTMLElement, ISettingsSlider>

  constructor() {
    this.selectorParent = '.range'
    this.selectorSlider = '.range__slider'
    this.selectorMinInput = '.range__input-min'
    this.selectorMaxInput = '.range__input-max'

    this.allSliders = new Map<HTMLElement, ISettingsSlider>()

    const allSlidersElement = document.querySelectorAll<HTMLElement>(this.selectorParent)

    if (allSlidersElement.length === 0) return    

    allSlidersElement.forEach(slider => {
      const minValueElem = slider.querySelector<HTMLInputElement>(this.selectorMinInput)
      const maxValueElem = slider.querySelector<HTMLInputElement>(this.selectorMaxInput)
      const sliderElem = slider.querySelector<HTMLElement>(this.selectorSlider)     

      const startVal = Number(minValueElem?.value) ?? 0
      const endVal = Number(maxValueElem?.value) ?? 0
      const min = Number(minValueElem?.dataset.min)
      const max = Number(maxValueElem?.dataset.max)
      const step = Number(sliderElem?.dataset.step)

      if (!sliderElem || !minValueElem || !maxValueElem) {
        throw new Error(`this slider: , ${slider}, don't contain min max value!`)
      }

      minValueElem.addEventListener('input', (e) => this.changeInputs(e))
      maxValueElem.addEventListener('input', (e) => this.changeInputs(e))

      this.allSliders.set(sliderElem, {
        initOptions: {
          start: [startVal, endVal],
          range: {
            'min': min,
            'max': max,
          },
          step: step || 1000,
          connect: true,
        },
        inputsElem: [minValueElem, maxValueElem]
      })
    })

    this.init()
  }

  init() {
    this.initSliders()
  }

  changeSlider(slider: SliderInstance, e: [string, string]) {
    const [startVal, endVal] = e
    const settingsSlider =  this.allSliders.get(slider.target)

    if (settingsSlider && settingsSlider.inputsElem) {
      const [startInputElem, endInputElem] = settingsSlider.inputsElem
      startInputElem.value = startVal.split('.')[0]
      endInputElem.value = endVal.split('.')[0]
    }
  }

  changeInputs(e: Event) {
    const inputElem = e.target as HTMLInputElement
    const value = inputElem.value
    const correctValue = value.replace(/[^0-9]/g, '')
    inputElem.value = correctValue

    const parentSlider = inputElem.closest(this.selectorParent) as HTMLElement
    const slider = parentSlider.querySelector(this.selectorSlider) as HTMLElement

    if (slider) {
      // нужно проверять меньше конечное чем начальное и наоборот
      // убрать тестовый хардкод с 0 значением
      this.allSliders.get(slider)?.entitySlider?.set([0, Number(correctValue)])
    }
  }

  initSliders() {
    this.allSliders.forEach((val, slider) => {    
      const entitySlider = noUiSlider.create(slider, { ...val.initOptions })

      const settingsSlider = this.allSliders.get(slider)
      if (settingsSlider) {
        this.allSliders.set(slider, { ...settingsSlider, entitySlider })
      }
      
      entitySlider.on('change', (e) => {
        this.changeSlider(entitySlider, e as [string, string])
      })
    })
  }
}