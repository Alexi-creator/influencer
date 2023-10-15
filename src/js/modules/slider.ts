import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import { SwiperModule } from 'swiper/types/shared'

// Абстракция для создания и управления slider swiper

interface IOptions extends Partial<{
  slidesPerView: number | 'auto'
  spaceBetween: number
  centeredSlides: boolean
  loop: boolean
  breakpoints: Record<number, IOptions>
}> {}

interface IConstructorSlider {
  modules?: SwiperModule[];
  centeredSlides?: boolean;
  loop?: boolean;
  navigation?: {
    nextEl: string
    prevEl: string
  };
}

export class Slider {
  selector: string
  slider: Swiper | null
  options?: IOptions
  matchMedia: MediaQueryList
  breakMedia: number
  constructorSlider: IConstructorSlider

  constructor(selector: string, options?: IOptions, breakMedia?: number) {
    this.selector = selector
    this.options = options

    this.constructorSlider = {
      modules: [Navigation],
      centeredSlides: true,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      ...this.options
    }

    if (breakMedia) {
      this.matchMedia = window.matchMedia(`(min-width:${breakMedia}px)`)
      this.matchMedia.addListener((e) => this.breakpointChecker(e))
    }

    if (this.selector) {
      this.init()
    }
  }

  init() {
    if (this.matchMedia?.matches) return
    
    this.slider = new Swiper(this.selector, this.constructorSlider)
    this.handlers()
  }

  breakpointChecker(e: MediaQueryListEvent) {
    if (e.matches) {
      this.slider?.destroy()
    } else {
      this.slider = new Swiper(this.selector, this.constructorSlider)
    }
  }

  handlers() {

  }
}