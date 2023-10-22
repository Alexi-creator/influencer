import '../common'

import { Popup } from '../modules/popup'
import { Collapse } from '../modules/collapse'
import { Slider } from '../modules/slider'
import { Tabs } from '../modules/tabs'

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
    new Slider({
      selector: '.swiper-uikit',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Tabs()
  } catch (error) {
    console.log(error)
  }
})
