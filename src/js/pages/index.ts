import '../common.ts';
import { Share } from '../modules/share';

window.addEventListener('load', () => {

  try {
    new Share();
  } catch (error) {
    console.log(error);
  }
});
