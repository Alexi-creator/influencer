// может и не нужен этот файл, но в планах в файлы js страниц подключать одинаковые модули чтобы не дублировать
import * as flsFunction from './modules/func.js'

import { HttpMethods } from './constants'
import { API_URLS } from './constants'

import { Popup } from './modules/Popup'
import { UsefulLinks } from './modules/UsefulLinks'
import { Form } from './modules/Form'
import { Login } from './modules/Login'

window.addEventListener('load', () => {
  flsFunction.isWebp()

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
})