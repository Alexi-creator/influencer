import '../common.ts'
import { Share } from '../modules/share'
import { Collapse } from '../modules/collapse'

window.addEventListener('load', () => {

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
})
