import * as flsFunction from './modules/func.js'

import { HttpMethods } from './constants'
import { API_URLS } from './constants'

import { Popup } from './modules/Popup'
import { UsefulLinks } from './modules/UsefulLinks'
import { Form } from './modules/Form'
import { Login } from './modules/Login'
import { Location } from './modules/Location'
import { Autocomplete } from './modules/Autocomplete'
import { Select } from './modules/Select'
import { MainSearch } from './modules/MainSearch'

window.addEventListener('load', () => {
  flsFunction.isWebp()

  let location: Location | undefined

  try {
    new Popup()
  } catch (error) {
    console.log(error)
  }

  try {
    new UsefulLinks()
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.login__form-sign-in', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.login__form-sign-up', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Login()
  } catch (error) {
    console.log(error)
  }

  try {
    location = new Location()
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'search-shops',
      // url: API_URLS.mock.autocomplete,
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'pickup-autocomplete',
      url: API_URLS.mock.autocomplete,
      callback: location?.selectedOption,
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'courier-autocomplete',
      url: API_URLS.mock.autocomplete,
      callback: location?.selectedOption,
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'search-pickup-autocomplete',
      url: API_URLS.mock.autocomplete,
      callback: location?.selectedOption,
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Select()
  } catch (error) {
    console.log(error)
  }

  try {
    new MainSearch('.header__nav-search')
  } catch (error) {
    console.log(error)
  }
})
