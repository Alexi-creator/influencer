import '../common'
import { API_URLS, BreakpointWidth, HttpMethods } from '../constants'

import { AddPublication } from '../modules/AddPublication'
import { Autocomplete } from '../modules/Autocomplete'
import { Collapse } from '../modules/Collapse'
import { CustomSwiper } from '../modules/CustomSwiper'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { Masonry } from '../modules/Masonry'
import { Rating } from '../modules/Rating'
import { Sort } from '../modules/Sort'
import { Steps } from '../modules/Steps'
import { Tabs } from '../modules/Tabs'

window.addEventListener('load', () => {
  // Masonry должен вызываться раньше чем Filter
  try {
    new Masonry({
      selectorContainer: '.add-publication__form-sp .add-publication__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 4,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Masonry({
      selectorContainer: '.add-publication__form-all .add-publication__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 4,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Masonry({
      selectorContainer: '.add-publication__form-bought .add-publication__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 4,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Masonry({
      selectorContainer: '.add-publication__form-user .add-publication__form-filter-filters',
      breakpointsSettings: {
        [BreakpointWidth.MOBILE]: 1,
        [BreakpointWidth.TABLET]: 2,
        [BreakpointWidth.DESKTOP]: 3,
        [BreakpointWidth.FULLHD]: 4,
      },
    })
  } catch (error) {
    console.log(error)
  }

  let stepsMap
  let changeStep

  try {
    const steps = new Steps()
    stepsMap = steps.stepsMap
    changeStep = steps.selected
  } catch (error) {
    console.log(error)
  }

  let onValidation

  try {
    const publication = new AddPublication(stepsMap, changeStep)
    onValidation = publication.checkValidFillingForm
  } catch (error) {
    console.log(error)
  }

  try {
    new Collapse()
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'search-sp',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'search-all',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'search-bought',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Autocomplete({
      id: 'search-user',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.add-publication__content-form-sp', 
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
      selectorForm: '.add-publication__content-form-all', 
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
      selectorForm: '.add-publication__content-form-bought', 
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
      selectorForm: '.add-publication__content-form-user', 
      url: API_URLS.mock.autocomplete,
      apiOptions: {
        method: HttpMethods.POST
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.add-publication__form-sp',
      selectorActionContainer: '.add-publication__actions-sp',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.add-publication__form-all',
      selectorActionContainer: '.add-publication__actions-all',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.add-publication__form-bought',
      selectorActionContainer: '.add-publication__actions-bought',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.add-publication__form-user',
      selectorActionContainer: '.add-publication__actions-user',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.add-publication',
      selectorContainer: '.add-publication__form-sp',
      selectorActionBtn: '.add-publication__actions-categories-sp',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.add-publication',
      selectorContainer: '.add-publication__form-all',
      selectorActionBtn: '.add-publication__actions-categories-all',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.add-publication',
      selectorContainer: '.add-publication__form-bought',
      selectorActionBtn: '.add-publication__actions-categories-bought',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.add-publication',
      selectorContainer: '.add-publication__form-user',
      selectorActionBtn: '.add-publication__actions-categories-user',
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
    new Rating()
  } catch (error) {
    console.log(error)
  }

  try {
    const parentElement = document.querySelector('.add-publication__tabs') as HTMLElement
    const swiperElement = parentElement.querySelector('.add-publication__swiper') as HTMLElement
    const prevBtn = parentElement.querySelector('.swiper-button-prev') as HTMLElement
    const nextBtn = parentElement.querySelector('.swiper-button-next') as HTMLElement 

    new CustomSwiper({
      target: swiperElement,
      options: {
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 0,
        breakpoints: {
          // 420: {
          //   slidesPerView: 1.5,
          // },
        },
      },
      breakMedia: BreakpointWidth.TABLET,
      btnsElements: {
        prevElement: prevBtn,
        nextElement: nextBtn,
      },
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form({
      selectorForm: '.add-publication__filling-form',
      validateSchema: {
        'title-goods': {
          type: 'string',
          required: true,
          allowEmpty: false,
          minLength: 6,
          messages: {
            type: 'неверный тип данных',
            required: 'Обязательное поле для заполнения',
            allowEmpty: 'Поле не должно быть пустым',
            minLength: 'Поле не должно быть меньше 6 символов',
          },
        },
        'description': {
          type: 'string',
          required: true,
          maxLength: 300,
          messages: {
            type: 'неверный тип данных',
            required: 'Обязательное поле для заполнения',
            maxLength: 'Не более 300 символов',
          },
        },
        'add-picture': {
          type: 'object',
          required: true,
          messages: {
            type: 'неверный тип данных',
            required: 'Обязательное поле для заполнения',
          },
        },
        'media-link': {
          type: 'string',
          required: false,
          maxLength: 75,
          messages: {
            type: 'неверный тип данных',
            maxLength: 'Не более 75 символов',
          },
        },
        'tags': {
          type: 'string',
          required: true,
          maxLength: 150,
          messages: {
            type: 'неверный тип данных',
            required: 'Обязательное поле для заполнения',
            maxLength: 'Не более 150 символов',
          },
        },
      },
      onValidation,
    })
  } catch (error) {
    console.log(error)
  }
})
