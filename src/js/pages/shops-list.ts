import '../common'

import { API_URLS, BreakpointWidth, HttpMethods } from '../constants/index'

import { Share } from '../modules/Share'
import { Collapse } from '../modules/Collapse'
// import { ShopWindow } from '../modules/ShopWindow'
// import { Tabs } from '../modules/Tabs'
// import { CustomSwiper } from '../modules/CustomSwiper'
import { Density } from '../modules/Density'
import { Sort } from '../modules/Sort'
import { Filter } from '../modules/Filter'
import { Form } from '../modules/Form'
import { RangeSlider } from '../modules/RangeSlider'
import { Masonry } from '../modules/Masonry'
import { ScrollIntoView } from '../modules/ScrollIntoView'
import { CustomIntersectionObserver } from '../modules/CustomIntersectionObserver'
import { observerBrandCallback } from '../modules/observerBrandCallback'
// import { SyncCategories } from '../modules/SyncCategories'
// import { PreviewToolbarAction } from '../modules/PreviewToolbarAction'

window.addEventListener('load', () => {
  // Masonry должен вызываться раньше чем Filter
  try {
    new Masonry({
      selectorContainer: '.shop-window__form-goods .shop-window__form-filter-filters',
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
    const targetElement = document.querySelector('.shop-window__tabs') as HTMLElement

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
    new RangeSlider()
  } catch (error) {
    console.log(error)
  }

  try {
    new Density({
      selectorContent: '.cards-with-menu--goods',
      selectorActionContainer: '.shop-window__actions-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Sort({
      selectorContainer: '.shop-window__form-goods',
      selectorActionContainer: '.shop-window__actions-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Filter({
      selectorMain: '.shop-window',
      selectorContainer: '.shop-window__form-goods',
      selectorActionBtn: '.shop-window__actions-filters-goods',
    })
  } catch (error) {
    console.log(error)
  }

  try {
    new Form(
      '.shop-window__form-goods', 
      API_URLS.mock.autocomplete,
      {
        method: HttpMethods.POST
      },
    )
  } catch (error) {
    console.log(error)
  }
})
