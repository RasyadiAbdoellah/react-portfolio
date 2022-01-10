import React from 'react'
import { debounce } from 'lodash'

export function WheelHandler (dispatch, time) {
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
      dispatch({type: 'up'})
    }
    if(yDiff > 0) {
      yDiff = 0
      event.preventDefault()
      dispatch({type: 'down'})
    }
  }, time, {maxWait: time})
}

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const history = useHistory()
//sets page to index of page path and stores direction
const usePageSwitcher = React.useReducer((state, action) => {
  let currentPage
  switch(action.type) {
    case 'up' : 
      currentPage = clamp(state.page-1, 0 , navList.length-1)
    break
    case 'down' :
      currentPage = clamp(state.page+1, 0 , navList.length-1)
    break
    case 'jump' :
      currentPage = action.payload
    break
    default :
      currentPage = state.page
    break
  }
  return {
    page: currentPage,
    direction: clamp(currentPage - state.page, -1, 1)
  }
}, {
  page: navList.map(e => e.path).indexOf(history.location.pathname), 
  direction : 0
})