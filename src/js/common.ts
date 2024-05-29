import * as flsFunction from './modules/func.js'

import { HttpMethods } from './constants'
import { API_URLS } from './constants'

import { Popup } from './modules/Popup'
import { UsefulLinks } from './modules/UsefulLinks'
import { Form } from './modules/Form'
import { Login } from './modules/Login'
import { Location } from './modules/Location'
import { Autocomplete } from './modules/Autocomplete'

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
    new Form(
      '.login__form-sign-in', 
      API_URLS.shops.test,
      {
        method: HttpMethods.POST
      },
    )
  } catch (error) {
    console.log(error)
  }
  try {
    new Form(
      '.login__form-sign-up', 
      API_URLS.shops.test,
      {
        method: HttpMethods.POST
      },
    )
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
      id: 'search-pickup-autocomplete',
      url: '../files/stubs/autocomplete.json',
      callback: location?.selectedOption,
    })
  } catch (error) {
    console.log(error)
  }
})