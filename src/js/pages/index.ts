import '../common.ts'

import { API_URLS, BreakpointWidth, Methods } from '../constants/index'

import { Share } from '../modules/Share'
import { Collapse } from '../modules/Collapse'
import { ShopWindow } from '../modules/Shop-window'
import { Tabs } from '../modules/Tabs'
import { Slider } from '../modules/Slider'
import { Density } from '../modules/Density'
import { Sort } from '../modules/Sort'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { Select } from '../modules/Select'

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
    new Select()
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
      new Form(
        '.shop-window__filtersorting', 
        API_URLS.shops.test,
        {
          method: Methods.GET
        },
      ),
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
