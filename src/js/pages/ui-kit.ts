import '../common'

import { Popup } from '../modules/popup'
import { Collapse } from '../modules/collapse'
import { Slider } from '../modules/slider'

window.addEventListener('load', () => {
  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }
  try {
    new Popup()
  } catch (error) {
    console.log(error)
  }
  try {
    new Slider('.swiper-uikit', {})
  } catch (error) {
    console.log(error)
  }
})
