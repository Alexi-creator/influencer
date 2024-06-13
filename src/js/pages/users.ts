import { Select } from '../modules/Select'

window.addEventListener('load', () => {
  try {
    new Select()
  } catch (error) {
    console.log(error)
  }
})
