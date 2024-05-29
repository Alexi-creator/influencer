import '../common'

import { Collapse } from '../modules/Collapse'
import { Select } from '../modules/Select'
import { CustomSwiper } from '../modules/CustomSwiper'
import { Tabs } from '../modules/Tabs'
import { RangeSlider } from '../modules/RangeSlider'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { Autocomplete } from '../modules/Autocomplete'

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
    new Select()
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
      url: '../files/stubs/autocomplete.json',
      callback: ({ label, value }) => console.log('ui kit autocomplete url', label, value)
    })
  } catch (error) {
    console.log(error)
  }
})
