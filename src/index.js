import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import App from './components/App'

let routes =
  <Router>
    <Route
      path = "/"
      component = { App }
    />
  </Router>

render(routes, document.getElementById(`app`))
