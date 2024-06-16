export class Tabs {
  constructor() {
    this.init()
  }

  private init() {
    this.handlers()
  }

  private changeTab(tabsNode: HTMLElement) {
    const path = tabsNode.dataset.tabPath

    const tabsParent = tabsNode.closest('.tabs__list')
    const tabs = tabsParent?.querySelectorAll('.tabs__tab')

    const requiredContent = document.querySelector(`[data-tab-target="${path}"]`)
    const contentsParent = requiredContent?.closest('.tabs__contents')
    const contents = contentsParent?.querySelectorAll('.tabs__content')
       
    tabs?.forEach(tab => tab.classList.remove('tabs__tab--active'))
    tabsNode.classList.add('tabs__tab--active')

    contents?.forEach(content => content.classList.remove('tabs__content--active'))
    requiredContent?.classList.add('tabs__content--active')
  }

  private clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement
    const parent = targetElement.closest('.tabs__tab') as HTMLElement    

    if (parent) this.changeTab(parent)
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}