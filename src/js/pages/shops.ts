import '../common'

import { API_URLS, BreakpointWidth, HttpMethods } from '../constants/index'

import { Share } from '../modules/Share'
import { Collapse } from '../modules/Collapse'
import { ShopWindow } from '../modules/ShopWindow'
import { Tabs } from '../modules/Tabs'
import { CustomSwiper } from '../modules/CustomSwiper'
import { Density } from '../modules/Density'
import { Sort } from '../modules/Sort'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { RangeSlider } from '../modules/RangeSlider'
import { Masonry } from '../modules/Masonry'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { CustomIntersectionObserver } from '../modules/CustomIntersectionObserver'
import { observerBrandCallback } from '../modules/observerBrandCallback'
import { SyncCategories } from '../modules/SyncCategories'
import { PreviewToolbarAction } from '../modules/PreviewToolbarAction'

window.addEventListener('load', () => {
  // Masonry должен вызываться раньше чем Filter
  try {
    new Masonry({
      selectorContainer: '.shop-window__form-goods .shop-window__form-filter-filters',
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
      selectorContainer: '.shop-window__form-sp .shop-window__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 4,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Masonry({
      selectorContainer: '.shop-window__form-tff .shop-window__form-filter-filters',
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
    new Share()
  } catch (error) {
    console.log(error)
  }

  try {
    const targetElement = document.querySelector('.shop-window__tabs') as HTMLElement

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
    new ScrollIntoView()
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
      selectorContent: '.cards-with-menu--goods',
      selectorActionContainer: '.shop-window__actions-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Density({
      selectorContent: '.cards-with-menu--tff',
      selectorActionContainer: '.shop-window__actions-tff',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.shop-window__form-goods',
      selectorActionContainer: '.shop-window__actions-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.shop-window__form-sp',
      selectorActionContainer: '.shop-window__actions-sp',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.shop-window__form-tff',
      selectorActionContainer: '.shop-window__actions-tff',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.shop-window',
      selectorContainer: '.shop-window__form-goods',
      selectorActionBtn: '.shop-window__actions-filters-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.shop-window',
      selectorContainer: '.shop-window__form-sp',
      selectorActionBtn: '.shop-window__actions-categories-sp',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.shop-window',
      selectorContainer: '.shop-window__form-tff',
      selectorActionBtn: '.shop-window__actions-filters-tff',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.shop-window__form-goods', 
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
      selectorForm: '.shop-window__form-sp', 
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
      selectorForm: '.shop-window__form-tff', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    const parentElement = document.querySelector('.shop-window__tabs') as HTMLElement
    const swiperElement = parentElement.querySelector('.shop-window__tabs-swiper') as HTMLElement
    const prevBtn = parentElement.querySelector('.swiper-button-prev') as HTMLElement
    const nextBtn = parentElement.querySelector('.swiper-button-next') as HTMLElement 

    new ShopWindow(
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
    new SyncCategories()
  } catch (error) {
    console.log(error)
  }

  try {
    new PreviewToolbarAction()
  } catch (error) {
    console.log(error)
  }
})
