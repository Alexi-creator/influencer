import '../common.ts'

import { BreakpointWidth } from '../constants/index'

import { Tabs } from '../modules/Tabs'
import { Collapse } from '../modules/Collapse'
import { Select } from '../modules/Select'
import { Masonry } from '../modules/Masonry'
import { Categories } from '../modules/Categories'
import { BtnShow } from '../modules/BtnShow'


window.addEventListener('load', () => {
  try {
    new Masonry({
      selectorContainer: '.catalog__masonry',
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
  try {
    new Categories()
  } catch (error) {
    console.log(error)
  }
  try {
    new BtnShow()
  } catch (error) {
    console.log(error)
  }
})
