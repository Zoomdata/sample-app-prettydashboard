import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import App from './App'
import DashboardLayout from '../components/DashboardLayout'
import GridTest from '../components/GridTest'

module.exports = (
    <Route path="/zd-data-app-03" component={DashboardLayout}>
  	  <IndexRoute component={DashboardLayout}/>
    </Route>
)
