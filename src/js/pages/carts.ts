import '../common'

import { NumberFormatter } from '../utils/numberFormatter'

import { Carts } from '../modules/Carts'
import { Tooltip } from '../modules/Tooltip'

window.addEventListener('load', () => {
  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }

  try {
    new Tooltip()
  } catch (error) {
    console.log(error)
  }

  try {
    new Carts()
  } catch (error) {
    console.log(error)
  }
})
