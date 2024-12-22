import '../common'

import { Steps } from '../modules/Steps'

window.addEventListener('load', () => {
  let selectedStep

  try {
    const steps = new Steps()
    selectedStep = steps.selected
  } catch (error) {
    console.log(error)
  }
})
