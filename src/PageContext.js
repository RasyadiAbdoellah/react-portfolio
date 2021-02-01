import React from 'react'

const PageContext = React.createContext({state: {page: 0, direction: 1}, dispatch : () => {}})

export default PageContext