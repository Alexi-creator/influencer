import '../common'

import { API_URLS } from '../constants'

import { Collapse } from '../modules/Collapse'
import { CustomSwiper } from '../modules/CustomSwiper'
import { Tabs } from '../modules/Tabs'
import { RangeSlider } from '../modules/RangeSlider'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { Autocomplete } from '../modules/Autocomplete'
import { Ticker } from '../modules/Ticker'
import { Rating } from '../modules/Rating'

window.addEventListener('load', () => {
  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }

  try {
    new ScrollIntoView()
  } catch (error) {
    console.log(error)
  }

  try {
    const swiperElement = document.querySelector('.ui-kit__swiper-btns') as HTMLElement
    const prevBtn = swiperElement.querySelector('.swiper-button-out-prev') as HTMLElement
    const nextBtn = swiperElement.querySelector('.swiper-button-out-next') as HTMLElement 

    new CustomSwiper({
      target: '.swiper-uikit-btns',
      btnsElements: {
        prevElement: prevBtn,
        nextElement: nextBtn,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new RangeSlider()
  } catch (error) {
    console.log(error)
  }

  try {
    new Tabs()
  } catch (error) {
    console.log(error)
  }

  try {
    new Rating()
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'search',
      mod: 'search',
      // callback: ({ label, value }) => console.log('ui kit autocomplete', label, value)
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'ui-autocomplete',
      callback: ({ label, value }) => console.log('ui kit autocomplete', label, value)
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'ui-autocomplete-url',
      url: API_URLS.mock.autocomplete,
      callback: ({ label, value }) => console.log('ui kit autocomplete url', label, value)
    })
  } catch (error) {
    console.log(error)
  }
  
  try {
    new Ticker()
  } catch (error) {
    console.log(error)
  }
})
