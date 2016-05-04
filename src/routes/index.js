import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import App from './App'
import Dashboard from '../components/Dashboard'

// module.exports = (
//     <Route path="/" component={App}>
//   	  <IndexRoute component={VisibleTrend}/>
//     </Route>
// )

module.exports = (
    <Route path="/zd-data-app-03" component={Dashboard}>
  	  <IndexRoute component={Dashboard}/>
    </Route>
)
