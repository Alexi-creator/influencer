import '../common'

import { Collapse } from '../modules/Collapse'
import { Select } from '../modules/Select'
import { Slider } from '../modules/Slider'
import { Tabs } from '../modules/Tabs'

window.addEventListener('load', () => {
  try {
    new Collapse()
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
  try {
    new Select()
  } catch (error) {
    console.log(error)
  }
})
