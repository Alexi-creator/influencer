import '../common'

import { Collapse } from '../modules/collapse'

window.addEventListener('load', () => {
  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }
})
