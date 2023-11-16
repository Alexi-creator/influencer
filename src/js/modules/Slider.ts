import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import { SwiperModule } from 'swiper/types/shared'

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

interface IConstructor {
  selector: string;
  options?: IOptions;
  breakMedia?: number;
  initialActionIndex?: number
}

/**
 * Абстракция для создания и управления slider swiper
 */
export class Slider {
  selector: string
  options?: IOptions
  breakMedia?: number
  initialActionIndex?: number
  
  slider: Swiper | null
  matchMedia: MediaQueryList

  constructorSlider: IConstructorSlider

  constructor({ selector, options, breakMedia, initialActionIndex }: IConstructor) {
    this.selector = selector
    this.options = options
    this.initialActionIndex = initialActionIndex || 0

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
    this.startSlide()
    this.handlers()
  }

  startSlide() {
    if (this.matchMedia?.matches) return
  
    this.slider?.destroy()
    this.slider = new Swiper(this.selector, this.constructorSlider)
    
    if (this.initialActionIndex) {
      this.slider.slideTo(this.initialActionIndex)
    }
  }

  breakpointChecker(e: MediaQueryListEvent) {
    if (e.matches) {
      this.slider?.destroy()
    } else {
      this.startSlide()
    }
  }

  handlers() {

  }
}