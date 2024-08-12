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

  changeEvent: Event

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

    this.changeEvent = new Event('change', { bubbles: true })

    this.init()
  }

  private init() {
    this.handlers()
    this.initSliders()
  }

  private changeSlider(slider: SliderInstance, e: [string, string]) {
    const [startVal, endVal] = e
    const settingsSlider =  this.allSliders.get(slider.target)

    if (settingsSlider && settingsSlider.inputsElem) {
      const [startInputElem, endInputElem] = settingsSlider.inputsElem

      let changeMin = false
      let changeMax = false

      if (startInputElem.value !== startVal.split('.')[0]) {
        changeMin = true
      }

      if (endInputElem.value !== endVal.split('.')[0]) {
        changeMax = true
      }

      startInputElem.value = startVal.split('.')[0]
      endInputElem.value = endVal.split('.')[0]

      if (changeMin) startInputElem.dispatchEvent(this.changeEvent)
      if (changeMax) endInputElem.dispatchEvent(this.changeEvent)
    }
  }

  private changeInputs(e: Event) {
    const currentInputElem = e.target as HTMLInputElement
    const isMaxInput = currentInputElem.classList.contains('range__input-max')
    const isMinInput = currentInputElem.classList.contains('range__input-min')
    
    const value = currentInputElem.value
    const correctValue = Number(value.replace(/^0+|[^0-9]/g, ''))

    const parentSlider = currentInputElem.closest(this.selectorParent) as HTMLElement
    const slider = parentSlider.querySelector(this.selectorSlider) as HTMLElement

    if (slider) {
      const currentSlider = this.allSliders.get(slider)
      const currentEntitySlider = currentSlider?.entitySlider
      const initOptions = currentSlider?.initOptions

      if (currentEntitySlider && initOptions) {     
        const [startValue, endValue] = currentEntitySlider.get() as string[]
        const [min, max] = Object.values(initOptions.range)
        const isMinMaxValidValue = (correctValue <= max && correctValue >= min)

        if (isMaxInput) {
          if (isMinMaxValidValue) {
            if (correctValue < Number(startValue.split('.')[0])) {
              currentInputElem.value = String(min)
              currentSlider?.entitySlider?.set([min, min])
  
              const startInput = currentSlider?.inputsElem?.[0] as HTMLInputElement
              startInput.value = String(min)
            } else {
              currentInputElem.value = String(correctValue)
              currentSlider?.entitySlider?.set([Number(startValue.split('.')[0]), correctValue])
            }
          } else {
            if (correctValue > max) {
              currentInputElem.value = String(max)
              currentSlider?.entitySlider?.set([Number(startValue), max])
            }

            if (correctValue < min) {
              currentInputElem.value = String(correctValue)
              currentSlider?.entitySlider?.set([min, Number(endValue)])

              const startInput = currentSlider?.inputsElem?.[0] as HTMLInputElement
              startInput.value = String(min)
            }
          }
        }

        if (isMinInput) {
          if (isMinMaxValidValue) {
            if (correctValue > Number(endValue.split('.')[0])) {
              currentInputElem.value = String(correctValue)
              currentSlider?.entitySlider?.set([correctValue, correctValue])
              const endInput = currentSlider?.inputsElem?.[1] as HTMLInputElement
              endInput.value = String(correctValue)
            } else {
              currentInputElem.value = String(correctValue)
              currentSlider?.entitySlider?.set([correctValue, Number(endValue.split('.')[0])])
            }
          } else {
            if (correctValue > max) {
              currentInputElem.value = String(max)
              currentSlider?.entitySlider?.set([max, max])

              const endInput = currentSlider?.inputsElem?.[1] as HTMLInputElement
              endInput.value = String(max)
            }

            if (correctValue < min) {
              currentInputElem.value = String(correctValue)
              currentSlider?.entitySlider?.set([min, Number(endValue)])
            }
          }
        }
      }
    }
  }

  private initSliders() {
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

  private changeMinMaxValue(inputElem: HTMLInputElement, minMax: 'min' | 'max') {
    const value = Number(inputElem.value)
    const parent = inputElem.closest(this.selectorParent)
    const sliderElem = parent?.querySelector(this.selectorSlider) as HTMLElement
    const slider = this.allSliders.get(sliderElem)
    const entitySlider = slider?.entitySlider

    if (entitySlider) {
      const sliderValues = entitySlider.get()
      const start = Number(sliderValues[0].split('.')[0])
      const end = Number(sliderValues[1].split('.')[0])

      if (minMax === 'max' && (value !== end)) {
        inputElem.value = String(end)
      }

      if (minMax === 'min' && (value !== start)) {
        inputElem.value = String(start)
      }
    }
  }

  private changeHandler(e: Event) {
    const inputElem = e.target as HTMLInputElement

    if (inputElem.closest(this.selectorMaxInput)) {
      this.changeMinMaxValue(inputElem, 'max')
    }

    if (inputElem.closest(this.selectorMinInput)) {
      this.changeMinMaxValue(inputElem, 'min')
    }
  }

  private handlers() {
    document.addEventListener('change', (e: Event) => this.changeHandler(e))
  }
}