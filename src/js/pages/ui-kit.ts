import '../common'
import { Popup } from '../modules/popup'

import { Collapse } from '../modules/collapse'

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
})
