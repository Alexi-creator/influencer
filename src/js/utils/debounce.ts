export const debounce = (fn, time: number) => {
  let timer

  return function() {
    // eslint-disable-next-line prefer-rest-params
    const fnCall = () => { fn.apply(this, arguments) }
    
    clearTimeout(timer)
    timer = setTimeout(fnCall, time)
  } 
}
