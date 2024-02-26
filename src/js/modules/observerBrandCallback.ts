const actionsPreviewSelector = '.shop-preview__actions'
const actionsShopWindowSelector = '.shop-window__actions'

const actionsPreviewElem = document.querySelector(actionsPreviewSelector)
const actionsShopWindowElems = Array.from(document.querySelectorAll(actionsShopWindowSelector)) as HTMLElement[]

const addIsActive = () => {
  actionsPreviewElem?.classList.add(`${actionsPreviewSelector.substring(1)}--active`)
  actionsShopWindowElems.find(elem => elem.classList.contains('active'))?.classList.add(`${actionsShopWindowSelector.substring(1)}--active`)
}

const removeIsActive = () => {
  actionsPreviewElem?.classList.remove(`${actionsPreviewSelector.substring(1)}--active`)
  actionsShopWindowElems.find(elem => elem.classList.contains('active'))?.classList.remove(`${actionsShopWindowSelector.substring(1)}--active`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const observerBrandCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => { 
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Элемент виден
      removeIsActive()
    } else if (entry.boundingClientRect.top <= 124 && entry.rootBounds) {
      // Элемент начал уходить за верх экрана
      addIsActive()
    }
  })
}
