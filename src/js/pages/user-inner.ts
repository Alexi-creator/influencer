import '../common'

import { API_URLS, BreakpointWidth, HttpMethods } from '../constants'

import { Share } from '../modules/Share'
import { Autocomplete } from '../modules/Autocomplete'
import { Collapse } from '../modules/Collapse'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { Masonry } from '../modules/Masonry'
import { Tabs } from '../modules/Tabs'
import { RangeSlider } from '../modules/RangeSlider'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { Sort } from '../modules/Sort'
import { NumberFormatter } from '../utils/numberFormatter'

window.addEventListener('load', () => {
  try {
    new Autocomplete({
      id: 'users-autocomplete',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Masonry({
      selectorContainer: '.user-card-list__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 5,
      },
    })
  } catch (error) {
    console.log(error)
  }
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
    new Tabs()
  } catch (error) {
    console.log(error)
  }
  try {
    new RangeSlider()
  } catch (error) {
    console.log(error)
  }
  try {
    new Sort({
      selectorContainer: '.user-card-list__form',
      selectorActionContainer: '.filter-actions',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Filter({
      selectorMain: '.user-card-list',
      selectorContainer: '.user-card-list__form',
      selectorActionBtn: '.filter-actions__filters',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Form(
      '.user-card-list__form', 
      API_URLS.mock.autocomplete,
      {
        method: HttpMethods.POST
      },
    )
  } catch (error) {
    console.log(error)
  }
  try {
    new ScrollIntoView()
  } catch (error) {
    console.log(error)
  }

  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }
})
