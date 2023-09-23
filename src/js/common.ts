// может и не нужен этот файл, но в планах в файлы js страниц подключать одинаковые модули чтобы не дублировать
import * as flsFunction from './modules/func.js'
import { Popup } from './modules/popup'

window.addEventListener('load', () => {
  flsFunction.isWebp()

  try {
    new Popup()
  } catch (error) {
    console.log(error)
  }
})