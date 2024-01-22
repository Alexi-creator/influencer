import '../common.ts'

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
import { Select } from '../modules/Select'
import { RangeSlider } from '../modules/RangeSlider'
import { Masonry } from '../modules/Masonry'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { CustomIntersectionObserver } from '../modules/CustomIntersectionObserver'
import { observerBrandCallback } from '../modules/observerBrandCallback'
import { MoveCategories } from '../modules/MoveCategories'

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
      options: {},
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
    new Density()
  } catch (error) {
    console.log(error)
  }
  try {
    new Select()
  } catch (error) {
    console.log(error)
  }
  try {
    new RangeSlider()
  } catch (error) {
    console.log(error)
  }
  try {
    new Sort({
      selectorContainer: '.shop-window__form-goods',
      selectorActionBtn: '.shop-window__actions-goods .shop-window__actions-sorts',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Sort({
      selectorContainer: '.shop-window__form-sp',
      selectorActionBtn: '.shop-window__actions-sp .shop-window__actions-sorts',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Sort({
      selectorContainer: '.shop-window__form-tff',
      selectorActionBtn: '.shop-window__actions-tff .shop-window__actions-sorts',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Filter({
      selectorContainer: '.shop-window__form-goods',
      selectorActionBtn: '.shop-window__actions-filters-goods',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Filter({
      selectorContainer: '.shop-window__form-sp',
      selectorActionBtn: '.shop-window__actions-categories-sp',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Filter({
      selectorContainer: '.shop-window__form-tff',
      selectorActionBtn: '.shop-window__actions-filters-tff',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Form(
      '.shop-window__form-goods', 
      API_URLS.shops.test,
      {
        method: HttpMethods.GET
      },
    )
  } catch (error) {
    console.log(error)
  }
  try {
    new Form(
      '.shop-window__form-sp', 
      API_URLS.shops.test,
      {
        method: HttpMethods.GET
      },
    )
  } catch (error) {
    console.log(error)
  }
  try {
    new Form(
      '.shop-window__form-tff', 
      API_URLS.shops.test,
      {
        method: HttpMethods.GET
      },
    )
  } catch (error) {
    console.log(error)
  }
  try {
    const parentElement = document.querySelector('.shop-window__tabs') as HTMLElement
    const swiperElement = parentElement.querySelector('.shop-window__tabs-swiper') as HTMLElement
    const prevBtn = parentElement.querySelector('.swiper-button-prev') as HTMLElement
    const nextBtn = parentElement.querySelector('.swiper-button-next') as HTMLElement 

    new ShopWindow(
      // new Filter('.filter-goods'),
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
      // new Form(
      //   '.shop-window__form', 
      //   API_URLS.shops.test,
      //   {
      //     method: HttpMethods.GET
      //   },
      // ),
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
            768: {
              slidesPerView: 3.5,
            },
            1200: {
              slidesPerView: 2.5,
            },
            1920: {
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
    new MoveCategories([
      { categoriesSelector: '.shop-window__goods', filterWrapperSelector: '.shop-window__form-goods' },
      { categoriesSelector: '.shop-window__tff', filterWrapperSelector: '.shop-window__form-tff' },
    ])
  } catch (error) {
    console.log(error)
  }
})
