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
import { UserBoard } from '../modules/UserBoard'
import { CustomSwiper } from '../modules/CustomSwiper'
import { BtnShow } from '../modules/BtnShow'
import { Density } from '../modules/Density'
import { CustomIntersectionObserver } from '../modules/CustomIntersectionObserver'
import { observerBrandCallback } from '../modules/observerBrandCallback'
import { Ticker } from '../modules/Ticker'
import { PreviewToolbarAction } from '../modules/PreviewToolbarAction'

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
    new Masonry({
      selectorContainer: '.user-board__form-subscriptions-sp .user-board__form-filter-filters',
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
      selectorContainer: '.user-board__form-subscriptions-tff .user-board__form-filter-filters',
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
      selectorContainer: '.user-board__form-subscriptions-bloggers .user-board__form-filter-filters',
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
      selectorContainer: '.user-board__form-subscriptions-shops .user-board__form-filter-filters',
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
      selectorContainer: '.user-board__form-likes-goods .user-board__form-filter-filters',
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
      selectorContainer: '.user-board__form-likes-publications .user-board__form-filter-filters',
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
    const targetElement = document.querySelector('.user-board__tabs') as HTMLElement

    new CustomIntersectionObserver({
      element: targetElement,
      callback: observerBrandCallback,
      options: {
        mobileRootMargin: '-60px 0px 0px',
        desktopRootMargin: '-160px 0px 0px',
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
      selectorContent: '.cards-with-menu--subscriptions-tff',
      selectorActionContainer: '.user-board__actions-subscriptions-tff',
    })
  } catch (error) {
    console.log(error)
  }
  
  try {
    new Density({
      selectorContent: '.cards-with-menu--likes-goods',
      selectorActionContainer: '.user-board__actions-likes-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-posts',
      selectorActionContainer: '.user-board__actions-posts',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-followers',
      selectorActionContainer: '.user-board__actions-followers',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-subscriptions-sp',
      selectorActionContainer: '.user-board__actions-subscriptions-sp',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-subscriptions-tff',
      selectorActionContainer: '.user-board__actions-subscriptions-tff',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-subscriptions-bloggers',
      selectorActionContainer: '.user-board__actions-subscriptions-bloggers',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-subscriptions-shops',
      selectorActionContainer: '.user-board__actions-subscriptions-shops',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-likes-goods',
      selectorActionContainer: '.user-board__actions-likes-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.user-board__form-likes-publications',
      selectorActionContainer: '.user-board__actions-likes-publications',
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
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-subscriptions-sp',
      selectorActionBtn: '.user-board__actions-filters-subscriptions-sp',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-subscriptions-tff',
      selectorActionBtn: '.user-board__actions-filters-subscriptions-tff',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-subscriptions-bloggers',
      selectorActionBtn: '.user-board__actions-filters-subscriptions-bloggers',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-subscriptions-shops',
      selectorActionBtn: '.user-board__actions-filters-subscriptions-shops',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-likes-goods',
      selectorActionBtn: '.user-board__actions-filters-likes-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.user-board',
      selectorContainer: '.user-board__form-likes-publications',
      selectorActionBtn: '.user-board__actions-filters-likes-publications',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-posts', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-followers', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-subscriptions-sp', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-subscriptions-tff', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-subscriptions-bloggers', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-subscriptions-shops', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-likes-goods', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.user-board__form-likes-publications', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
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
      '.user-board',
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
    document.querySelectorAll('.user-board__content-subscriptions-sp .joint-purchases-card__slider').forEach(swiper => {
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
    new Ticker()
  } catch (error) {
    console.log(error)
  }

  try {
    new PreviewToolbarAction()
  } catch (error) {
    console.log(error)
  }
})
