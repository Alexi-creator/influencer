export class Test {
  title: string;

  constructor(title: string) {
    this.title = title
    this.handlers();
  }

  clickHandler(e) {
    console.log('e', e);
    // console.log(this.title, 'e');
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e));
  }
}