import '../common.ts'

// import { BreakpointWidth } from '../constants/index'

import { Collapse } from '../modules/Collapse'
import { Select } from '../modules/Select'
// import { Masonry } from '../modules/Masonry'


window.addEventListener('load', () => {
  // try {
  //   new Masonry({
  //     selectorContainer: '.shop-window__form-goods .shop-window__form-filter-filters',
  //     breakpointsSettings: {
  //       [BreakpointWidth.MOBILE]: 1,
  //       [BreakpointWidth.TABLET]: 2,
  //       [BreakpointWidth.DESKTOP]: 3,
  //       [BreakpointWidth.FULLHD]: 5,
  //     },
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
  try {
    new Select()
  } catch (error) {
    console.log(error)
  }
  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }
})
