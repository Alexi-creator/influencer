
export class TabContentManager {
  private selectorTabContent: string

  constructor() {
    this.selectorTabContent = '.tabs__content'

    this.init()
  }

  init() {
    this.registerSelectChangeEvent()
  }

  private registerSelectChangeEvent() {
    document.addEventListener('select-change', (e) => {
      this.handleSelectChange(e as CustomEvent<string>)
    })
  }

  private handleSelectChange(e: CustomEvent<string>) {
    this.updateTabContent(e.detail)
  }

  private updateTabContent(selectedValue: string) {
    const tabContentElement = document.querySelector(
      `${this.selectorTabContent}[data-tab-target="${selectedValue}"]`
    )

    if (tabContentElement) {
      const tabsParent = tabContentElement.closest('.tabs__contents')
      const tabs = tabsParent?.querySelectorAll(this.selectorTabContent)

      tabs?.forEach((tab) => tab.classList.remove('tabs__content--active'))
      tabContentElement.classList.add('tabs__content--active')
    }
  }
}