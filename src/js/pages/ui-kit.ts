import '../common'

import { Collapse } from '../modules/Collapse'
import { CustomSwiper } from '../modules/CustomSwiper'
import { Tabs } from '../modules/Tabs'
import { RangeSlider } from '../modules/RangeSlider'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { Autocomplete } from '../modules/Autocomplete'
import { API_URLS } from '../constants'

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
    const swiperElement = document.querySelector('.swiper-uikit') as HTMLElement
    const prevBtn = swiperElement.querySelector('.swiper-button-prev') as HTMLElement
    const nextBtn = swiperElement.querySelector('.swiper-button-next') as HTMLElement 

    new CustomSwiper({
      target: '.swiper-uikit',
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
})
