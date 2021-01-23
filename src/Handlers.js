import { debounce } from 'lodash'

export function WheelHandler (setState, limit, time) {
  //this is a closure
  let yDiff = 0
  //why is it a closure? because its accessed in the function returned below and theres no way to modify it without calling the below function
  return debounce((event) => {
    yDiff = yDiff + event.deltaY
    if(yDiff <= -100) {
      yDiff = 0
      event.preventDefault()
      setState(current => current > 0 ? current -1 : current)
    }
    if(yDiff >= 100 ) {
      yDiff = 0
      event.preventDefault()
      setState(current => current < limit ? current + 1 : current)

    }
  }, time, {maxWait: time})
}


//Touch handlers - WIP
const getTouches = (e) => e.touches
let xDown = null
let yDown = null

export function TouchStartHandler (e) {
  e.preventDefault()
  const firstTouch = getTouches(e)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

export function TouchMoveHandler (setState, limit){

  return function (e) {
    e.preventDefault()
    if (!xDown || !yDown){
      return;
    }
    let xUp = e.touches[0].clientX
    let yUp = e.touches[0].clientY
    let xDiff = xDown - xUp
    let yDiff = yDown - yUp
    if(Math.abs(xDiff) > Math.abs(yDiff)){
      return;
    } else {
      if (yDiff > 0){
        setState(current => current > 0 ? current -1 : current)
      } else {
        setState(current => current < limit ? current + 1 : current)
      }
    }
  }
}

