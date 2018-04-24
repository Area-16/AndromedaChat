import express from 'express'
import io from 'socket.io'
import moment from 'moment'
import { config } from 'dotenv'

import { addMessage, getAllMessages } from './services/chat-services'

const serverBootstrap = async () => {
  const moment = require('moment')
  const envConfig = config()
  const server = express()
  server.set('PORT', process.env.SERVER_PORT || 3080)

  const app = await server.listen(server.get('PORT'), () => {
    console.info(`servidor rodando na porta ${server.get('PORT')}`)
  })

  const socket = io(app)

  socket.on('connection', socketServer => {
    socketServer.on('SEND_MESSAGE', data => {
      data.timeframe = `${moment().hours()}:${moment().minutes()}`
      
      addMessage({
        user: data.user,
        message: data.message,
        timeframe: data.timeframe
      })
        .then((data) => {
          // console.log(data)
        })
        .catch((err) => {
          console.error(err)
        })
      getAllMessages()
        .then((data) => {
          return socket.emit('SEND_STORED_MESSAGES', data)
        })
        .catch((err) => {
          console.error(err)
        })
      socket.emit('RECEIVE_MESSAGE', data)
    })
  })

  socket.on('LOAD_MESSAGES', () => getAllMessages()
    .then((data) => {
      console.log(data)
      return socket.emit('SEND_STORED_MESSAGES', data)
    })
    .catch((err) => {
      console.error(err)
    })
  )
}

export { serverBootstrap }
