import '../common.ts'

import { BreakpointWidth } from '../constants/index'

import { Tabs } from '../modules/Tabs'
import { Collapse } from '../modules/Collapse'
import { Select } from '../modules/Select'
import { Masonry } from '../modules/Masonry'
// import { SyncCatalog } from '../modules/SyncCatalog'
import { BtnShow } from '../modules/BtnShow'


window.addEventListener('load', () => {
  try {
    new Masonry({
      selectorContainer: '.catalog__mobile .catalog__list',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
      },
      // tagName: 'ul'
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Masonry({
      selectorContainer: '.catalog__desktop .catalog__masonry',
      breakpointsSettings: {
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 4,
      },
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
  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }
  // try {
  //   new SyncCatalog()
  // } catch (error) {
  //   console.log(error)
  // }
  try {
    new BtnShow()
  } catch (error) {
    console.log(error)
  }
})
