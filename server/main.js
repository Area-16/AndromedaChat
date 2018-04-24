import { Meteor } from 'meteor/meteor'
import { serverBootstrap } from '../imports/api/server'

Meteor.startup(() => {
  // code to run on server at startup
  serverBootstrap()
})
