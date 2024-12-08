import '../common'

import { API_URLS, HttpMethods } from '../constants'

import { NumberFormatter } from '../utils/numberFormatter'

import { CustomSwiper } from '../modules/CustomSwiper'
import { Form } from '../modules/Form'
import { Comments } from '../modules/Comments'

window.addEventListener('load', () => {
  try {
    new NumberFormatter()
  } catch (error) {
    console.log(error)
  }

  try {
    new CustomSwiper({
      target: '.swiper-publication',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Comments('test')
  } catch (error) {
    console.log(error)
  }

  try {
    new Form(
      '.comments__comment', 
      API_URLS.mock.autocomplete,
      {
        method: HttpMethods.POST
      },
    )
  } catch (error) {
    console.log(error)
  }
})
