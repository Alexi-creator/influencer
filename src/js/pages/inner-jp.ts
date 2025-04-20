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
import { CustomIntersectionObserver } from '../modules/CustomIntersectionObserver'
import { observerBrandCallback } from '../modules/observerBrandCallback'
import { InnerJp } from '../modules/InnerJp'
import { API_URLS, BreakpointWidth, HttpMethods } from '../constants'

window.addEventListener('load', () => {
  try {
    new Share()
  } catch (error) {
    console.log(error)
  }

  try {
    new ScrollIntoView()
  } catch (error) {
    console.log(error)
  }

  try {
    new Collapse()
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

  try {
    new Masonry({
      selectorContainer: '.inner-jp-goods__form-goods .inner-jp-goods__form-filter-filters',
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
    new RangeSlider()
  } catch (error) {
    console.log(error)
  }

  try {
      const targetElement = document.querySelector('.inner-jp-goods__tabs') as HTMLElement
  
      new CustomIntersectionObserver({
        element: targetElement,
        callback: observerBrandCallback,
        options: {
          mobileRootMargin: '-60px 0px 0px',
          desktopRootMargin: '-160px 0px 0px',
        },
      })
    } catch (error) {
      console.log(error)
    }

  try {
    new PreviewToolbarAction()
  } catch (error) {
    console.log(error)
  }

  try {
    new Density({
      selectorContent: '.cards-with-menu--goods',
      selectorActionContainer: '.inner-jp-goods__actions-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.inner-jp-goods__form-goods',
      selectorActionContainer: '.inner-jp-goods__actions-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.inner-jp-goods',
      selectorContainer: '.inner-jp-goods__form-goods',
      selectorActionBtn: '.inner-jp-goods__actions-filters-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
      new Form({
        selectorForm: '.inner-jp-goods__form-goods', 
        url: API_URLS.mock.autocomplete,
        apiOptions: {
          method: HttpMethods.POST
        },
      })
    } catch (error) {
      console.log(error)
    }

  try {
    new InnerJp()
  } catch (error) {
    console.log(error)
  }
})