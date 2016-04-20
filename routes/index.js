import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import App from './App'
import App from '../components/App'

// module.exports = (
//     <Route path="/" component={App}>
//   	  <IndexRoute component={VisibleTrend}/>
//     </Route>
// )

module.exports = (
    <Route path="/" component={App}>
  	  <IndexRoute component={App}/>
    </Route>
)
