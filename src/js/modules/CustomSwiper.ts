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

interface ISwiperOptions {
  modules?: SwiperModule[];
  centeredSlides?: boolean;
  loop?: boolean;
  navigation?: {
    nextEl: string | HTMLElement
    prevEl: string | HTMLElement
  };
}

interface IConstructor {
  target: string | HTMLElement;
  options?: IOptions;
  breakMedia?: number;
  initialActionIndex?: number
  btnsElements?: {
    prevElement: HTMLElement | ''
    nextElement: HTMLElement | ''
  }
}

/**
 * Абстракция для создания и управления swiper
 */
export class CustomSwiper {
  target: string | HTMLElement
  options?: IOptions
  breakMedia?: number
  initialActionIndex?: number
  swiperOptions: ISwiperOptions
  
  swiper: Swiper | null
  matchMedia: MediaQueryList

  constructor({ target, options, breakMedia, initialActionIndex, btnsElements }: IConstructor) {
    this.target = target
    this.options = options
    this.initialActionIndex = initialActionIndex || 0 

    this.swiperOptions = {
      modules: [Navigation],
      centeredSlides: true,
      loop: false,
      navigation: {
        nextEl: btnsElements?.nextElement || '.swiper-button-next',
        prevEl: btnsElements?.prevElement || '.swiper-button-prev',

      },
      ...this.options
    }

    if (!this.target) return
    
    if (breakMedia) {
      this.matchMedia = window.matchMedia(`(min-width:${breakMedia}px)`)
      this.matchMedia.addListener((e) => this.breakpointChecker(e))
    }

    this.init()
  }

  private init() {
    this.startSlide()
  }

  public startSlide() {
    if (this.matchMedia?.matches) return
  
    this.swiper?.destroy()
    this.swiper = new Swiper(this.target, this.swiperOptions)   
    
    if (this.initialActionIndex) {
      this.swiper.slideTo(this.initialActionIndex)
    }
  }

  private breakpointChecker(e: MediaQueryListEvent) {
    if (e.matches) {
      this.swiper?.destroy()
    } else {
      this.startSlide()
    }
  }
}