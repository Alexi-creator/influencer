import '../common'

import { API_URLS, HttpMethods } from '../constants'

import { CustomSwiper } from '../modules/CustomSwiper'
import { Form } from '../modules/Form'

window.addEventListener('load', () => {
  try {
    new CustomSwiper({
      target: '.swiper-publication',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form(
      '.', 
      API_URLS.mock.autocomplete,
      {
        method: HttpMethods.POST
      },
    )
  } catch (error) {
    console.log(error)
  }
})
