import { BreakpointWidth } from '../constants'

/**
 * Синхронизация категорий для страницы категорий, переключение категорий.
 */
export class SyncCatalog {
  private selectorMobile: string
  private selectorDesktop: string
  private catalogSelected: string

  private containerMobile: HTMLElement
  private containerDesktop: HTMLElement
  private mobileCatalogSelected: HTMLElement
  private catalogsMobile: HTMLElement[]
  private catalogsDesktop: Map<HTMLElement, HTMLElement>

  constructor() {
    this.selectorMobile = '.catalog__mobile'
    this.selectorDesktop = '.catalog__desktop'

    this.catalogSelected = ''

    const containerMobile = document.querySelector(this.selectorMobile)
    if (containerMobile) this.containerMobile = containerMobile as HTMLElement
    const containerDesktop = document.querySelector(this.selectorDesktop)
    if (containerDesktop) this.containerDesktop = containerDesktop as HTMLElement

    if (!this.containerMobile || !this.containerDesktop) return

    this.init()
  }

  private init() {
    this.catalogsMobile = [...document.querySelectorAll(`${this.selectorMobile} [data-catalog]`)] as HTMLElement[]
    this.catalogsDesktop = new Map()

    const catalogsDesktop = [...document.querySelectorAll(`${this.selectorDesktop} .catalog__menu-item`)] as HTMLElement[]
    catalogsDesktop.forEach(catalog => {
      const catalogSyncName = catalog.dataset.tabPath
      const catalogContent = document.querySelector(`.catalog__content [data-tab-target="${catalogSyncName}"]`)
      this.catalogsDesktop.set(catalog, catalogContent as HTMLElement)  
    })

    this.handlers()
  }

  private syncFromMobile(catalog: string) {
    this.catalogsDesktop.forEach((val, key) => {
      key.classList.remove('tabs__tab--active')
      val.classList.remove('tabs__content--active')

      if (key.dataset.tabPath === catalog) {
        key.classList.add('tabs__tab--active')
        val.classList.add('tabs__content--active')
      }
    })
  }

  private syncFromDesktop(catalog: string) {
    const mobileCatalogSync = this.catalogsMobile.find(item => item.dataset.catalog === catalog)

    if (mobileCatalogSync) {
      const collapseElem = mobileCatalogSync.querySelector('.collapse') as HTMLElement
      collapseElem.classList.remove('collapse--close')
      collapseElem.classList.add('collapse--open')

      if (this.mobileCatalogSelected) {
        this.closeCurrentCollapse(this.mobileCatalogSelected)
      }

      this.mobileCatalogSelected = mobileCatalogSync
    }
  }

  private closeCurrentCollapse(elem: HTMLElement) {
    const collapse = elem.querySelector('.collapse') as HTMLElement

    collapse.classList.remove('collapse--open')
    collapse.classList.add('collapse--close')
  }

  private searchCatalogMobile(targetElement: HTMLElement) {
    const parent = targetElement.closest('.catalog__item') as HTMLElement

    if (parent) {
      const catalog = parent.dataset.catalog

      if (catalog) {
        if (this.catalogSelected === catalog) return

        if (this.mobileCatalogSelected) {
          this.closeCurrentCollapse(this.mobileCatalogSelected)
        }
        
        this.mobileCatalogSelected = parent
        this.catalogSelected = catalog
        this.syncFromMobile(catalog)
      }
    }
  }

  private searchCatalogDesktop(targetElement: HTMLElement) {
    const parent = targetElement.closest('.tabs__tab') as HTMLElement

    if (parent) {
      const catalog = parent.dataset.tabPath

      if (catalog) {
        if (this.catalogSelected === catalog) return
        
        this.catalogSelected = catalog
        this.syncFromDesktop(catalog)
      }
    }
  }

  private syncCatalog(targetElement: HTMLElement) {
    if (this.checkDesktopWidth()) {
      this.searchCatalogDesktop(targetElement)
    } else {
      this.searchCatalogMobile(targetElement)
    }
  }

  private checkDesktopWidth(): boolean {
    return window.innerWidth >= BreakpointWidth.DESKTOP
  }

  private clickHandler(e: Event) {
    const targetElement = e.target as HTMLElement

    this.syncCatalog(targetElement)
  }

  private handlers() {
    document.addEventListener('click', (e) => this.clickHandler(e))
  }
}
