export class Share {
  selector: string;
  els: NodeListOf<Element>;
  error: boolean;

  constructor() {
    this.selector = '.share';
    this.els = document.querySelectorAll(this.selector);
    this.error = this.els.length === 0;

    if (this.error) return;

    this.init();
  }

  init() {
    this.handlers();
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as Element;
    
    if (targetElement.closest('.share__open')) {
      return targetElement.closest(this.selector)?.classList.add('share--open');
    }
    if (targetElement.closest('.share__close')) {
      return targetElement.closest(this.selector)?.classList.remove('share--open');
    }
  }

  handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e));
  }
}