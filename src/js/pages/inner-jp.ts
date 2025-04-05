import '../common'

import { Share } from '../modules/Share'
import { Collapse } from '../modules/Collapse'
import { Tabs } from '../modules/Tabs'
import { Density } from '../modules/Density'
import { Sort } from '../modules/Sort'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { RangeSlider } from '../modules/RangeSlider'
import { Masonry } from '../modules/Masonry'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { SyncCategories } from '../modules/SyncCategories'
import { PreviewToolbarAction } from '../modules/PreviewToolbarAction'
import { NumberFormatter } from '../utils/numberFormatter'
import { BtnShow } from '../modules/BtnShow'

window.addEventListener('load', () => {
  try {
    new Share()
  } catch (error) {
    console.log(error)
  }

  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }

  try {
    new BtnShow()
  } catch (error) {
    console.log(error)
  }
})