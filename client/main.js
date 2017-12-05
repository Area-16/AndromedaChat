import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../imports/ui/App'
// import Login from '../imports/ui/Login'

Meteor.startup(() => {
  render(
    <App />
    , document.getElementById('render-app'))
  })
  // <MuiThemeProvider> </MuiThemeProvider>
  