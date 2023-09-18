// может и не нужен этот файл, но в планах в файлы js страниц подключать одинаковые модули чтобы не дублировать
import * as flsFunction from './modules/func.js';
import { Test } from './modules/testClass';

window.addEventListener('load', () => {
  flsFunction.isWebp();

  try {
    new Test('hi');
  } catch (error) {
    console.log(error);
  }
});