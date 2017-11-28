import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../imports/ui/App.js'

Meteor.startup(() => {
  render(
    // <MuiThemeProvider> </MuiThemeProvider>
    <App />
    , document.getElementById('render-app'))
})
