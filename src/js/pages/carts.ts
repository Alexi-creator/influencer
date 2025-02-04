import '../common'

import { NumberFormatter } from '../utils/numberFormatter'

window.addEventListener('load', () => {
  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }
})
