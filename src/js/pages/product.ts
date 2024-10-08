import '../common'

import { BreakpointWidth } from '../constants'
import { NumberFormatter } from '../utils/numberFormatter'

import { CustomSwiper } from '../modules/CustomSwiper'
import { Product } from '../modules/Product'
import { LoaderItems } from '../modules/LoaderItems'

window.addEventListener('load', () => {
  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }

  try {
    new Product({
      selectSizeId: 'size',
      selectAmountId: 'amount',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new LoaderItems({
      resourceUrl: '/test',
      wrapperId: 'spList',
      btnId: 'spBtnLoad',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new LoaderItems({
      resourceUrl: '/test2',
      wrapperId: 'publicationList',
      btnId: 'publicationBtnLoad',
    })
  } catch (error) {
    console.log(error)
  }
  
  try {
    document.querySelectorAll('.joint-purchases-card__slider').forEach(swiper => {
      const swiperElement = swiper.querySelector('.swiper-joint-purchases') as HTMLElement
      const prevBtn = swiper.querySelector('.swiper-button-prev') as HTMLElement
      const nextBtn = swiper.querySelector('.swiper-button-next') as HTMLElement      
  
      new CustomSwiper({
        target: swiperElement,
        options: {
          slidesPerView: 2,
          centeredSlides: false,
          spaceBetween: 12,
          breakpoints: {
            [BreakpointWidth.TABLET]: {
              slidesPerView: 3.5,
            },
            [BreakpointWidth.DESKTOP]: {
              slidesPerView: 2.5,
            },
            [BreakpointWidth.FULLHD]: {
              slidesPerView: 4.5,
            },
          },
        },
        btnsElements: {
          prevElement: prevBtn,
          nextElement: nextBtn,
        },
      })
    })
  } catch (error) {
    console.log(error)
  }
})
