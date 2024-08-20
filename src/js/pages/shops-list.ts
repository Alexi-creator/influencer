import '../common'

import { API_URLS, HttpMethods } from '../constants/index'

import { Autocomplete } from '../modules/Autocomplete'
import { Share } from '../modules/Share'
import { Collapse } from '../modules/Collapse'
import { Sort } from '../modules/Sort'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { ScrollIntoView } from '../modules/ScrollIntoView'

window.addEventListener('load', () => {
  try {
    new Autocomplete({
      id: 'shops-autocomplete',
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
    new Sort({
      selectorContainer: '.shops-block__form',
      selectorActionContainer: '.filter-actions',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.shops-block',
      selectorContainer: '.shops-block__form',
      selectorActionBtn: '.filter-actions__categories',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form(
      '.shops-block__form', 
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
})
