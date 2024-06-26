import '../common'

import { API_URLS, BreakpointWidth, HttpMethods } from '../constants'

import { Share } from '../modules/Share'
import { Autocomplete } from '../modules/Autocomplete'
import { Collapse } from '../modules/Collapse'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { Masonry } from '../modules/Masonry'
import { Tabs } from '../modules/Tabs'
import { RangeSlider } from '../modules/RangeSlider'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { Sort } from '../modules/Sort'
import { NumberFormatter } from '../utils/numberFormatter'
import { UserBoard } from '../modules/user-board'
import { CustomSwiper } from '../modules/CustomSwiper'
import { BtnShow } from '../modules/BtnShow'
import { Density } from '../modules/Density'
import { SyncCategories } from '../modules/SyncCategories'

window.addEventListener('load', () => {
  try {
    new Masonry({
      selectorContainer: '.user-board__form-posts .user-board__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 5,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Masonry({
      selectorContainer: '.user-board__form-followers .user-board__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 5,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'user-inner-autocomplete',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Share()
  } catch (error) {
    console.log(error)
  }
  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }
  try {
    new Tabs()
  } catch (error) {
    console.log(error)
  }
  try {
    new RangeSlider()
  } catch (error) {
    console.log(error)
  }

  try {
    new Density({
      selectorContent: '.user-board__goods',
      selectorActionContainer: '.user-board__actions-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-posts',
      selectorActionContainer: '.filter-actions',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-followers',
      selectorActionContainer: '.filter-actions',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-posts',
      selectorActionBtn: '.user-board__actions-filters-posts',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-followers',
      selectorActionBtn: '.user-board__actions-filters-followers',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Form(
      '.user-board__form', 
      API_URLS.mock.autocomplete,
      {
        method: HttpMethods.POST
      },
    )
  } catch (error) {
    console.log(error)
  }
  try {
    new ScrollIntoView()
  } catch (error) {
    console.log(error)
  }

  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }


  try {
    const parentElement = document.querySelector('.user-board__tabs') as HTMLElement
    const swiperElement = parentElement.querySelector('.user-board__tabs-swiper') as HTMLElement
    const prevBtn = parentElement.querySelector('.swiper-button-prev') as HTMLElement
    const nextBtn = parentElement.querySelector('.swiper-button-next') as HTMLElement 

    new UserBoard(
      new CustomSwiper({
        target: swiperElement,
        options: {
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 0,
          breakpoints: {
            420: {
              slidesPerView: 1.5,
            },
          },
        },
        breakMedia: BreakpointWidth.TABLET,
        btnsElements: {
          prevElement: prevBtn,
          nextElement: nextBtn,
        },
      }),
    )
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

  try {
    new BtnShow()
  } catch (error){
    console.log(error)
  }
  try {
    new SyncCategories()
  } catch (error) {
    console.log(error)
  }
  
})
