
import {useHistory} from 'react-router-dom'

export function WheelHandler (current, navList) {
  const history = useHistory()
  return (event) => {
    if(event.deltaY < 0 && current !== 0) {
      console.log(event)
      event.preventDefault()
      // event.stopImmediatePropagation()
      history.push(navList[current-1].path)
    }
    if(event.deltaY > 0 && current < navList.length-1) {
      console.log(event)
      event.preventDefault()
      // event.stopImmediatePropagation()
      history.push(navList[current+1].path)
    }
  }
}

const getTouches = (e) => e.touches
let xDown = null
let yDown = null
// function touchStartHandler (e) {
//   e.preventDefault()
//   const firstTouch = getTouches(e)[0]
//   xDown = firstTouch.clientX
//   yDown = firstTouch.clientY
// }

// function touchMoveHandler (e) {
//   e.preventDefault()
//   if (!xDown || !yDown){
//     return;
//   }
//   let xUp = e.touches[0].clientX
//   let yUp = e.touches[0].clientY
//   let xDiff = xDown - xUp
//   let yDiff = yDown - yUp
//   if(Math.abs(xDiff) > Math.abs(yDiff)){
//     return;
//   } else {
//     if (yDiff > 0 && current <navList.length-1 ){
//       history.push(navList[current+1].path)
//     } 
//     if(yDiff < 0 && current !== 0 ){
//       history.push(navList[current-1].path)
//     }
//   }
// }
