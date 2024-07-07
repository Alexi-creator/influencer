import '../common'

import { API_URLS, HttpMethods } from '../constants'

import { Autocomplete } from '../modules/Autocomplete'
import { Collapse } from '../modules/Collapse'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { Sort } from '../modules/Sort'
import { Ticker } from '../modules/Ticker'

window.addEventListener('load', () => {
  try {
    new Autocomplete({
      id: 'users-autocomplete',
    })
  } catch (error) {
    console.log(error)
  }
  try {
    new Collapse()
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
    new Ticker()
  } catch (error) {
    console.log(error)
  }
})
