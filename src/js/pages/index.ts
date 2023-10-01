import '../common.ts'
import { Share } from '../modules/share'
import { Collapse } from '../modules/collapse'
import { ShopWindow } from '../modules/shop-window'

window.addEventListener('load', () => {

  try {
    new Share()
  } catch (error) {
    console.log(error)
  }
  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }
  try {
    new ShopWindow()
  } catch (error) {
    console.log(error)
  }
})
