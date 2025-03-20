import '../common'

import { Tooltip } from '../modules/Tooltip'

window.addEventListener('load', () => {
  try {
    new Tooltip()
  } catch (error) {
    console.log(error)
  }
})
