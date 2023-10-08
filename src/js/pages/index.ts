import '../common.ts'

import { Share } from '../modules/share'
import { Collapse } from '../modules/collapse'
import { ShopWindow } from '../modules/shop-window'
import { Tabs } from '../modules/tabs'
import { Slider } from '../modules/slider'

import { BreakpointWidth } from '../constants/sizeScreen.js'

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
  try {
    new Tabs()
  } catch (error) {
    console.log(error)
  }
  try {
    new Slider(
      '.swiper-tabs',
      {},
      BreakpointWidth.TABLET,
    )
  } catch (error) {
    console.log(error)
  }
})
