import noUiSlider from 'nouislider'

interface IOptions {
  start: number[],
  connect?: boolean,
  range: {
    'min': number,
    'max': number
  },
}

/**
 * Абстракция для создания и управления range slider (ползунок диапозон значений)
 */
export class RangeSlider {
  selectorSlider: string

  allSliders: Map<HTMLElement, IOptions>

  constructor() {
    this.selectorSlider = '.range'
    this.allSliders = new Map<HTMLElement, IOptions>()

    const allSlidersElement = document.querySelectorAll<HTMLElement>(this.selectorSlider)

    if (allSlidersElement.length === 0) return    

    allSlidersElement.forEach(slider => {
      const minValueElem = slider.querySelector<HTMLInputElement>('.range__input-min')
      const maxValueElem = slider.querySelector<HTMLInputElement>('.range__input-max')
      const sliderElem = slider.querySelector<HTMLElement>('.range__slider')

      const startVal = Number(minValueElem?.value) ?? 0
      const endVal = Number(maxValueElem?.value) ?? 0
      const min = Number(minValueElem?.dataset.min)
      const max = Number(maxValueElem?.dataset.max)

      // if (!min || !max || !sliderElem) {
      if (!sliderElem) {
        throw new Error(`this slider: , ${slider}, don't contain min max value!`)

        return
      }

      this.allSliders.set(sliderElem, {
        start: [startVal, endVal],
        range: {
          'min': min,
          'max': max,
        },
      })
    })
    this.init()
  }

  init() {
    this.initSliders()
  }

  initSliders() {
    this.allSliders.forEach((options, slider) => {    
      noUiSlider.create(slider, { connect: true, ...options })
    })
  }
}