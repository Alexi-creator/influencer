const actionsPreviewSelector = '.shop-preview__actions'
const actionsWindowSelector = '.shop-window__actions'

const actionsPreviewElem = document.querySelector(actionsPreviewSelector)
const actionsWindowElem = document.querySelector(actionsWindowSelector)

const addIsActive = () => {
  actionsPreviewElem?.classList.add(`${actionsPreviewSelector.substring(1)}--active`)
  actionsWindowElem?.classList.add(`${actionsWindowSelector.substring(1)}--active`)
}

const removeIsActive = () => {
  actionsPreviewElem?.classList.remove(`${actionsPreviewSelector.substring(1)}--active`)
  actionsWindowElem?.classList.remove(`${actionsWindowSelector.substring(1)}--active`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const observerBrandCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => { 
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Элемент виден
      removeIsActive()
    } else if (entry.boundingClientRect.top < 0 && entry.rootBounds) {
      // Элемент начал уходить за верх экрана
      addIsActive()
    }
  })
}
