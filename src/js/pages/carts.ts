import '../common'

import { NumberFormatter } from '../utils/numberFormatter'

import { Carts } from '../modules/Carts'

window.addEventListener('load', () => {
  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }

  try {
    new Carts()
  } catch (error) {
    console.log(error)
  }
})
