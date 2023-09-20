// может и не нужен этот файл, но в планах в файлы js страниц подключать одинаковые модули чтобы не дублировать
import * as flsFunction from './modules/func.js'

window.addEventListener('load', () => {
  flsFunction.isWebp()

  // eslint-disable-next-line no-empty
  try {} catch (error) {
    console.log(error)
  }
})