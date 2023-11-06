import '../common.ts'

import { Share } from '../modules/share'
import { Collapse } from '../modules/collapse'
import { ShopWindow } from '../modules/shop-window'
import { Tabs } from '../modules/tabs'
import { Slider } from '../modules/slider'
import { Density } from '../modules/density'
import { Sort } from '../modules/sort'
import { Filter } from '../modules/filter'

import { BreakpointWidth } from '../constants/index'

window.addEventListener('load', () => {
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
    new Density()
  } catch (error) {
    console.log(error)
  }
  try {
    new Sort()
  } catch (error) {
    console.log(error)
  }
  try {
    new Filter()
  } catch (error) {
    console.log(error)
  }
  try {
    new ShopWindow(
      new Slider({
        selector: '.swiper-tabs',
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
      }),
    )
  } catch (error) {
    console.log(error)
  }
  try {
    new Slider({
      selector: '.swiper-joint-purchases',
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
    })
  } catch (error) {
    console.log(error)
  }
})
