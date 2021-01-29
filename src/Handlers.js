import { throttle, debounce } from 'lodash'

export function WheelHandler (setState, limit, time) {
  //this is a closure
  let yDiff = 0
  //why is it a closure? because its accessed in the function returned below and theres no way to modify it without calling the below function
  //lodash's debounce is really useful as it guarantees the passed callback is called only once within the given time (in milliseconds)
  return debounce((event) => {
    yDiff = yDiff + event.deltaY
    //if scrolls up
    if(yDiff < 0) { //might want to rework these constants. Having it trigger at a delta of -1 or 1 might be too sensitive
      yDiff = 0
      event.preventDefault()
      setState(current => current > 0 ? current -1 : current)
    }
    if(yDiff > 0) {
      yDiff = 0
      event.preventDefault()
      setState(current => current < limit ? current + 1 : current)

    }
  }, time, {maxWait: time})
}


//Touch handlers - WIP
let xDown, yDown

const getTouches = (e) => {
  xDown = null
  yDown = null
  return e.touches
}

export function TouchStartHandler (e) {
  const firstTouch = getTouches(e)[0]
  e.stopPropagation()
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

export function TouchMoveHandler (setState, limit, time){

  return throttle((e) => {
    e.preventDefault()
    const selection = window.getSelection()
    if ((!xDown || !yDown) || (selection && selection.toString().length !== 0)){
      return;
    }
    let xUp = e.touches[0].clientX
    let yUp = e.touches[0].clientY
    let xDiff = xDown - xUp
    let yDiff = yDown - yUp
    // if swipe left/right
    if(Math.abs(xDiff) > Math.abs(yDiff)){
      return;
    } else {
      //if swipe down
      if (yDiff > 150){ //not sure about these constants for scroll sensitivity
        setState(current => current < limit ? current + 1 : current)
      } 
      // if swipe up
      if(yDiff < -150) {
        setState(current => current > 0 ? current -1 : current)
      }
    }
  }, time, {maxWait: time})
}

